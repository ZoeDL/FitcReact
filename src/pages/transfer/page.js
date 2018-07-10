/*
 * 票据转让
 * @Author: Honye 
 * @Date: 2018-03-29 15:26:27 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-05-18 08:44:59
 */
import React from 'react';
import { NavBar, Icon, Modal, Button, Toast, ActionSheet } from 'antd-mobile';
import RowCell from './components/RowCell';
import ItemNote from './components/ItemNote';
import ItemPaymentType from './components/ItemPaymentType';
import ItemEticket from './components/ItemEticket';
import Event from '../../socket/Event';
import router from 'umi/router';
import images from '../../constants/Images';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import { TradePartyName } from '../../constants/TopicName';
import dateUtil from '../../utils/dateUtil';
import widthLogin from '../../components/withLogin';
import styles from './page.less';

const ticketTypes = [
    { id: 1, name:'电银', icon: images.IC_SILVER },
    { id: 3, name:'电商', icon: images.ICON_SHANG }
]

class TransferPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,  // 议价时限菜单显示
            tempIndex: props.timeLimit.defaultIndex,
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.timeLimit.defaultIndex!==this.state.tempIndex) {
            this.setState({
                tempIndex: nextProps.timeLimit.defaultIndex
            })
        }
    }

    goBack = () => {
        const { dispatch } = this.props;
        dispatch({
            type: 'transfer/clearState'
        })
        router.goBack()
    }

    /** 添加 */
    handleAddItem = () => {
        const { type } = this.props.location.query;
        const { typeIndex } = this.props;
        router.push({
            pathname: Number(type) === 1 ? '/deal_select' : '/bank_type_select',
            query: {
                ticketType: ticketTypes[typeIndex].id
            }
        })
    }

    /** 发起交易 */
    handleCommit = () => {
        const { selectedTradeIds, bankTypeList, billList } = this.props;
        if(bankTypeList.length<=0 && (Object.keys(selectedTradeIds).length<=0 || billList.length<=0)) return;
        const { type } = this.props.location.query;
        if(Number(type) === 1) {  // 票据转让
            Modal.alert(
                '确认发起交易？',
                '确认向选中的的交易对象发起转让请求？',
                [
                    { text: '取消' },
                    { text: '确定', onPress: this.putTransferTrade },
                ]
            )
        } else {  // 票据买入
            if(!this.checkList()) {
                Modal.alert('', '当前添加的分类有误，不允许有重叠的分类，请重新输入');
                return;
            }
            Modal.alert(
                '确认发起交易？',
                '确认向选中的的交易对象发起买入请求？',
                [
                    { text: '取消' },
                    { text: '确定', onPress: this.putBuyTrade },
                ]
            )
        }
    }

    /** 发起转让交易 */
    putTransferTrade = () => {
        const { dispatch, timeLimit, businessDay, saleVips, selectedTradeIds, selectedParty } = this.props;
        const { socket } = this.context;
        let vipCompanyIds = saleVips.map( item => item.cpCompanyId )
        const mCompanyIds = selectedParty.map(item => item.cpCompanyId)
        Object.keys(selectedTradeIds).forEach( key => { 
            if(selectedTradeIds[key].yearRate && parseFloat(selectedTradeIds[key].yearRate) > 0) {
                dispatch({
                    type: 'transfer/reqTransfer',
                    payload: {
                        socket,
                        params: {
                            ticketType: 1,
                            bargainTime: timeLimit.times[timeLimit.defaultIndex],
                            requestShowToAll: 1,
                            transferDate: businessDay.T0,
                            cpCompanyIds: [...vipCompanyIds, ...mCompanyIds],
                            tickets: Object.keys(selectedTradeIds).map( key => ({ 
                                ticketId: selectedTradeIds[key].inventId, 
                                yearOfRate: selectedTradeIds[key].yearRate 
                            })),
                            version: 1
                        }
                    }
                })
            } else {
                Toast.info('请正确填写报价')
            }
        })
    }

    /** 发起买入交易 */
    putBuyTrade = () => {
        const { dispatch, timeLimit, businessDay, buyVips, selectedParty, totalPrice, bankTypeList, typeIndex } = this.props;
        const { socket } = this.context;
        let vipCompanyIds = buyVips.map( item => item.cpCompanyId )
        const mCompanyIds = selectedParty.map(item => item.cpCompanyId)
        dispatch({
            type: 'transfer/reqBuy',
            payload: {
                socket,
                params: {
                    instrumentType: ticketTypes[typeIndex].id === 3 ? 'TETICKET' : 'ETICKET',
                    timeLimit: timeLimit.times[timeLimit.defaultIndex],
                    requestShowToAll: 1,
                    jiaogeDate: businessDay.T0,
                    exactCompanyIds: [...vipCompanyIds, mCompanyIds],
                    totolPrice: totalPrice*10000,
                    submitDataList: bankTypeList.map((item, index) => ({
                        bankType: item.code,
                        buyRate: item.rate,
                        restBeginDays: item.restBeginDays || 3,
                        restEndDays: item.restEndDays || 366
                    }))
                }
            }
        })
    }

    checkList = () => {
        let res = true;
        const { bankTypeList } = this.props;
        let codes = {};
        bankTypeList.forEach((el, index) => {
            if(!codes[el.code]) {
                codes[el.code] = [];
            }
            codes[el.code].push(el);
        })
        Object.keys(codes).forEach((key, index) => {
            codes[key].forEach((type1, index1) => {
                type1.restBeginDays = type1.restBeginDays || 3;
                type1.restEndDays = type1.restEndDays || 366;
                codes[key].forEach((type2, index2) => {
                    type2.restBeginDays = type2.restBeginDays || 3;
                    type2.restEndDays = type2.restEndDays || 366;
                    if(type1.restEndDays>type2.restBeginDays && type2.restEndDays>type1.restBeginDays && index1 !== index2) {
                        res = false;
                    }
                })
            })
        })
        return res;
    }

    /** 选择交易对手 */
    toTradeParty = () => {
        let { type } = this.props.location.query;
        const { typeIndex } = this.props;
        if( ticketTypes[typeIndex].id === 3 ) {
            type = -1;
        }
        router.push(`/trade_party_select?type=${type}`)
    }

    componentDidMount() {
        const { dispatch } = this.props;
        const { socket } = this.context;
        
        this.getVIP();
        // 获取时限选择项
        dispatch({
            type: 'transfer/reqTimeLimit',
            payload: {
                socket,
                params: {
                    protocol: 'FF31',
                    timeoutType: 'asap.rnt',
                    version: 1
                }
            }
        })
        // 获取交割日期
        dispatch({
            type: 'transfer/reqBusinessDay',
            payload: {
                socket,
                params: {
                    version: 1
                }
            }
        })
    }

    /** 获取 VIP 交易对手 */
    getVIP = () => {
        const { typeIndex } = this.props;
        const { dispatch } = this.props;
        const { socket } = this.context;
        const { type } = this.props.location.query;
        dispatch({
            type: 'transfer/reqVipList',
            payload: {
                socket,
                params: {
                    ticketType: ticketTypes[typeIndex].id,
                    bizTarget: 'enterprise_to_enterprise',
                    bizType: Number(type) === 1 ? 'sale' : 'buy',
                    version: 1
                }
            }
        })
    } 

    /** 总金额变化 */
    handleTotalPrice = (e) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'transfer/changeTotalPrice',
            payload: {
                value: e.target.value
            }
        })
    }

    /** 买入年利率变化 */
    handleRateChange = (item, index) => (value) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'transfer/changeBuyRate',
            payload: {
                index, value
            }
        })
    }

    /** 剩余天数区间变化 */
    handleDaysChange = (item, index) => (minDay, maxDay) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'transfer/changeLeftDay',
            payload: {
                index, minDay, maxDay
            }
        })
    }

    /** 交易品种选择列表 */
    showActionSheet = () => {
        const { dispatch } = this.props;
        const options = ticketTypes.map((item, index) => item.name);
        const BUTTONS = [ ...options, '取消'];
        ActionSheet.showActionSheetWithOptions(
            {
                options: BUTTONS,
                cancelButtonIndex: BUTTONS.length - 1,
                maskClosable: true,
                'data-seed': 'type'
            },
            (buttonIndex) => {
                if(buttonIndex === BUTTONS.length-1) return;
                this.setState({ 
                    typeIndex: buttonIndex
                });
                dispatch({
                    type: 'transfer/changeTicketType',
                    payload: {
                        index: buttonIndex
                    }
                })
            }
        );
    }

    /**
     * 接收服务返回
     * @param {Object} response 服务返回
     */
    handleResponse = (response) => {
        const { dispatch, location } = this.props;
        const { type } = location.query;
        switch (response.messageName) {
            case TradePartyName.QUERY_VIP:  // VIP 交易对手
                dispatch({
                    type: 'transfer/resVipList',
                    payload: { type, response }
                })
                break;
            case TradePartyName.TIME_LIMIT:  // 议价时限
                dispatch({
                    type: 'transfer/resTimeLimit',
                    payload: { response }
                })
                break;
            case TradePartyName.BUSINESS_DAY:  // 议价时限
                dispatch({
                    type: 'transfer/resBusinessDay',
                    payload: { response }
                })
                break;
            case TradePartyName.TRANSFER:  // 转让交易
                dispatch({
                    type: 'transfer/resTransfer',
                    payload: { response }
                })
                break;
            case TradePartyName.BUY:  // 买入交易
                dispatch({
                    type: 'transfer/resBuy',
                    payload: { response }
                })
                break;
            default:
                break;
        }
    }

    showModal = (e) => {
        e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
            modal: true
        })
    }

    onClose = (e) => {
        this.setState({
            modal: false
        },() => {
            this.setState({
                tempIndex: this.props.timeLimit.defaultIndex
            })
        })
    }

    onTimeLimitChange = (index) => e => {
        this.setState({ tempIndex: index })
    }

    /** 确认选择议价时限 */
    handleSureLimit = () => {
        const { dispatch } = this.props;
        const { tempIndex } = this.state;
        dispatch({
            type: 'transfer/changeLimitIndex',
            payload: { index: tempIndex }
        })
        this.setState({ modal: false })
    }

    /**
     * 票据年利率修改
     */
    handleItemInput = (inventId) => (e) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'dealSelect/changeItemYearRate',
            payload: {
                inventId,
                value: e.target.value
            }
        })
    }

    render() {
        const { timeLimit, businessDay, billList, bankTypeList, selectedParty, totalPrice, typeIndex } = this.props;
        const { type } = this.props.location.query;
        const { tempIndex } = this.state;
        const partyExtra = selectedParty.length>0 ? 
            selectedParty.map((item, index) => item.bankFullName).join(',')
            : "不选择则默认向所有发送请求"

        // 转让交易显示内容
        const dealContent = (
            <div>
                <div className={styles.dealHeader}>
                    <img alt="icon" src={ ticketTypes[typeIndex].icon } />
                    <div>{Number(type) === 1 ? '票据清单' : '买入分类汇总'}</div>
                </div>
                <div>
                {
                    billList.map((item, index) => (
                        <ItemNote key={item.inventId} 
                            data={ item } 
                            onInputChange={ this.handleItemInput(item.inventId) }
                        />
                    )
                )}
                </div>
            </div>
        );

        // 买入交易显示内容
        const typeContent = (
            <div>
                <div className={styles.dealHeader}>
                    <img alt="icon" src={ ticketTypes[typeIndex].icon } />
                    <div>{Number(type) === 1 ? '票据清单' : '买入分类汇总'}</div>
                </div>
                <div>
                    <div className={styles.inputRow}>
                        <div>设置买入金额(万)</div>
                        <input placeholder="请输入买入金额" value={ totalPrice } onChange={ this.handleTotalPrice } />
                    </div>
                    <div>
                    {
                        ticketTypes[typeIndex].id === 3 ?
                        bankTypeList.map((item, index) => (
                            <ItemEticket key={ index } 
                                data={ item } 
                                onRateChange={ this.handleRateChange(item, index) }
                                onDaysChange={ this.handleDaysChange(item, index) }
                            />
                        ))
                        : bankTypeList.map((item, index) => (
                            <ItemPaymentType key={ index } 
                                data={ item } 
                                onRateChange={ this.handleRateChange(item, index) }
                                onDaysChange={ this.handleDaysChange(item, index) }
                            />
                        ))
                    }
                    </div>
                </div>
            </div>
        );

        const content = Number(type) === 1 ? dealContent : typeContent;
        return (
            <div className="page-container">
                <NavBar
                    icon={<Icon type="left" />}
                    onLeftClick={this.goBack}
                >{ Number(type) === 1 ? '票据转让' : '票据买入'}</NavBar>
                <div>
                    <div>
                        <RowCell title="交易品种" extra={ ticketTypes[typeIndex].name } onClick={ this.showActionSheet }/>
                        <RowCell title="议价时限" extra={dateUtil.ms2str(timeLimit.times[timeLimit.defaultIndex])} onClick={ this.showModal }/>
                        <RowCell disabled title="交割日期" extra={`T+0(${businessDay.T0} ${dateUtil.getWeek(new Date(businessDay.T0), 1)})`} />
                        <RowCell title="交易对手" extra={ partyExtra } onClick={this.toTradeParty} />
                    </div>
                    { content }
                    <div className={styles.bottomBtn}>
                        <div onClick={this.handleAddItem}>
                        {
                            Number(type) === 1 ? '添加票据' 
                                : ticketTypes[typeIndex].id === 3 ? '添加承兑人' : '添加分类'
                        }
                        </div>
                        <div 
                            className={ styles.btnCommit }
                            disabled={ bankTypeList.length<=0 && billList.length<=0 }
                            onClick={this.handleCommit} 
                        >发起交易</div>
                    </div>
                </div>
                <Modal
                    className={ styles.modal }
                    popup
                    visible={ this.state.modal }
                    onClose={ this.onClose }
                    animationType="slide-up"
                >
                    <div>
                        <div className={ styles.header }>议价时限</div>
                        <div className={ styles.content }>
                            <div className={ styles.subtitle }>议价时限</div>
                            <div className={ styles.radioGroup }>
                            {
                                timeLimit.times.map( (item, index) => (
                                    <div className={ styles.radio } key={ index }
                                        onClick={ this.onTimeLimitChange(index) }
                                    >
                                        {dateUtil.ms2str(item)}
                                        <img className={tempIndex===index ? styles.active : ''} alt="icon" src={images.IC_RADIO_CHECKED} />
                                    </div>
                                ))
                            }
                            </div>
                        </div>
                        <Button className={ styles.btnCommit } onClick={this.handleSureLimit}>确定</Button>
                    </div>
                </Modal>
                <Event event="svevent" handler={this.handleResponse} />
            </div>
        )
    }
}

TransferPage.contextTypes = {
    socket: PropTypes.object.isRequired,
}

const withLoginComponent = widthLogin()(TransferPage);

const mapStateToProps = ({ transfer, dealSelect, tradePartySelected }) => ({
    ...transfer,
    selectedTradeIds: dealSelect.selectedIds,
    selectedParty: tradePartySelected.selectedParty
})

export default connect(mapStateToProps)(withLoginComponent);