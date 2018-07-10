/*
 * 搜索交易对手且添加
 * @Author: Honye 
 * @Date: 2018-04-11 15:32:57 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-05-15 16:55:14
 */
'use strict';

import * as services from '../services';
import { Toast } from "antd-mobile";

export default {
    namespace: 'tradePartySearch',
    state: {
        list: [],         // 搜索结果
        selectedIds: {},  // 选中的 { id: item, id: item }
    },
    reducers: {
        /** 搜索结果 */
        gotList(state, { payload: { list } }) {
            return { ...state, list }
        },
        /** 选择/取消选择 */
        selectParty(state, { payload: { item } } ) {
            let selectedIds = { ...state.selectedIds };
            if(selectedIds[item.cpCompanyId]) {  // 取消选择
                delete selectedIds[item.cpCompanyId]
            } else {  // 选中
                selectedIds[item.cpCompanyId] = item
            }
            return { ...state, selectedIds }
        },
        /** 全选/取消全选 */
        selectAll(state) {
            let selectedIds = { ...state.selectedIds };
            const checkedAll = state.list.length === Object.keys(selectedIds).length;
            if(checkedAll) {  // 取消全选
                selectedIds = {}
            } else {  // 全选
                state.list.forEach(item => {
                    selectedIds[item.cpCompanyId] = item
                });
            }
            return { ...state, selectedIds }
        },
        clearState(state) {
            return { list:[], selectedIds:{} }
        }
    },
    effects: {
        /** 请求搜索银行和企业 */
        *reqSearchParty({ payload: { socket, params } }, { call, put }) {
            yield call(services.searchTradeParty, socket, params)
        },
        *resSearchParty({ payload: { response } }, { call, put }) {
            if( response.state === 1 ) {
                yield put({
                    type: 'gotList',
                    payload: {
                        list: response.data.list
                    }
                })
            } else {
                Toast.info( response.message )
            }
        },
        /** 请求添加白名单 */
        *reqAddWhitelist({ payload: { socket, params } }, { call, put }) {
            yield call(services.addWhitelist, socket, params)
        }
    },
    subscriptions: {

    }
}