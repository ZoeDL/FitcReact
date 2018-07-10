/*
 * 承兑人
 * @Author: Honye 
 * @Date: 2018-05-17 16:15:06 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-05-17 16:26:30
 */
import { MessageType, PurchaseName } from '../../../constants/TopicName';

/**
 * @param {Object} socket Socket
 * @param {Object} params 参数对象
 * @param {String} params.tradeMode 交易模式 21-买入
 */
export function queryRiskList(socket, params) {
    socket.sendToServer(MessageType.RPC, PurchaseName.RISK_LIST, params)
}