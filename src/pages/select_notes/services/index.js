/*
 * @Author: Honye 
 * @Date: 2018-05-07 16:21:04 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-05-07 16:27:01
 */
import { MessageType, DeliveryName } from '../../../constants/TopicName';

/**
 * 获取票据背书状态
 * @param {Object} socket Socket 实例
 * @param {Object} params 参数对象
 * @param {String} params.tradeId 交易 ID
 */
export function getEndorseStatus(socket, params) {
    socket.sendToServer(MessageType.RPC, DeliveryName.EndorseStatus, params)
}