/*
 * @Author: Honye 
 * @Date: 2018-04-04 11:40:02 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-04-04 11:47:30
 */
'use strict';

import { MessageType, DynamicMVC } from '../../../constants/TopicName';

/**
 * @param {Object} socket Socket
 * @param {Object} params 参数
 * @param {Object} params.startDate   查询开始时间
 * @param {Object} params.endDate     查询结束时间
 * @param {Object} params.pageNumber  页码
 * @param {Object} params.pageSize    页容量
 * @param {Object} params.version     服务版本(1)
 */
export function reqHistoryList(socket, params) {
    socket.sendToServer(MessageType.RPC, DynamicMVC.MSG_HISTORY, params)
}