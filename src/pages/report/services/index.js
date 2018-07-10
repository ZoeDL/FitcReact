/*
 * @Author: Honye 
 * @Date: 2018-04-27 16:48:07 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-04-27 16:56:51
 */
'use strict';

import { DeliveryName, MessageType } from "../../../constants/TopicName";

/**
 * 投诉
 * @param {Object} socket Socket
 * @param {Object} params 参数对象
 * @param {String} params.tradeId      交易 ID
 * @param {String} params.person       联系人
 * @param {String} params.phone        联系方式
 * @param {String} params.content      投诉内容
 * @param {String} params.messageType  1-交易投诉;2-交易仲裁;3-交割违约;4-其他类型
 * @param {String} params.uploadPicUrl 图片地址,多张逗号分隔
 */
export function putReport(socket, params) {
    socket.sendToServer(MessageType.CMR, DeliveryName.REPORT, params)
}