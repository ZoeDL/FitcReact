/*
 * 报价详情
 * @Author: Honye 
 * @Date: 2018-04-12 18:52:48 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-05-17 14:25:48
 */
'use strict';

import React from 'react';
import { NavBar, Icon, Modal } from 'antd-mobile';
import ItemNote from './components/ItemNote';
import Timer from '../deal_details/components/Timer';
import Event from '../../socket/Event';
import PropTypes from 'prop-types';
import router from 'umi/router';
import { connect } from "dva";
import images from '../../constants/Images';
import { TransferName, PurchaseName, MVCType, MVCIDs } from '../../constants/TopicName';
import calckitUtils from '../../utils/calckitUtils';
import withLogin from '../../components/withLogin';
import styles from './page.less';

class BargainDetails extends React.PureComponent {

    constructor(props) {
        super(props);
        this.transPriceCalc = null;  // 计算总值的函数
        this.feeCalc = null;         // 计算通道费的函数
        this.state = {
            editing: false,  // 是否编辑状态
            myRates: props.noteList.map((item) => item.senderRate||0),     // 本方报价
            mIsReports: props.noteList.map((item) => item.isReport||false)
        }
    }

    /** 拒绝交易 */
    handleRefuse = () => {
        const { dispatch, details } = this.props;
        if(!details.endBtn || this.checkIsLock()) return;
        const { socket } = this.context;
        const { tradeId, type, isReceiver, reportId } = this.props.location.query;
        Modal.alert('', '确定拒绝交易？', [
            { text: '取消' },
            { text: '确定', onPress: () => {
                dispatch({
                    type: 'bargainDetails/reqRefuse',
                    payload: {
                        socket,
                        dealType: type,
                        params: {
                            tradeId,
                            reportId: type==='transfer' ? ( isReceiver==='true' ? details.reportId : reportId ) : reportId,
                            isReceiver
                        }
                    }
                })
            }}
        ])
    }

    componentDidMount() {
        this.commonGetDetails()
    }

    commonGetDetails = () => {
        const { type, isReceiver } = this.props.location.query;
        if(type === 'transfer') {
            if(isReceiver === 'true') {  // 转让接收方
                this.getDetailsMVC()
            } else {  // 转让发起方
                this.getDetails()
            }
        } else {
            if(isReceiver==='true') {  // 买入发起方
                this.getDetails()
            } else {  // 买入接收方
                this.getDetailsMVC()
            }
        }
    }

    getDetails = () => {
        const { dispatch } = this.props;
        const { socket } = this.context;
        const { tradeId, type, isReceiver, reportId, companyId } = this.props.location.query;
        dispatch({
            type: 'bargainDetails/reqDetails',
            payload: {
                socket,
                dealType: type,
                params: {
                    tradeId,
                    reportId,
                    isReceiver,
                    companyId
                }
            }
        })
        this.getNoteList()
    }

