/*
 * 交割工具集
 * @Author: Honye 
 * @Date: 2018-04-26 10:36:40 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-05-07 15:21:40
 */
'use strict';

/**
 * 获取确认按钮的文字
 * @param {String} verifyEvent 事件名
 */
export function getVerifyTxt(verifyEvent) {
    switch(verifyEvent) {
        case "TRANFERTICKET":
            return '通知签收';
        case "TRANSFERMONEYDIRECT":
            return '付款';
        case "ENSURETRANFER":
            return '查看转让结果';
        case "CNTRPARTYENSURE":
            return '挑选票据清单';
        default:
            return '确定';
    }
}