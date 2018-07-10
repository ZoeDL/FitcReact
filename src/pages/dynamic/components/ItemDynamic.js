/*
 * 动态列表 Item
 * @Author: Honye 
 * @Date: 2018-04-02 08:51:17 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-04-21 17:33:36
 */
'use strict';

import React from 'react';
import images from '../../../constants/Images';
import router from 'umi/router';
import convertUtils from '../../../utils/convertUtil';
import dateUtils from '../../../utils/dateUtil';
import calckitUtils from '../../../utils/calckitUtils';
import { isDelivery, isTransfer, isTransferSender, isPurchase, isPurchaseSender, isPurchaseReceiverAddNotes } from '../../../utils/conditionUtil';
import styles from './ItemDynamic.less';

class ItemDynamic extends React.PureComponent {

    static defaultProps = {
        data: {}
    }

    toDetails = () => {
        const { tradeStatus, isShowSpotPanel, tradeId, reportId, tradeMode, isOriginalSender, userStatus, isInquiryList } = this.props.data;
        if( isDelivery(Number(tradeStatus), Number(isShowSpotPanel), reportId) ) {  // 交割详情
            router.push({
                pathname: '/delivery_details',
                query: { tradeId, reportId, tradeMode, isOriginalSender }
            })
        } else {  // 议价详情
            if( isTransfer(tradeMode) ){
                if(isTransferSender(userStatus, tradeMode)) {
                    // 进入转让发起方含企业报价列表
                    router.push({
                        pathname: '/deal_details',
                        query: { 
                            tradeId, 
                            type: 'transfer',
                            isReceiver: 'false'
                        }
                    })
                } else {
                    //TODO 进入转让接收议价
                    router.push({
                        pathname: '/bargain_details',
                        query: {
                            tradeId,
                            type: 'transfer',
                            isReceiver: 'true',
                            reportId
                        }
                    })
                } 
            } else if(isPurchase(tradeMode)){
                if(isPurchaseSender(userStatus, isInquiryList, tradeMode)) {
                    // 买入发起方交易详情
                    router.push({
                        pathname: '/deal_details',
                        query: { 
                            tradeId, 
                            type: 'buy',
                            isReceiver: 'true'
                        }
                    })
                } else if(isPurchaseReceiverAddNotes(userStatus, isInquiryList, tradeMode)) {
                    // 买入接收方加票
                    router.push({
                        pathname: '/bargain_add_notes',
                        query: {
                            tradeId,
                            type: 'buy',
                            isReceiver: 'true',
                            reportId
                        }
                    })
                } else {
                    //TODO 买入接收方议价
                    router.push({
                        pathname: '/bargain_details',
                        query: {
                            tradeId,
                            type: 'buy',
                            isReceiver: 'false',
                            reportId
                        }
                    })
                }
            }
        }
    }

    render() {
        const { paymentType, tradeMode, tradeStatus, tradeStatusCName, totalPrice, restDayStart, restDayEnd, reachRate, submitTime, tradeNo } = this.props.data;
        return (
            <div className={ styles.wrapper } onClick={ this.toDetails }>
                <div className={ styles.top }>
                    <div>
                        <span className={ styles.tagsPaymentType }>{ paymentType==='--'?'混合':paymentType }</span>
                        <span className={`${styles.tags} ${convertUtils.getTradeModeClass(tradeMode)}`}>{ convertUtils.tradeModeConvert(tradeMode) }</span>
                    </div>
                    <div className={`${styles.status} ${convertUtils.getTradeStatusColor(tradeStatus)}`}>{ tradeStatusCName }</div>
                </div>
                <div className={ styles.middle }>
                    <div className={ styles.flex }>
                        <img className={ styles.icon } alt="icon" src={ images.IC_SILVER_RECT } />
                        <div className={ styles.flexColumn }>
                            <span>票面总额(万)</span>
                            <span>{ calckitUtils.formatTicketPrice(totalPrice||0) }</span>
                        </div>
                    </div>
                    <div className={ styles.flexColumn }>
                        <span>剩余天数</span>
                        <span>{ restDayStart===restDayEnd ? `${restDayStart}` : `${restDayStart}~${restDayEnd}` }</span>
                    </div>
                    <div className={ styles.flexColumn }>
                        <span>报价利率(%)</span>
                        <span>{ reachRate }</span>
                    </div>
                </div>
                <div className={ styles.bottom }>
                    <span>发起时间：<span>{ dateUtils.format(new Date(submitTime), 'yyyy-MM-dd') }</span></span>
                    <span>交易编号：<span>{ tradeNo }</span></span>
                </div>
            </div>
        )
    }
}

export default ItemDynamic;