/*
 * @Author: Honye 
 * @Date: 2018-04-16 10:41:57 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-04-18 18:04:37
 */
'use strict';

/**
 * 是否进入交割
 * @param {Number} tradeStatus 交易状态 1-交易中;2-交割中;3-协商失败(可能在交易中失败,也可能在交割中失败);4-交割成功
 * @param {Number} isShowSpotPanel 协商失败才有值, 0-议价失败;1-交割失败
 * @param {Number} reportId 辅参
 */
export function isDelivery(tradeStatus, isShowSpotPanel, reportId) {
    if(reportId) {
        if(Number(tradeStatus)===2 || Number(tradeStatus)===4) return true;
        if(Number(tradeStatus)===3 && Number(isShowSpotPanel)===1) return true;
    } else {
        return false;
    }
}

/**
 * 是否转让
 * @param {String} tradeMode 交易类型（01：买断 02:买断返售 03：卖断 04：卖断回购 05：直贴交易 20：转让交易 21：买入交易，22：贴现）
 */
export function isTransfer(tradeMode) {
    return tradeMode==='20'|| tradeMode==='05';
}

/**
 * 是否转让发起方
 * @param {Number} userStatus 0-发起方;1-接收方
 * @param {String} tradeMode 交易类型（01：买断 02:买断返售 03：卖断 04：卖断回购 05：直贴交易 20：转让交易 21：买入交易，22：贴现）
 */
export function isTransferSender(userStatus, tradeMode) {
    if(isTransfer(tradeMode)) {
        return Number(userStatus) === 0
    }
    return false;
}

/**
 * 是否买入
 * @param {Stribg} tradeMode 交易类型（01：买断 02:买断返售 03：卖断 04：卖断回购 05：直贴交易 20：转让交易 21：买入交易，22：贴现）
 */
export function isPurchase(tradeMode) {
    return tradeMode==='21' || tradeMode==='22'
}

/**
 * 是否为买入发起人
 * @param {Number} userStatus 用户类型
 * @param {Number} isInquiryList 
 * @param {交易类型} tradeMode 
 */
export function isPurchaseSender(userStatus, isInquiryList, tradeMode) {
    if(isPurchase(tradeMode)) {
        return Number(isInquiryList)===1 && Number(userStatus)===0
    }
    return false;
}

/**
 * 是否进入买入接收方加票页
 */
export function isPurchaseReceiverAddNotes(userStatus, isInquiryList, tradeMode) {
    if(isPurchase(tradeMode)) {
        return Number(isInquiryList)===1 && !(Number(userStatus)===0)
    }
    return false;
}

/**
 * 
 * @param {} userStatus 
 * @param {*} isInquiryList 
 * @param {*} tradeMode 
 */
export function isBuySender(userStatus, isInquiryList, tradeMode) {
    if(isPurchase(tradeMode)) {
        if( Number(isInquiryList)===1 ) {
            if( Number(userStatus)===0 ) {
                //TODO 进入买入发起方（企业报价列表）
            } else {
                //TODO 进入买入接收方（加票）
            }
        } else {
            if( Number(userStatus)===0 ) {
                //TODO 进入买入接收方（议价）
            }
        }
    }
}