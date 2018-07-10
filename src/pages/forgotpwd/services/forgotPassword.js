/*
 * 忘记密码
 * @Author: Honye 
 * @Date: 2018-03-26 14:00:02 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-03-27 11:21:55
 */
'use strict';

import { MessageType, LoginMsgName } from '../../../constants/TopicName';

/**
 * 发送短信验证码
 * @param {Object} socket Socket
 * @param {Object} param1 参数
 * @param {String} param1.phone 手机号
 */
export function reqSendSMS( socket, { phone } ) {
    socket.sendToServer( MessageType.NO_LOGIN, LoginMsgName.SMS, { teleNum: phone } )
}

/**
 * 请求更改密码
 * @param {Object} socket Socket
 * @param {Object} param1 参数
 * @param {String} param1.phone     手机号
 * @param {String} param1.code      验证码
 * @param {String} param1.password  新密码
 */
export function reqModifyPassword( socket, { phone, code, password } ) {
    socket.sendToServer( MessageType.NO_LOGIN, LoginMsgName.FORGOT_PASSWORD, { teleNum:phone, verifyCode:code, newPassword:password } )
}