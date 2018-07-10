/*
 * 登录请求
 * @Author: Honye 
 * @Date: 2018-03-19 17:22:45 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-04-03 17:25:27
 */
'use strict';

import { MessageType, LoginMsgName } from '../../../constants/TopicName';

const defaultParams = {
    putSession: {
        userId: null,
        token: null,
        isNewSession: 0,
        clientType: 2,
        connectionId: 'mobile',
        serverVersion: 1,
        ipAddress: 'mobile',
        macAddress: 'mobile',
        clientVersion: 2,
    }
}

/**
 * 登录请求
 * @param {Object}  obj.socket      socket 连接
 * @param {String}  obj.username    用户名
 * @param {String}  obj.password    密码
 */
export function postLogin({ socket, username, password }) {
    socket.sendToServer(MessageType.NO_LOGIN, LoginMsgName.LOGIN_TOKEN, { loginName: username, password });
}

/**
 * 登录（服务获取 session）
 * @param {Object} socket Socket
 * @param {Object} params 参数对象
 * @param {String} params.userId 用户 ID
 * @param {String} params.token 用户验证
 * @param {Number} params.isNewSession 强制登录
 */
export function putSession(socket, params = defaultParams.putSession) {
    socket.sendToServer(MessageType.REG, LoginMsgName.LOGIN, {...defaultParams.putSession, ...params})
}
