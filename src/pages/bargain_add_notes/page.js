/*
 * 报价详情-添加票据
 * @Author: Honye 
 * @Date: 2018-04-18 17:48:04 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-05-16 11:16:42
 */
import React from 'react';
import { NavBar, Icon, Toast } from 'antd-mobile';
import Timer from '../deal_details/components/Timer';
import Event from '../../socket/Event';
import ItemType from './components/ItemType';
import router from 'umi/router';
import images from '../../constants/Images';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import { MVCIDs, MVCType, PurchaseName } from "../../constants/TopicName";
import calckitUtils from '../../utils/calckitUtils';
import withLogin from '../../components/withLogin';
import styles from './page.less';

class BargainAddNotes extends React.PureComponent {

    handleRefuse = () => {
        const { dispatch, details } = this.props;
        const { socket } = this.context; 
        const { tradeId, isReceiver } = this.props.location.query;
        dispatch({
            type: 'bargainAddNotes/reqRefuse',
            payload: {
                socket,
                params: {
                    tradeId,
                    reportId: details.reportId,
                    isReceiver,
                    version: 1
                }
            }
        })
    }

    componentDidMount() {
        const { dispatch } = this.props;
        const { socket } = this.context;
        const { tradeId } = this.props.location.query;
        dispatch({
            type: 'bargainAddNotes/reqDetails',
            payload: {
                socket,
                params: {
                    tradeId,
                    version: 1
                }
            }
        })
    }

    handleResponse = (response) => {
        const { dispatch } = this.props;
        const { tradeId } = this.props.location.query;
        switch(response.messageName) {
            case MVCType.REGISTER:
                if(response.state===1 && response.data.MVCID===MVCIDs.BuyPartyDetail) {
                    dispatch({
                        type: 'bargainAddNotes/resDetails',
                        payload: { response }
                    })
                } else {
                    Toast.info(response.message)
                }
                break;
            case PurchaseName.REFUSE:
                dispatch({
                    type: 'bargainAddNotes/resRefuse',
                    payload: { response }
                })
                break;
            case PurchaseName.CompBuyPartySubmit:
                dispatch({
                    type: 'bargainAddNotes/resSubmitQuotation',
                    payload: { response }
                })
                break;
            case MVCType.GMMUpdate:
                const messageContent = response.messageContent || {};
                if(messageContent.MVCID===MVCIDs.BuyPartyDetail) {
                    dispatch({
                        type: 'bargainAddNotes/resUpdate',
                        payload: { 
                            response,
                            tradeId
                        }
                    })
                }
                break;
            default:
                break;
        }
    }

    handleAddNotes = () => {
        const { details } = this.props;
        let query = {
            actionType: 'bargainAddNotes/gotNoteList',
            filter: {}
        };
        details.targetList.forEach( el => {
            if(!query.filter[el.bankType]) {
                query.filter[el.bankType] = {};
                query.filter[el.bankType].minDateRange = el.minDateRange;
                query.filter[el.bankType].maxDateRange = el.maxDateRange;
            } else {
                if(el.minDateRange < query.filter[el.bankType].minDateRange) {
                    query.filter[el.bankType].minDateRange = el.minDateRange;
                }
                if(el.maxDateRange > query.filter[el.bankType].maxDateRange) {
                    query.filter[el.bankType].maxDateRange = el.maxDateRange;
                }
            }
        })
        router.push({
            pathname: '/deal_select',
            query
        })
    }

    handleCommit = () => {
        const { dispatch, details, noteList } = this.props;
        const { socket } = this.context;
        const { tradeId, isReceiver } = this.props.location.query;
        dispatch({
            type: 'bargainAddNotes/reqSubmitQuotation',
            payload: {
                socket,
                params: {
                    tradeId,
                    reportId: details.reportId,
                    isReceiver,
                    companyId: details.companyId,
                    timeLimit: 3600000,
                    tradeMode: details.tradeMode,
                    rateList: noteList.map((item, index) => (
                        {
                            inventId: item.inventId,
                            rate: item.rate,
                            modidays: 0,
                            isReport: true
                        }
                    ))
                }
            }
        })
    }

    /**
     * 报价改变
     * @param {Number} inventId 票据唯一标识
     * @param {String} value    新的报价
     */
    handleRateChange = (inventId, value) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'bargainAddNotes/changeNoteRate',
            payload: { inventId, value }
        })
    }

    render() {
        const { details, noteList } = this.props;
        return (
            <div className="page-container">
                <NavBar
                    icon={<Icon type="left" />}
                    onLeftClick={ router.goBack }
                    rightContent={<div style={{color:'#FF0000'}} onClick={this.handleRefuse}>拒绝交易</div>}
                >报价详情</NavBar>
                <div className={ styles.contentWrap }>
                    <div className={styles.header}>
                        <div className={styles.person}>
                            <img className={styles.icon} alt="icon" src={images.IC_SILVER} />
                            <div className={styles.type}>
                                <div>
                                    <span className={styles.tagsPaymentType}>买入</span>
                                    <span>{`${details.deliveryMode}(${details.deliveryDate})`}</span>
                                </div>
                                <div>
                                    <span className={styles.tag}>资金方</span>
                                    <span>{ details.bankName }</span>
                                </div>
                            </div>
                        </div>
                        <div className={styles.number}>
                            <div>
                                <span>买入总金额(万)</span>
                                <span>{ calckitUtils.formatTicketPrice(details.receiveMoney) }</span>
                            </div>
                            <div>
                                <span>剩余天数区间</span>
                                <span>{details.restDayStart}~{details.restDayEnd}</span>
                            </div>
                            <div>
                                <span>报价利率(%)</span>
                                <span>{ details.receiveRate }</span>
                            </div>
                        </div>
                    </div>
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
                    <div>
                        <div className={styles.subtitle}>买入分类列表</div>
                        <div>
                        {
                            details.targetList.map((item, index) => (
                                <ItemType key={ index } 
                                    data={ item } 
                                    notes={
                                        noteList.filter((el) => (
                                            el.bankType===item.bankType &&
                                            el.restDays>item.minDateRange && el.restDays<=item.maxDateRange
                                        ))
                                    }
                                    onRateChange={ this.handleRateChange }
                                />
                            ))
                        }
                        </div>
                    </div>
                </div>
                <div className={ styles.bottom }>
                    <div className={ styles.btnAdd } onClick={ this.handleAddNotes }>添加票据</div>
                    <div className={ styles.btnCommit } onClick={ this.handleCommit }>提交报价</div>
                </div>
                <Event Event="svevent" handler={ this.handleResponse } />
            </div>
        )
    }
}

BargainAddNotes.contextTypes = {
    socket: PropTypes.object.isRequired
}

const withLoginComponent = withLogin()(BargainAddNotes);

const mapStateToProps = ({ bargainAddNotes }) => ({
    details: bargainAddNotes.details,
    noteList: bargainAddNotes.noteList
})

export default connect(mapStateToProps)(withLoginComponent);