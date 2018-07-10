/*
 * 注册请求
 * @Author: Honye 
 * @Date: 2018-03-24 17:27:28 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-03-27 09:07:03
 */
'use strict';

import { MessageType, LoginMsgName } from '../../../constants/TopicName';

/**
 * 发送验证码
 * @param {Object} socket Socket
 * @param {Object} params 参数
 * @param {String} params.phone 手机号
 */
export function sendSMS(socket, { phone }) {
    socket.sendToServer(MessageType.NO_LOGIN, LoginMsgName.SMS, { teleNum: phone })
}

/**
 * 注册
 * @param {Object} socket Socket
 * @param {Object} params 参数
 * @param {String} params.name     名字
 * @param {String} params.phone    手机号
 * @param {String} params.code     验证码
 * @param {String} params.password 密码
 */
export function doRegist(socket, { name, phone, code, password }) {
    socket.sendToServer(MessageType.NO_LOGIN, LoginMsgName.REGIST, {teleNum:phone, name, vertifyCode:code, password})
}