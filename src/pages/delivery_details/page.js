/*
 * 交割详情
 * @Author: Honye 
 * @Date: 2018-04-02 15:59:46 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-05-14 11:23:35
 */
'use strict';

import React from 'react';
import { NavBar, Icon, Tabs, Popover, Toast, Modal } from 'antd-mobile';
import StepList from './components/StepList';
import DealList from './components/DealList';
import Event from '../../socket/Event';
import PropTypes from 'prop-types';
import router from 'umi/router';
import images from '../../constants/Images';
import { connect } from "dva";
import { DynamicMVC } from "../../constants/TopicName";
import calckitUtils from '../../utils/calckitUtils';
import withLogin from "../../components/withLogin";
import styles from './page.less';

class DeliveryDetails extends React.Component {

    static contextTypes = {
        socket: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        }
    }

    goBack = () => {
        router.goBack()
    }

    renderTabBar = (tabBarProps) => {
        return (
            <Tabs.DefaultTabBar {...tabBarProps} 
                renderTab={(props) => (
                    <div className={`${styles.tab} ${tabBarProps.activeTab===props.sub&&styles.active}`}>{ props.title }</div>
                )}
            />
        )
    }

    componentDidMount() {
        const { dispatch, location } = this.props;
        const { socket } = this.context;
        const { tradeId, reportId, tradeMode, isOriginalSender, isReceiver } = location.query;
        // 交易类型
        const tradeType = tradeMode==='20'?'transfer':tradeMode==='21'?'buyin':'others';
        // 身份：发起/接收
        const partyType = isOriginalSender==='0' ? 'receiver' : 'sender';
        const deliveryType = (()=>{
            if(tradeType==='transfer') {
                if(isReceiver) {
                    return isReceiver==='true' ? 2 : 3
                } else {
                    return partyType==='receiver' ? 2 : 3
                }
            } else {
                if(isReceiver) {
                    return isReceiver==='true' ? 4 : 5
                } else {
                    return partyType==='sender' ? 4 : 5
                }
            }
        })();
        dispatch({
            type: 'deliveryDetails/reqDetails',
            payload: {
                socket,
                params: {
                    tradeId: Number(tradeId),
                    responseId: reportId,
                    tradeType: deliveryType,
                    version: 1
                }
            }
        })
    }

    componentWillUnmount() {
        const { dispatch } = this.props;
        const { socket } = this.context;
        const { tradeId } = this.props.location.query;
        dispatch({
            type: 'transferSender/reqRelease',
            payload: {
                socket,
                params: {
                    tradeId,
                    version: 1
                }
            }
        })
    }

    /** 检测是否上锁了 */
    checkIsLock = () => {
        const { details } = this.props;
        if(details.isLocked === '0') {
            Modal.alert('',
                `该交易已被交易员(${details.lockedName})操作,您当前只能查看，不能操作！`,
                [ { text: '确定' } ]
            )
        }
        return details.isLocked === '0';
    }

    /** 菜单显隐 */
    handlePopoverVisible = (visible) => {
        this.setState({ visible })
    }

     /** 菜单选择 */
     onSelect = (opt) => {
         if(this.checkIsLock()) return;
        const { value } = opt.props;
        const { timeline } = this.props;
        const { tradeId } = this.props.location.query;
        if(value === 'evaluate') {  // 评价
            if(timeline.tradeStatus) {
                router.push({
                    pathname: '/evaluate',
                    query: { 
                        tradeId,
                        hasComment: !!timeline.commentData
                    }
                })
            } else {
                Toast.fail('对不起，该交易未完成，无法发起评价');
            }
        } else if(value === 'report') {  // 投诉
            router.push({
                pathname: '/report',
                query: { 
                    tradeId,
                    tradeNo: timeline.tradeNo
                }
            })
        }
        this.setState({
            visible: false
        })
    }

    handleResponse = (response) => {
        const { dispatch } = this.props;
        switch(response.messageName) {
            case DynamicMVC.DETAILS_DELIVERY:  // 交割详情
                dispatch({
                    type: 'deliveryDetails/resDetails',
                    payload: { response }
                })
                break;
            default:
                break;
        }
    }

    render() {
        const tabs = [
            { title:"交割", sub:0 },
            { title:"票据清单", sub:1 },
            { title:"协议", sub:2 }
        ];
        const { details, location } = this.props;
        const { tradeId, reportId, tradeMode, isOriginalSender, isReceiver } = location.query;
        // 交易类型
        const tradeType = tradeMode==='20'?'transfer':tradeMode==='21'?'buyin':'others';
        // 身份：发起/接收
        const partyType = isOriginalSender==='0'?'receiver':'sender';
        const partyStr = (()=>{
            if(tradeType==='transfer') {
                if(isReceiver) {
                    return isReceiver==='true' ? '资金方' : '持票方'
                } else {
                    return partyType==='receiver' ? '持票方' : '资金方'
                }
            } else {
                if(isReceiver) {
                    return isReceiver==='true' ? '资金方' : '持票方'
                } else {
                    return partyType==='sender' ? '持票方' : '资金方'
                }
            }
        })();
        return (
            <div className={`page-container ${styles.pageDetails}`}>
                <NavBar
                    icon={<Icon type="left" />}
                    onLeftClick={ this.goBack }
                    rightContent={
                        <Popover mask
                            visible={ this.state.visible }
                            onVisibleChange={ this.handlePopoverVisible }
                            onSelect={ this.onSelect }
                            overlay={[
                                <Popover.Item key="1" value="evaluate">评价</Popover.Item>,
                                <Popover.Item key="2" value="report">投诉</Popover.Item>
                            ]}
                        >
                            <Icon type="ellipsis"/>
                        </Popover>
                    }
                >交割详情</NavBar>
                <div className={ styles.content }>
                    <div className={ styles.header }>
                        <div className={ styles.person }>
                            <img className={ styles.icon } alt="icon" src={ images.IC_SILVER } />
                            <div>
                                <span className={ styles.tag }>{ partyStr }</span>
                                <span>{ details.bankName }</span>
                            </div>
                        </div>
                        <div className={ styles.number }>
                            <div>
                                <span>成交票面总额(万)</span>
                                <span>{ calckitUtils.formatTicketPrice(details.ticketMoney) }</span>
                            </div>
                            <div>
                                <span>成交票数(张)</span>
                                <span>{ details.selectedCount }</span>
                            </div>
                            <div>
                                <span>成交利率(%)</span>
                                <span>{ details.receiveRate }</span>
                            </div>
                        </div>
                    </div>
                    <div className={ styles.tips }>
                        <img alt="icon" src={ images.IC_TIPS} />
                        {
                            details.brokerageRate === 0 ? 
                            <span>【本次交易免收通道费用】</span>
                            : <span>通道费用：<span className={ styles.price } >{details.brokerageMoney}元</span>【包含{
                                details.feeNoticeStr && details.feeNoticeStr.map((item, index) => item.split('：')[0]).join('，')
                            }】</span>
                        }
                    </div>
                    <Tabs
                        className={ styles.tabBar }
                        tabs={ tabs }
                        tabBarUnderlineStyle={{height:0,border:'none'}}
                        tabBarActiveTextColor="#D7D7D7"
                        tabBarInactiveTextColor="#D7D7D7"
                        renderTabBar={ this.renderTabBar }
                        initialPage={0}
                    >
                        <StepList tradeId={ tradeId } />
                        <DealList 
                            tradeId={ tradeId } 
                            reportId={ reportId } 
                            isReceiver={ isOriginalSender==='0'||isReceiver==='true'?'true':'false' } 
                            data={ details.list } 
                        />
                        <div>协议</div>
                    </Tabs>
                </div>
                {/**<Button className={ styles.button }>重新发起</Button>*/}
                <Event event="svevent" handler={ this.handleResponse } />
            </div>
        )
    }
}

const withLoginedComponent = withLogin()(DeliveryDetails);

const mapStateToProps = ({ deliveryDetails }) => ({
    ...deliveryDetails
})

export default connect(mapStateToProps)(withLoginedComponent);