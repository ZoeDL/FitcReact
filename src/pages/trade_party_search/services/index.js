/*
 * 搜索交易对手且添加
 * @Author: Honye 
 * @Date: 2018-04-11 15:34:06 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-04-12 18:43:00
 */
'use strict';

import { MessageType, TradePartyName } from '../../../constants/TopicName';

/**
 * 搜索全平台银行和企业
 * @param {Object} socket Socket
 * @param {Object} params 参数对象
 */
export function searchTradeParty(socket, params) {
    socket.sendToServer(MessageType.RPC, TradePartyName.SEARCH_PARTY, params)
}

/**
 * 添加白名单
 * @param {Object} socket Socket
 * @param {Object} params 参数对象
 * @param {Array} params.list 企业列表 [{}]
 * @param {Number} params.whitelistType 1
 * @param {Number} params.version 1
 */
export function addWhitelist(socket, params) {
    socket.sendToServer(MessageType.RPC, TradePartyName.WHITELIST_ADD, params)
}