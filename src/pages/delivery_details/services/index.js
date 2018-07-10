/*
 * 交割详情
 * @Author: Honye 
 * @Date: 2018-04-12 19:10:20 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-04-25 15:50:30
 */
'use strict';

import { MessageType, DynamicMVC, DeliveryName, MVCType } from '../../../constants/TopicName';

/**
 * 交割详情
 * @param {Object} socket Object
 * @param {Object} params 参数对象
 * @param {String} params.tradeId    交易ID
 * @param {String} params.responseId 取reportId的值
 * @param {Number} params.tradeType  直贴(企业):0; 直贴(银行):1;转让(资金方):2;转让(持票方):3;买入(资金方):4;买入(持票方):5
 * @param {Number} params.version    1
 */
export function getDeliveryDetails(socket, params) {
    socket.sendToServer(MessageType.RPC, DynamicMVC.DETAILS_DELIVERY, params)
}

/**
 * 交割详情-票据清单
 * @param {Object} socket Socket
 * @param {Object} params 参数对象
 * @param {Number} params.tradeId    交易 ID
 * @param {Number} params.reportId   取reportId的值
 * @param {String} params.isReceiver 发起方传false，接收方方传true，可通过userStatus来判断
 * @param {Number} params.version    1
 */
export function getNoteList(socket, params) {
    socket.sendToServer(MessageType.RPC, DeliveryName.NOTE_LIST, params)
}

/**
 * 获取交割详情-时间轴
 * @param {Object} socket Socket
 * @param {Object} params 参数对象
 * @param {String} params.tradeId 交易 ID
 */
export function getTimeLine(socket, params) {
    socket.sendToServer(MessageType.CMR, MVCType.REGISTER, { MVCID: DeliveryName.MVC_TIMELINE, InitParams: params })
}

/**
 * 时间轴上按钮事件
 * @param {Object} socket Socket
 * @param {Object} params 参数对象
 * @param {String} params.tradeId        交易 ID
 * @param {String} params.eventName      事件名
 * @param {Object} params.eventParameter 该事件需要的参数对象
 */
export function putTimelineEvent(socket, params) {
    socket.sendToServer(MessageType.RPC, DeliveryName.TIMELINE_EVENT, params)
}