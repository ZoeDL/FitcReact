/*
 * @Author: Honye 
 * @Date: 2018-04-18 18:23:17 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-04-19 09:06:22
 */
'use strict';

import { MessageType, MVCType, MVCIDs, PurchaseName } from "../../../constants/TopicName";

export function getDetails(socket, params) {
    socket.sendToServer( MessageType.CMR, MVCType.REGISTER, {
        MVCID: MVCIDs.BuyPartyDetail, 
        InitParams: params 
    })
}

export function putRefuse(socket, params) {
    socket.sendToServer( MessageType.RPC, PurchaseName.REFUSE, params)
}

export function putQuotation(socket, params) {
    socket.sendToServer(MessageType.CMR, PurchaseName.CompBuyPartySubmit, params)
}