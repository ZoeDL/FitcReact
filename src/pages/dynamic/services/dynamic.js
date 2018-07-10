/*
 * @Author: Honye 
 * @Date: 2018-04-04 09:36:39 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-04-04 09:46:20
 */
'use strict';

import { MessageType, MVCType, DynamicMVC } from '../../../constants/TopicName';

/**
 * 请求动态及待办列表
 * @param {Object} socket Socket
 * @param {Object} parmas 参数
 * @param {String} parmas.rowsPerPage 页容量(1000)
 */
export function reqDynamicList(socket, params) {
    socket.sendToServer(MessageType.CMR, MVCType.REGISTER, { MVCID: DynamicMVC.ID_QUERY , InitParams: params })
}