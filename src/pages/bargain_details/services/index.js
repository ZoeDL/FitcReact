/*
 * @Author: Honye 
 * @Date: 2018-04-17 15:49:58 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-04-21 15:10:22
 */
'use strict';

import { MessageType, TransferName, PurchaseName, MVCType, MVCIDs } from "../../../constants/TopicName";

/**
 * 发起方获取报价详情
 * @param {Object} socket   Socket
 * @param {String} dealType 交易类型
 * @param {Object} params   参数对象
 * @param {String} params.tradeId    交易 ID
 * @param {String} params.reportId   企业响应 ID
 * @param {String} params.isReceiver 'false'-持票方, 'true'-资金方
 */
export function getBargainDetails(socket, dealType='transfer', params) {
    // 转让持票方查看报价详情
    socket.sendToServer(
        MessageType.CMR, 
        dealType==='transfer'?TransferName.BargainDetails:PurchaseName.BargainDetails, 
        params
    )
}

/**
 * 发起方获取议价中票据清单
 * @param {Object} socket   Socket
 * @param {String} dealType 交易类型
 * @param {Object} params   参数对象
 * @param {String} params.tradeId    交易 ID
 * @param {String} params.reportId   企业响应 ID
 * @param {String} params.isReceiver 'false'-持票方, 'true'-资金方
 */
export function getNoteList(socket, dealType='transfer', params) {
    socket.sendToServer(
        MessageType.CMR,
        dealType==='transfer'?TransferName.NotesOfBargain:PurchaseName.NotesOfBargain,
        params
    )
}

/**
 * 接收方获取报价详情
 * @param {Object} socket   Socket
 * @param {String} dealType 交易类型
 * @param {Object} params   参数对象
 * @param {String} params.tradeId 交易 ID
 */
export function getBargainDetailsMVC(socket, dealType='transfer', params) {
    socket.sendToServer(
        MessageType.CMR, 
        MVCType.REGISTER,
        { 
            MVCID: dealType==='transfer' ? MVCIDs.SellCPartyDetail : MVCIDs.BuyPartyDetail, 
            InitParams: params 
        }
    )
}

/**
 * 拒绝交易
 * @param {Object} socket   Socket
 * @param {String} dealType 交易类型
 * @param {Object} params   参数对象
 * @param {String} params.tradeId     交易 ID 
 * @param {String} params.reportId    企业响应 ID
 * @param {String} params.isReceiver  'true'-接收方; 'false'-发送方
 * @param {String} params.version     1
 */
export function refuseDeal(socket, dealType='transfer', params) {
    socket.sendToServer(
        MessageType.RPC,
        dealType==='transfer' ? TransferName.REFUSE : PurchaseName.REFUSE,
        params
    )
}

/**
 * 成交
 * @param {Object} socket   Socket
 * @param {String} dealType 交易类型
 * @param {Object} params   参数对象
 * @param {String} params.tradeId     交易 ID 
 * @param {String} params.reportId    企业响应 ID
 * @param {String} params.isReceiver  'true'-接收方; 'false'-发送方
 * @param {String} params.version     1
 */
export function acceptDeal(socket, dealType='transfer', params) {
    socket.sendToServer(
        MessageType.RPC,
        dealType==='transfer' ? TransferName.ACCEPT : PurchaseName.ACCEPT,
        params
    )
}

export function putQuotation(socket, dealType='transfer', params) {
    socket.sendToServer(
        MessageType.CMR, 
        dealType='transfer' ? TransferName.CompSellProcessSubmit : PurchaseName.CompBuyPartySubmit, 
        params
    )
}