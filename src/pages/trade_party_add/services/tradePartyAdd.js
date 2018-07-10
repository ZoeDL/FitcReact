/*
 * 选择交易对手
 * @Author: Honye 
 * @Date: 2018-04-11 14:20:38 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-04-11 14:25:05
 */
'use strict';

import { MessageType, TradePartyName } from '../../../constants/TopicName';

/**
 * 获取白名单
 * @param {Object} socket Socket
 * @param {Object} params 参数对象
 * @param {Number} params.whitelistType 固定传1
 * @param {Number} params.version       固定传1
 */
export function getWhitelist(socket, params) {
    socket.sendToServer(MessageType.RPC, TradePartyName.WHITELIST, params)
}