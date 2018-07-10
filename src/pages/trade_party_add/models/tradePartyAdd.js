/*
 * 选择交易对手
 * @Author: Honye 
 * @Date: 2018-04-11 14:10:00 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-05-15 17:50:11
 */
'use strict';

import { Toast } from 'antd-mobile';
import * as services from '../services/tradePartyAdd';

export default {
    namespace: 'tradePartyAdd',
    state: {
        whitelist: [],    // 白名单 [ { categoryId, whitelists: [ { item } ] } ]
        selectedList: {}, // {categoryId: { cpCompanyId: {item} }}
    },
    reducers: {
        /** 拿到白名单 */
        gotWhitelist(state, { payload: { list } }) {
            return { ...state, whitelist: list }
        },
        /** 选择分组/取消选择分组 */
        selectGroup(state, { payload: { groupId, index } }) {
            const { whitelist } = state;
            const selectedList = { ...state.selectedList };
            const groupAll = selectedList[groupId] && Object.keys(selectedList[groupId]).length === whitelist[index].whitelists.length;
            if(groupAll) {
                delete selectedList[groupId];
            } else {
                selectedList[groupId] = {};
                whitelist[index].whitelists.forEach(item => {
                    selectedList[groupId][item.cpCompanyId] = item;
                });
            }
            return { ...state, selectedList }
        },
        /** 选中单个/取消选择 */
        selectChild(state, { payload: { child } }) {
            const selectedList = { ...state.selectedList };
            const { categoryId: groupId, cpCompanyId: childId } = child;
            const checked = selectedList[groupId] && selectedList[groupId][childId];
            if(checked) {
                delete selectedList[groupId][childId]
            } else {
                selectedList[groupId] = selectedList[groupId] || {};
                selectedList[groupId][childId] = child;
            }
            return { ...state, selectedList }
        },
        /** 全选/取消全选 */
        selectAll(state) {
            const { whitelist } = state;
            let selectedList = { ...state.selectedList }, total = 0, selectedNum = 0;
            whitelist.forEach(element => {
                total += element.whitelists.length
            });
            Object.keys(selectedList).forEach((key) => {
                selectedNum += Object.keys(selectedList[key]).length
            })
            const checkedAll = total === selectedNum;
            if(checkedAll) {  // 取消全选
                selectedList = {}
            } else {  // 全选
                whitelist.forEach((group) => {
                    selectedList[group.categoryId] = {};
                    group.whitelists.forEach((child) => {
                        selectedList[group.categoryId][child.cpCompanyId] = child
                    })
                })
            }
            return { ...state, selectedList }
        },
        /** 添加搜索到的新企业 */
        pushList(state, { payload: { list } }) {
            let whitelist = [ ...state.whitelist ];
            let selectedList = { ...state.selectedList };
            whitelist.length>0 && whitelist[whitelist.length-1].whitelists.push(...list)
            list.forEach((child) => {
                selectedList[whitelist[whitelist.length-1].categoryId] = selectedList[whitelist[whitelist.length-1].categoryId] || {};
                selectedList[whitelist[whitelist.length-1].categoryId][child.cpCompanyId] = child
            })
            return { ...state, whitelist, selectedList }
        },
        /** 清空 */
        clearSelected(state) {
            return { ...state, selectedList: {} }
        }
    },
    effects: {
        /** 请求白名单 */
        *getWhitelist({ payload: { socket, params } }, { call, put }) {
            yield call(services.getWhitelist, socket, params)
        },
        *resWhitelist({ payload: { response } }, { call, put }) {
            if(response.state === 1) {
                yield put({
                    type: 'gotWhitelist',
                    payload: {
                        list: response.data.list
                    }
                })
            } else {
                Toast.info(response.message)
            }
        }
    },
    subscriptions: {

    }
}