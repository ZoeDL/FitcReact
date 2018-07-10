/*
 * @Author: Honye 
 * @Date: 2018-04-16 14:57:25 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-04-17 13:59:59
 */
'use strict';

import { MessageType, MVCType, MVCIDs, TradePartyName, PurchaseName } from '../../../constants/TopicName';

/**
 * 转让发起方获取交易详情
 * @param {Object} socket   Socket
 * @param {String} dealType 交易类型 'transfer'-转让;'buy'-买入
 * @param {Object} params   参数对象
 * @param {String} params.tradeId 交易 ID
 * @param {Number} params.version 1
 */
export function getDealDetailsForSender(socket, dealType='transfer', params) {
    socket.sendToServer(MessageType.CMR, MVCType.REGISTER, {
        MVCID: dealType==='transfer' ? MVCIDs.SellPartyDetail : MVCIDs.BuyCPartyDetail,
        InitParams: params
    })
}

/**
 * 解锁
 * @param {Object} socket Object
 * @param {Object} params 参数对象
 * @param {String} params.tradeId 交易 ID
 * @param {Number} params.version 1
 */
export function releaseLock(socket, params) {
    socket.sendToServer(MessageType.RPC, TradePartyName.ReleaseLock, params)
}

/**
 * 取消交易
 * @param {Object} socket   Socket
 * @param {String} dealType 交易类型 'transfer'-转让;'buy'-买入
 * @param {Object} params   参数对象
 * @param {String} params.tradeId    交易 ID
 * @param {String} params.isReceiver 'false'-持票方, 'true'-资金方
 */
export function cancelDeal(socket, dealType='transfer', params) {
    socket.sendToServer(MessageType.RPC, (dealType==='transfer' ? TradePartyName.CANCEL : PurchaseName.CANCEL), params)
}