/*
 * @Author: Honye 
 * @Date: 2018-05-08 17:07:12 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-05-08 17:14:09
 */
import { MessageType, DeliveryName } from "../../../constants/TopicName";

/**
 * 查询票据背书信息
 * @param {Object} socket Socket
 * @param {Object} params 参数对象
 * @param {String} params.startDate 开始日期
 * @param {String} params.endDate   结束日期
 * @param {String} params.ticketId  票据 ID
 */
export function queryEndorseInfo(socket, params) {
    socket.sendToServer(MessageType.RPC, DeliveryName.EndorseInfo, params)
}