    getDetailsMVC = () => {
        const { dispatch } = this.props;
        const { socket } = this.context;
        const { tradeId, type } = this.props.location.query;
        dispatch({
            type: 'bargainDetails/reqDetailsMVC',
            payload: {
                socket,
                dealType: type,
                params: { tradeId }
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

    getNoteList = ( nReportId ) => {
        const { dispatch } = this.props;
        const { socket } = this.context;
        const { tradeId, type, isReceiver, reportId } = this.props.location.query;
        dispatch({
            type: 'bargainDetails/reqNoteList',
            payload: {
                socket,
                dealType: type,
                params: {
                    tradeId,
                    reportId: isReceiver==='true' ? nReportId : reportId,
                    isReceiver
                }
            }
        })
    } 

    componentWillReceiveProps(nextProps) {
        if(nextProps.noteList !== this.props.noteList) {
            this.setState({
                myRates: nextProps.noteList.map((item) => item.senderRate || 0),
                mIsReports: nextProps.noteList.map((item) => item.isReport || false)
            })
        }
    }

    /** 改变编辑状态 */
    changeEditing = (e) => {
        // 阻止事件冒泡
        e.stopPropagation();
        const { details } = this.props;
        if(!details.quote || this.checkIsLock()) return;
        this.setState(({ editing, myRates }, { noteList }) => {
            return {
                editing: !editing,
                myRates: editing ? noteList.map((item) => item.senderRate||0) : myRates
            }
        })
    }

    /** 报价利率改变 */
    handleRateChange = (item, index) => (value) => {
        this.setState((preState) => {
            let nMyRates = [...preState.myRates];
            nMyRates[index] = parseFloat(value);
            return {
                myRates: nMyRates
            }
        }) 
    }

    /** 选中变化 */
    handleCheckChange = (item, index) => (value) => {
        let mIsReports = [...this.state.mIsReports];
        mIsReports[index] = value;
        this.setState({ mIsReports })
    }

    /** 提交报价 */
    handleCommit = () => {
        const { dispatch, details, noteList } = this.props;
        const { socket } = this.context;
        const { tradeId, isReceiver, companyId, reportId } = this.props.location.query;
        const { myRates, mIsReports } = this.state;
        for(let i=0, len=myRates.length; i<len; ++i) {
            if(mIsReports[i] && (!myRates[i] || myRates[i]>100 || myRates[i]<0)) {
                Modal.alert('', '请正确填写报价！');
                return;
            }
        }
        Modal.alert('',
            '确认提交该报价？',
            [
                { text: '取消' },
                { text: '确定', onPress: () => {
                    dispatch({
                        type: 'bargainDetails/reqSubmitQuotation',
                        payload: {
                            socket,
                            params: {
                                tradeId,
                                reportId: isReceiver==='true' ? details.reportId : reportId,
                                isReceiver,
                                companyId: isReceiver==='true' ? details.companyId : companyId,
                                timeLimit: 3600000,
                                tradeMode: details.tradeMode,
                                rateList: noteList.map((item, index) => (
                                    {
                                        inventId: item.inventId,
                                        rate: myRates[index],
                                        modidays: 0,
                                        isReport: mIsReports[index]
                                    }
                                ))
                            }
                        }
                    })
                    this.setState({
                        editing: false
                    })
                }}
            ]
        )
    }

    /**
     * 是否上锁了
     * @return {Boolean} true-已锁; false-未锁
     */
    checkIsLock = () => {
        const { details } = this.props;
        if(details.isLocked === '0') {
            Modal.alert('',
                `该交易已被交易员(${details.lockedName})操作,您当前只能查看，不能操作！`,
                [
                    { text: '确定' }
                ]
            )
        }
        return details.isLocked === '0';
    }

    handleResponse = (response) => {
        const { dispatch } = this.props;
        const { tradeId, reportId, statusCode, isReceiver, type } = this.props.location.query;
        switch (response.messageName) {
            case TransferName.BargainDetails:  // 转让发起方查看报价详情
            case PurchaseName.BargainDetails:  // 买入发起方查看报价详情
                dispatch({
                    type: 'bargainDetails/resDetails',
                    payload: { response }
                })
                break;
            case TransferName.NotesOfBargain:  // 转让发起方查看报价票据清单
            case PurchaseName.NotesOfBargain:  // 买入发起方查看报价票据清单
                dispatch({
                    type: 'bargainDetails/resNoteList',
                    payload: { response }
                })
                break;
            case MVCType.REGISTER:  // MVC 注册
                const res = response.data;
                if(res && 
                    (res.MVCID===MVCIDs.BuyPartyDetail ||  res.MVCID===MVCIDs.SellCPartyDetail)) {
                        dispatch({
                            type: 'bargainDetails/resDetailsMVC',
                            payload: { response }
                        })
                        res.reportId && this.getNoteList(res.reportId)
                }
                break;
            case MVCType.GMMUpdate:  // MVC 更新
                if(response.messageContent && response.messageContent.MVCID===MVCIDs.BuyPartyDetail ||  response.messageContent.MVCID===MVCIDs.SellCPartyDetail) {
                    if(response.messageContent.tradeId+'' === tradeId+'') {
                        if(response.messageContent.isSpot && response.messageContent.isSpot.toString()==='true') {
                            router.replace({
                                pathname: '/delivery_details',
                                query: {
                                    tradeId,
                                    tradeMode: type==='transfer'?'20':'21',
                                    isReceiver,
                                    reportId: response.messageContent.reportId
                                }
                            })
                        } else {
                            dispatch({
                                type: 'bargainDetails/resDetailsUpdate',
                                payload: { response }
                            })
                            this.getNoteList(response.messageContent.reportId)
                        }
                    }
                }
                if(response.messageContent && response.messageContent.MVCID===MVCIDs.BuyCPartyDetail ||  response.messageContent.MVCID===MVCIDs.SellPartyDetail) {
                    if(response.messageContent.tradeId+'' === tradeId+'') {
                        response.messageContent.bankReport.forEach(el => {
                            if(el.reportId+''===reportId+'' && el.statusCode+''!==statusCode+'' && el.statusCode !== 15) {
                                if(el.isSpot && el.isSpot.toString()==='true') {
                                    router.replace({
                                        pathname: '/delivery_details',
                                        query: {
                                            tradeId,
                                            tradeMode: type==='transfer'?'20':'21',
                                            isReceiver,
                                            reportId
                                        }
                                    })
                                } else {
                                    this.commonGetDetails()
                                    this.getNoteList(response.messageContent.reportId)
                                }
                            }
                        })
                    } else {
                        response.messageContent.bankReport.forEach(el => {
                            if(el.tradeId+''===tradeId+'' && el.reportId+''===reportId+'' && el.statusCode+''!==statusCode+'' && el.statusCode !== 15) {
                                if(el.isSpot && el.isSpot.toString()==='true') {
                                    router.replace({
                                        pathname: '/delivery_details',
                                        query: {
                                            tradeId,
                                            tradeMode: type==='transfer'?'20':'21',
                                            isReceiver,
                                            reportId
                                        }
                                    })
                                } else {
                                    this.commonGetDetails()
                                    this.getNoteList(response.messageContent.reportId)
                                }
                            }
                        });
                    }
                }
                break;
            case TransferName.REFUSE:  // 转让接收方拒绝交易
            case PurchaseName.REFUSE:  // 买入接收方拒绝交易
                dispatch({
                    type: 'bargainDetails/resRefuse',
                    payload: { response }
                })
                break;
            case TransferName.ACCEPT:  // 转让成交
            case PurchaseName.ACCEPT:  // 买入成交
                if((isReceiver==='true' && type==='buy') || (isReceiver==='false' && type==='transfer')) {
                    router.replace({
                        pathname: '/delivery_details',
                        query: {
                            tradeId,
                            tradeMode: type==='transfer'?'20':'21',
                            isReceiver,
                            reportId
                        }
                    })
                } else {
                    dispatch({
                        type: 'bargainDetails/resAcceptDeal',
                        payload: { response }
                    })
                }
                break;
            default:
                break;
        }
    }

    /**
     * 计算票据总值
     * @param {String} jsStr JS 脚本代码
     * @param {Array} noteList 票据清单
     * @param {Boolean} myRates 本方报价
     * @param {Boolean} isOthers 是否求对方总值
     * @return {Number} 总值金额(元)
     */
    calcTransPrice(jsStr, noteList, myRates, isOthers) {
        const func = eval(`(${jsStr})`) || function() {
            return '0.00';
        };
        const params = formatParams(noteList);
        return func(params.ticketPrices, params.remaingDays, 
            params.isChoose, isOthers?params.otherRates:myRates)
    }

    /**
     * 计算通道费
     * @param {String} jsStr JS 脚本代码
     * @param {Array} noteList 票据清单
     * @return {Array} 
     */
    calcFees(jsStr, noteList) {
        const func = eval(`(${jsStr})`) || function() {
            return [];
        };
        const params = formatParams(noteList);
        return func(params.ticketPrices, params.remaingDays, params.isChoose)
    }

    /** 成交 */
    handleAccept = () => {
        const { dispatch, details } = this.props;
        // 不可点击
        if(!details.submit || this.checkIsLock()) return;
        const { socket } = this.context;
        const { tradeId, type, isReceiver, reportId } = this.props.location.query;
        Modal.alert('',
            '确定与该企业成交？',
            [
                { text: '取消' },
                { text: '确定', onPress: () => {
                    dispatch({
                        type: 'bargainDetails/reqAcceptDeal',
                        payload: {
                            socket,
                            dealType: type,
                            params: {
                                tradeId,
                                reportId: details.reportId || reportId,
                                isReceiver,
                                version: 1
                            }
                        }
                    })
                }}
            ]
        )
    }

    render() {
        const { details, noteList } = this.props;
        const { myRates } = this.state;
        const { type, isReceiver } = this.props.location.query;
        let otherParty = '资金方';
        let otherRate = 0.0;
        let myRate = 0.0;
        let showPaymentType = false;
        if (type === 'transfer') {
            otherParty = isReceiver==='true' ? '持票方' : '资金方'
            otherRate = isReceiver==='true' ? details.senderRate : details.receiveRate
            myRate = isReceiver==='true' ? details.receiveRate : details.senderRate
            showPaymentType = isReceiver==='true';
        } else {
            otherParty = isReceiver==='true' ? '持票方' : '资金方'
            myRate = isReceiver==='true' ? details.senderRate : details.receiveRate
            otherRate = isReceiver==='true' ? details.receiveRate : details.senderRate
            showPaymentType = !(isReceiver==='true');
        }

        const otherAmount = this.calcTransPrice(details.transPriceCalcStr, noteList, myRates, true);
        const myAmount = this.calcTransPrice(details.transPriceCalcStr, noteList, myRates, false);

        return (
            <div className="page-container">
                <NavBar
                    className={ styles.navBar }
                    onLeftClick={router.goBack}
                    leftContent={
                        <span className="am-navbar-left-icon">
                            <Icon type="left" />
                            { 
                                this.state.editing && 
                                <span className={ styles.cancel } onClick={ this.changeEditing }>取消</span>
                            }
                        </span>
                    }
                    rightContent={
                        !this.state.editing && 
                        <div disabled={ !details.endBtn }
                            className={ styles.btnRefuse } 
                            onClick={this.handleRefuse}>拒绝交易</div>
                    }
                >报价详情</NavBar>
                <div>
                    <div className={styles.header}>
                        <div className={styles.person}>
                            <img className={styles.icon} alt="icon" src={images.IC_SILVER} />
                            <div className={styles.type}>
                                {
                                    showPaymentType && 
                                    <div>
                                        <span className={ styles.tagsPaymentType }>{ details.paymentType }</span>
                                        <span className={ styles.tagsPaymentType }>{type==='transfer'?'转让':'买入'}</span>
                                        <span>{`${details.deliveryMode}(${details.deliveryDate})`}</span>
                                    </div>
                                }
                                <div>
                                    <span className={styles.tag}>{otherParty}</span>
                                    <span>{details.bankName}</span>
                                </div>
                            </div>
                        </div>
                        <div className={styles.number}>
                            <div>
                                <span>报价票面总额(万)</span>
                                <span>{ calckitUtils.formatTicketPrice(details.senderMoney) }</span>
                            </div>
                            <div>
                                <span>对方-加权年利率(%)</span>
                                <span>{otherRate}</span>
                            </div>
                            <div>
                                <span>本方-加权年利率(%)</span>
                                <span>{myRate}</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.status}>
                        <div>
                            <span>议价时限：</span>
                            <Timer ms={details.yijiaExpireTime} />
                        </div>
                        <div>
                            <span>状态：</span>
                            <span className={styles.statusText}>{details.status}</span>
                        </div>
                    </div>
                    <div className={styles.money}>
                        <div>对方-总值合计：<span className={styles.amount}>{ calckitUtils.formatMoney( otherAmount ) }</span>元</div>
                        <div>
                            <div>本方-总值合计：<span className={styles.amount}>{ calckitUtils.formatMoney( myAmount )}</span>元</div>
                            <div className={styles.fee}>【本次交易免收通道费用】</div>
                        </div>
                    </div>
                    <div>
                        <div className={styles.subtitle}>票据清单</div>
                        <div>
                        {
                            noteList.map((item, index) => (
                                <ItemNote key={item.inventId} 
                                    data={item} 
                                    editing={ this.state.editing }
                                    checked={ item.isReport }
                                    disableCheck={ isReceiver==='false' }
                                    onRateChange={ this.handleRateChange(item, index) }
                                    onCheckChange={ this.handleCheckChange(item, index) }
                                />
                            ))
                        }
                        </div>
                    </div>
                </div>
                {
                    this.state.editing ? (
                        <div className={ styles.bottom }>
                            <div className={ styles.btnCommit } onClick={ this.handleCommit }>提交</div>
                        </div>
                    ) : (
                        <div className={ styles.bottom }>
                            <div disabled={ !details.quote }
                                className={ styles.btnBargain } 
                                onClick={ this.changeEditing }>议价</div>
                            <div disabled={!details.submit} 
                                className={ styles.btnCommit }
                                onClick={ this.handleAccept }
                            >成交</div>
                        </div>
                    )
                }
                <Event event="svevent" handler={this.handleResponse} />
            </div>
        )
    }
}

function formatParams(list) {
    let params = {};
    params.ticketPrices = list.map((item) => item.ticketAmount)
    params.remaingDays = list.map((item) => item.lixiDayNum)
    params.otherRates = list.map((item) => item.receiveRate)
    params.myRates = list.map((item) => item.senderRate||0)
    params.isChoose = list.map((item) => true)
    return params;
}

BargainDetails.contextTypes = {
    socket: PropTypes.object.isRequired
}

const withLoginComponent = withLogin()(BargainDetails);

const mapStateToProps = ({ bargainDetails }) => ({
    details: bargainDetails.details,
    noteList: bargainDetails.noteList
})

export default connect(mapStateToProps)(withLoginComponent);