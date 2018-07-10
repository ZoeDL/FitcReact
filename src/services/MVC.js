/*
 * MVC
 * @Author: Honye 
 * @Date: 2018-04-16 17:08:02 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-04-16 17:20:02
 */
'use strict';

import { MessageType, MVCType } from '../constants/TopicName';

/**
 * 注册 MVC 监听
 * @param {Object} socket Socket
 * @param {String} MVCID MVC ID
 */
export function unregister(socket, MVCID) {
    socket.sendToServer(MessageType.CMR, MVCType.UNREGISTER, { MVCID })
}