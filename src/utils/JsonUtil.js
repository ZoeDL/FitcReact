/*
 * 服务请求体/响应体/格式化
 * @Author: ZYuhan 
 * @Date: 2018-04-14 10:38:28 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-04-16 09:17:35
 */
'use strict';

import { debug } from './Debug';
import storageUtil from '../utils/storage';

/**
 * 组装后台服务需要的 Json 格式
 * @param {String} messageCate 消息类型
 * @param {String} messageName 消息名称
 * @param {Object} content     消息内容
 */
export function toFitcJson(messageCate, messageName, content) {
    let body = {
        messageCate: messageCate,
        messageName: messageName,
        messageContent: content
    }
    return toServerJson(body)
}

/**
 * 组装后台服务接收消息所指定的 JSON 格式
 * @param {Object} data 
 */
function toServerJson(data) {
    const msgId = storageUtil.getItem('MessageID')
    let body = {
        MessageID: msgId || getUUID(),
        MessageType: 'BUSINESS',
        Payload: data
    }

    debug(`%c<<${data.messageName}-发送>>`, 'color:#51D4EE;', body);

    let result = JSON.stringify(body);
    return result;
}

/** 生成唯一序列 */
function getUUID() {
    const UUID = S4() + S4() + S4() + '_webmoblie';
    storageUtil.setItem('MessageID', UUID)
    return UUID;
}
function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

/**
 * 解析服务器返回的数据
 * @param {String} data 服务返回的 JSON 字符
 */
export function parseFitcJson(data) {
    let result = JSON.parse(data);
    let Payload = JSON.parse(result.Payload);

    result.Payload = Payload;
    debug(`%c>>${Payload.messageName}-返回<<`, 'color:#4CD233;', result)

    return Payload;

}