/*
 * 交易请求详情（出）
 * @Author: Honye 
 * @Date: 2018-03-22 18:02:10 
 * @Last Modified by: zhangyuhao
 * @Last Modified time: 2018-05-15 10:29:36
 */
'use strict';

import React from 'react';
import { NavBar, Icon, Button } from 'antd-mobile';
import router from 'umi/router';
import styles from './page.less';
import Event from '../../socket/Event';
import { connect } from 'dva';
import Decimal from 'decimal.js/decimal';
import PropTypes from 'prop-types'
import { MarketMsgName } from '../../constants/TopicName';
import ListItem from './components/ListItem';
import DateUtil from '../../utils/dateUtil';

class DealOutDetails extends React.PureComponent {

    goBack = () => {
        router.goBack()
    }
    static contextTypes = {
        socket: PropTypes.object.isRequired,
    }
    constructor(props) {
        super(props);
        this.state = {
            item: this.props.location.query.item
        }
    }
    componentDidMount() {
        if (this.state.item) {
            this.loadData();
        }
    }

    loadData() {
        const { dispatch, login } = this.props;
        let isLogined = login.isLogined;
        let inquiryId = this.state.item.inquiryId;
        const { socket } = this.context;
        dispatch({//
            type: 'quotation/dynamicItemDetail',
            payload: { socket, isLogined, inquiryId }
        });
    }
    render() {
        return (
            <div className="page-container">
                <Event event="svevent" handler={this.handleResponse} />
                <NavBar
                    icon={<Icon type="left" />}
                    onLeftClick={this.goBack}
                >交易请求详情</NavBar>
                {this.renderTop()}
                <div className={styles.promptTitle}>转让票据列表</div>
                {this.renderTicketList()}
            </div>
        )
    }

    renderTop() {
        if (this.state.item && this.props.quotation.dynamicDetailData.ticketInfos) {
            return (
                <div className={styles.itemWrapper} >

                    <div className={styles.top}>
                        <div className={styles.smallGroup}>
                            <Button
                                className={styles.smallButton}
                                size="small" inline
                            >{this.state.item.ticketTypeDisplay}
                            </Button>
                            <Button
                                className={styles.smallButton}
                                size="small" inline
                                type="ghost">{this.displayPayment(this.state.item.paymentType)}
                            </Button>
                            <Button
                                className={styles.smallButton}
                                size="small" inline
                                type="ghost">{this.state.item.tradeTypeDisplay}
                            </Button>
                        </div>
                        <div className={styles.title}>{this.props.quotation.dynamicDetailData.title}({DateUtil.format(new Date(this.props.quotation.dynamicDetailData.transferDate),'yyyy/MM/dd')})</div>
                    </div>
                    <div className={styles.middle}>
                        <div>
                            <div className={styles.middleTitle}>票面总额(万)</div>
                            <div>{this.calValue(this.state.item.ticketPrice)}</div>
                        </div>
                        <div>
                            <div className={styles.middleTitle}>出票总数</div>
                            <div>{this.props.quotation.dynamicDetailData.ticketInfos.length}</div>
                        </div>
                        <div>
                            <div className={styles.middleTitle}>意向利率(%)</div>
                            <div>{this.state.item.level.toFixed(2)}</div>
                        </div>
                    </div>

                </div>
            )
        }
    }
    displayPayment(value){
        if(value==='--'||value===''){
            return '混合';
        }else{
            return value
        }
    }
    renderTicketList() {
        const { quotation } = this.props;
        if (quotation.dynamicDetailData && quotation.dynamicDetailData.ticketInfos) {

            return <div >
                {
                    quotation.dynamicDetailData.ticketInfos.map((item, index) => (
                        <ListItem key={index} item={item} />
                    ))
                }
                <Button className={this.checkCanClick() ? styles.buttonDefault : styles.buttonDisable} activeClassName={styles.buttonFocus} disabled={!this.checkCanClick()} onClick={this.onBtnClick}>意向买入</Button>
            </div>
        }
    }
    //判断是否可以点击
    checkCanClick() {
        const { quotation } = this.props;
        if (quotation.dynamicDetailData.canOperate === 1 && quotation.dynamicDetailData.canInStaus === 0) {
            return true;
        } else if (quotation.dynamicDetailData.canOperate === 0 && quotation.dynamicDetailData.canInStaus === 1) {
            return true;
        } else {
            return false;
        }
    }

    onBtnClick=()=>{
        const { isLogined } = this.props.login;
        if(isLogined){
            // 进入转让接收议价
            router.replace({
                pathname: '/bargain_details',
                query: {
                    tradeId:this.state.item.inquiryId,
                    type: 'transfer',
                    isReceiver: 'true'
                }
            })
        }else{
            router.push('/login')
        }
    }
    calValue(ticketPrice) {
        let x = new Decimal(ticketPrice);
        let y = x.dividedBy(10000)
        return y + '';
    }


    // 接收服务端
    handleResponse = (response) => {
        const { dispatch } = this.props;
        if (response.messageName === MarketMsgName.DYNAMIC_DETAIL) {//今日请求逐笔
            dispatch({
                type: 'quotation/dynamicDetailFinish',
                payload: response,
            })
        }
    }


}
const mapStateToProps = ({ login, quotation }) => ({
    login,
    quotation
})

export default connect(mapStateToProps)(DealOutDetails);
