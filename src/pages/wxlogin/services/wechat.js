/*
 * @Author: Honye 
 * @Date: 2018-04-03 14:12:53 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-04-03 15:14:28
 */

import { MessageType, LoginMsgName } from '../../../constants/TopicName';

/**
 * 微信登录
 * @param {Object} socket Socket
 * @param {Object} params 参数
 * @param {String} parmas.code 微信返回 code
 */
export function reqWxLogin(socket, params) {
    socket.sendToServer(MessageType.NO_LOGIN, LoginMsgName.WX_LOGIN, params)
}