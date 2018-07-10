/*
 * 交易详情
 * @Author: Honye 
 * @Date: 2018-04-16 10:32:17 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-05-15 18:07:35
 */
import React from 'react';
import { NavBar, Icon, Popover, Modal } from 'antd-mobile';
import ItemQuotation from "../bargain_details/components/ItemQuotation";
import PropTypes from 'prop-types';
import Event from '../../socket/Event';
import Timer from './components/Timer';
import images from "../../constants/Images";
import router from 'umi/router';
import { connect } from 'dva';
import { MVCType, MVCIDs, TradePartyName } from "../../constants/TopicName";
import calckitUtils from '../../utils/calckitUtils';
import withLogin from '../../components/withLogin';
import styles from './page.less';

class DealDetails extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }

    /** 菜单显隐 */
    handlePopoverVisible = (visible) => {
        this.setState({ visible })
    }

    /** 菜单选择 */
    onSelect = (opt) => {
        const { value } = opt.props;
        if(value === 'transferNotes') {
            router.push({
                pathname: '/transfer_notes'
            })
        } else if(value === 'buyNotes') {
            router.push('/buy_notes')
        } else {
            this.cancelDeal()
        }
        this.setState({
            visible: false
        })
    }

    componentDidMount() {
        this.getDetails()
    }

    /** 取消交易 */
    cancelDeal = () => {
        if(this.checkIsLock()) return;
        const { dispatch } = this.props;
        const { socket } = this.context;
        const { tradeId, type } = this.props.location.query;
        Modal.alert('', 
            '确定取消该笔交易吗？',
            [
                { text: '取消' },
                { text: '确定', onPress: () => {
                    dispatch({
                        type: 'transferSender/reqCancel',
                        payload: {
                            socket,
                            dealType: type,
                            params: {
                                tradeId,
                                isReceiver: 'false'
                            }
                        }
                    })
                }}
            ]
        )
    }

    /** 获取详情 */
    getDetails = () => {
        const { dispatch } = this.props;
        const { socket } = this.context;
        const { tradeId, type } = this.props.location.query;
        dispatch({
            type: 'transferSender/reqDetails',
            payload: {
                socket,
                dealType: type,
                params: {
                    tradeId,
                    version: 1
                }
            }
        })
    }

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

    handleResponse = (response) => {
        const { dispatch } = this.props;
        // MVC 注册
        const conditionQuery = response.messageName===MVCType.REGISTER && 
            response.data && (response.data.MVCID===MVCIDs.SellPartyDetail || response.data.MVCID===MVCIDs.BuyCPartyDetail);
        // MVC 更新
        const conditionUpdate = response.messageName===MVCType.GMMUpdate && 
            response.data && (response.data.MVCID===MVCIDs.SellPartyDetail || response.data.MVCID===MVCIDs.BuyCPartyDetail);
        if(conditionQuery) {
            dispatch({
                type: 'transferSender/resDetails',
                payload: { response }
            })
        } else if(conditionUpdate) {
            //TODO MVC 更新
            dispatch({
                type: 'transferSender/resDetails',
                payload: { response }
            })
        } else if(response.messageName===TradePartyName.CANCEL) {  // 取消交易
            dispatch({
                type: 'transferSender/resCancel',
                payload: { response }
            })
        }

        switch(response.messageName) {
            case MVCType.GMMUpdate:  // MVC 更新
                const content = response.messageContent || {};
                if(content.MVCID===MVCIDs.SellPartyDetail || content.MVCID===MVCIDs.BuyCPartyDetail) {
                    dispatch({
                        type: 'transferSender/resUpdate',
                        payload: { response }
                    })
                }
                break;
            default:
                break;
        }
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
        // dispatch({
        //     type: 'MVC/unregister',
        //     payload: {
        //         socket,
        //         params: {
        //             MVCID: MVCIDs.SellPartyDetail
        //         }
        //     }
        // })
    }

    onItemClick = (item) => () => {
        const { type, isReceiver } = this.props.location.query;
        const { details } = this.props;
        const { tradeId, reportId, companyId, statusCode } = item;
        router.push({
            pathname: '/bargain_details',
            query: {
                //TODO tradeId 判断 type==='transfer' ? details.tradeId : tradeId
                tradeId: type==='transfer' ? details.tradeId : tradeId,
                type,
                isReceiver,
                reportId,
                companyId,
                statusCode
            }
        })
    }

    render() {
        const { details } = this.props;
        const { type } = this.props.location.query;

        const elTransferNumbers = (
            <div className={styles.number}>
                <div>
                    <span>出票总金额(万)</span>
                    <span>{ calckitUtils.formatTicketPrice(details.amount||0) }</span>
                </div>
                <div>
                    <span>出票总数(张)</span>
                    <span>{ details.count }</span>
                </div>
                <div>
                    <span>加权年利率(%)</span>
                    <span>{ details.rate }</span>
                </div>
            </div>
        );
        const elBuyNumbers = (
            <div className={styles.number}>
                <div>
                    <span>买入总金额(万)</span>
                    <span>{ calckitUtils.formatTicketPrice(details.amount||0) }</span>
                </div>
                <div>
                    <span>剩余天数区间</span>
                    <span>{`${details.restDayStart}~${details.restDayEnd}`}</span>
                </div>
                <div>
                    <span>加权年利率(%)</span>
                    <span>{ details.rate }</span>
                </div>
            </div>
        );
        const elNumbers = type === 'transfer' ? elTransferNumbers : elBuyNumbers;

        return (
            <div className="page-container">
                <NavBar
                    icon={<Icon type="left" />}
                    onLeftClick={ router.goBack }
                    rightContent={
                        <Popover mask
                            visible={ this.state.visible }
                            onVisibleChange={ this.handlePopoverVisible }
                            onSelect={ this.onSelect }
                            overlay={[
                                type === 'transfer' ?
                                    <Popover.Item key="1" value="transferNotes">查看出票清单</Popover.Item>
                                :   <Popover.Item key="1" value="buyNotes">查看买入清单</Popover.Item>,
                                <Popover.Item className={ details.isNeedsRestart?styles.hidden:'' } key="2" value="cancel">取消交易</Popover.Item>
                            ]}
                        >
                            <Icon type="ellipsis"/>
                        </Popover>
                    }
                >交易详情</NavBar>
                <div>
                    <div className={styles.header}>
                        <div className={styles.person}>
                            <img className={styles.icon} alt="icon" src={images.IC_SILVER} />
                            <div className={styles.type}>
                                <div>
                                    <span className={styles.tagsPaymentType}>{ details.paymentType }</span>
                                    <span className={styles.tagsPaymentType}>{type==='transfer'?'转让':'买入'}</span>
                                    <span>{ `${details.deliveryMode}(${details.deliveryDate})` }</span>
                                </div>
                            </div>
                        </div>
                        { elNumbers }
                        <div className={styles.status}>
                            <div>
                                <span>议价时限：</span>
                                <Timer ms={ details.yijiaExpireTime } />
                            </div>
                            <div>
                                <span>状态：</span>
                                <span className={styles.statusText}>{ details.status }</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={ styles.subtitle }>企业报价列表</div>
                        <div>
                        {
                            details.bankReport.map((item, index) => (
                                <ItemQuotation key={item.reportId} 
                                    data={item} 
                                    onClick={ this.onItemClick(item) }
                                />
                            ))
                        }
                        </div>
                    </div>
                </div>
                {/** //TODO 重新发起 */}
                {/**<Button className={`${styles.reactive} ${details.isNeedsRestart?'':styles.hidden}`}>重新发起</Button>*/}
                <Event event="svevent" handler={ this.handleResponse } />
            </div>
        )
    }
}

DealDetails.contextTypes = {
    socket: PropTypes.object.isRequired
}

const withLoginComponent = withLogin()(DealDetails);

const mapStateToProps = ({ transferSender }) => ({
    details: transferSender.details
})

export default connect(mapStateToProps)(withLoginComponent);