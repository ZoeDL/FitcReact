'use strict';

import { MessageType, MarketMsgName } from '../../../constants/TopicName';

/**
 * 行情今日请求逐笔
 */
export function postDynamicData({ socket,isLogined,dynamicOptions }){
    socket.sendToServer(isLogined?MessageType.RPC:MessageType.NO_LOGIN, MarketMsgName.DYNAMIC,dynamicOptions);
}
/**
 * 行情今日请求逐笔详情
 * @param {*} param0 
 */
export function postDynamicDetailData({ socket,isLogined,inquiryId }){
    socket.sendToServer(isLogined?MessageType.RPC:MessageType.NO_LOGIN, MarketMsgName.DYNAMIC_DETAIL,{inquiryId:inquiryId});
}
/**
 * 行情顶部shibor数据
 * @param {*} param0 
 */
export function postShiborData({ socket }){
    socket.sendToServer(MessageType.NO_LOGIN, MarketMsgName.Shibor,{});
}
/**
 * 行情成交逐笔
 * @param {*} socket 
 * @param {*} isLogined 
 * @param {*} dynamicHistoryOptions 
 */
export function postDynamicHistoryData({socket,isLogined,dynamicHistoryOptions}){
    socket.sendToServer(isLogined?MessageType.RPC:MessageType.NO_LOGIN, MarketMsgName.DYNAMIC_HISTORY,dynamicHistoryOptions);
}