/*
 * @Author: Honye 
 * @Date: 2018-04-08 15:58:04 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-04-10 17:29:44
 */
'use strict';

import { MessageType, TradePartyName } from '../../../constants/TopicName';

/**
 * 获取 VIP 交易对手（推荐交易对手）
 * @param {Object} socket Socket
 * @param {Object} params 参数对象
 * @param {Number} params.ticketType 票据类型(1：电银、2：纸银)
 * @param {String} params.bizTarget  对手类型(企业间传'enterprise_to_enterprise';银企间传‘enterprise_and_bank’)
 * @param {String} params.bizType    交易类型(buy：买入、sale：转让、zhitie：直贴、discount：贴现)
 * @param {Number} params.version    固定传1
 */
export function reqVipList(socket, params) {
    socket.sendToServer(MessageType.RPC, TradePartyName.QUERY_VIP, params)
}

/**
 * 获取交易议价时限
 * @param {Object} socket Socket
 * @param {Object} params 参数对象
 * @param {String} params.protocol    企业间交易传'FF31'，银行间交易传'FF22'
 * @param {String} params.timeoutType 类型，即时议价传‘asap.rnt’，招标时限传'zhaobiao.rnt',开标时限传‘kaibiao.rnt’
 * @param {Number} params.version     固定传1
 */
export function reqTimeLimit(socket, params) {
    socket.sendToServer(MessageType.RPC, TradePartyName.TIME_LIMIT, params)
}

/**
 * 获取交割日期
 * @param {Object} socket Socket
 * @param {Object} params 参数对象
 * @param {Object} params.version 固定传1
 */
export function reqBusinessDay(socket, params) {
    socket.sendToServer(MessageType.RPC, TradePartyName.BUSINESS_DAY, params)
}

/**
 * 发起转让交易
 * @param {Object} socket Socket
 * @param {Object} params 参数对象
 * @param {Number} params.ticketType       票据类型，1-电票 2-纸票,3-电商
 * @param {Number} params.bargainTime      毫秒单位,议价时间
 * @param {Number} params.requestShowToAll 所有人是否可以查看(0:不可以查看，1:可以查看,可以参与，2:可以查看,不可以参与),手机端强制选择为1
 * @param {String} params.transferDate     交割日期,格式为"2018-04-02"
 * @param {Array} params.cpCompanyIds      数组，所选择交易对手公司ID集合, ['id']
 * @param {Array} params.tickets           数组，所添加票据集合，数组里面是对象, [{ticketId:'id', yearOfRate: 9.0}]
 * @param {Object} params.version          固定传1
 */
export function reqTransfer(socket, params) {
    socket.sendToServer(MessageType.RPC, TradePartyName.TRANSFER, params)
}

/**
 * 发起买入
 * @param {Object} socket Socket
 * @param {Object} params 参数对象
 * @param {String} params.instrumentType    票据类型，ETICKET-电票
 * @param {Number} params.timeLimit         毫秒单位,议价时间
 * @param {Number} params.requestShowToAll  所有人是否可以查看(0:不可以查看，1:可以查看,可以参与，2:可以查看,不可以参与),手机端强制选择为1
 * @param {String} params.jiaogeDate        交割日期,格式为"2018-04-02"
 * @param {String} params.exactCompanyIds   数组，所选择交易对手公司ID集合
 * @param {Number} params.totolPrice        买入票据总额
 * @param {Array} params.submitDataList     数组，所添加的买入条件[{bankType:'GG',buyRate:9.0,restBeginDays:3,restEndDays:366}]
 */
export function reqBuy(socket, params) {
    socket.sendToServer(MessageType.RPC, TradePartyName.BUY, params)
}