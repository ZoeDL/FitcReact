/*
 * @Author: Honye 
 * @Date: 2018-04-08 15:46:29 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-05-17 19:50:11
 */
'use strict';

import * as services from '../services/transfer';
import { Toast } from 'antd-mobile';
import router from 'umi/router';

export default {
    namespace: 'transfer',
    state: {
        timeLimit: {
            times: [3600000,7200000,14400000,21600000],  // 时限
            defaultIndex: 0,                             // 默认时限索引
        },
        businessDay: {},     // 交割日期
        saleVips: [],        // 转让推荐 VIP 交易对手
        buyVips: [],         // 买入推荐 VIP 交易对手
        tradePartyList: [],  // 交易对手列表
        billList: [],        // 票据清单
        totalPrice: '',      // 买入总金额
        bankTypeList: [],    // 分类汇总
        typeIndex: 0,        // 票据类型索引
    },
    reducers: {
        /** 得到 VIP 交易对手列表 */
        gotVipList(state, { payload: { type, list } }) {
            return { ...state, [Number(type)===1?'saleVips':'buyVips']: list }
        },
        /** 得到议价时限 */
        gotTimeLimit(state, { payload: { data } }) {
            return { 
                ...state, 
                timeLimit: {
                    times: data.times,
                    defaultIndex: data.defSelIdx - 1
                } 
            }
        },
        /** 得到交割日期 */
        gotBusinessDay(state, { payload: { data } }) {
            return { ...state, businessDay: data }
        },
        /** 取得选中的票据清单 */
        gotSelectedBills(state, { payload: { list: selectedList } }) {
            return { ...state, billList: selectedList }
        },
        /** 改变议价时限选择 */
        changeLimitIndex(state, { payload: { index } }) {
            return { ...state, timeLimit: { ...state.timeLimit, defaultIndex: index } }
        },
        /** 添加分类 */
        pushBankType(state, { payload: { bankType } }) {
            return { ...state, bankTypeList: [ ...state.bankTypeList, {...bankType} ]}
        },
        /** 改变买入年利率 */
        changeBuyRate(state, { payload: { index, value } }) {
            let bankTypeList = [...state.bankTypeList];
            bankTypeList[index].rate = value;
            return { ...state, bankTypeList }
        },
        /** 改变总金额 */
        changeTotalPrice(state, { payload: { value } }) {
            return { ...state, totalPrice: value }
        },
        /** 改变剩余天数区间 */
        changeLeftDay(state, { payload: { index, minDay, maxDay } }) {
            let bankTypeList = [...state.bankTypeList];
            bankTypeList[index].restBeginDays = minDay;
            bankTypeList[index].restEndDays = maxDay;
            return { ...state, bankTypeList }
        },
        /** 清空 */
        clearState(state) {
            return { ...state, billList: [], bankTypeList: [], totalPrice: '', typeIndex: 0 }
        },
        /** 票据类型 */
        changeTicketType(state, { payload: { index } }) {
            return { ...state, typeIndex: index, bankTypeList: [] }
        }
    },
    effects: {
        /** 请求 VIP 交易对手列表 */
        *reqVipList({ payload: { socket, params } }, { call, put }) {
            yield call(services.reqVipList, socket, params)
        },
        /** 接收 VIP 交易对手返回 */
        *resVipList({ payload: { type, response } }, { call, put }) {
            if(response.state === 1) {
                yield put({
                    type: 'gotVipList',
                    payload: {
                        type,
                        list: response.data.list
                    }
                })
            } else {
                Toast.info(response.message)
            }
        },
        /** 请求交易议价时限 */
        *reqTimeLimit({ payload: { socket, params } }, { call, put }) {
            yield call( services.reqTimeLimit, socket, params )
        },
        /** 接收议价时限 */
        *resTimeLimit({ payload: { response } }, { call, put }) {
            if(response.state === 1) {
                yield put({
                    type: 'gotTimeLimit',
                    payload: {
                        data: response.data
                    }
                })
            } else {
                Toast.info(response.message)
            }
        },
        /** 请求交割日期 */
        *reqBusinessDay({ payload: { socket, params } }, { call, put }) {
            yield call(services.reqBusinessDay, socket, params)
        },
        /** 接收交割日期 */
        *resBusinessDay({ payload: { response } }, { call, put }) {
            if(response.state === 1) {
                yield put({
                    type: 'gotBusinessDay',
                    payload: {
                        data: response.data
                    }
                })
            } else {
                Toast.info(response.message)
            }
        },
        /** 请求发起转让交易 */
        *reqTransfer({ payload: { socket, params } }, { call, put }) {
            yield call(services.reqTransfer, socket, params)
        },
        /** 接收转让交易返回 */
        *resTransfer({ payload: { response } }, { call, put }) {
            if(response.state === 1) {
                Toast.info('转让成功')
                yield put({
                    type: 'clear'
                })
                router.goBack()
            } else {
                Toast.info(response.message)
            }
        },
        /** 请求发起买入交易 */
        *reqBuy({ payload: { socket, params } }, { call, put }) {
            yield call(services.reqBuy, socket, params)
        },
        /** 接收买入交易返回 */
        *resBuy({ payload: { response } }, { call, put }) {
            if(response.state === 1) {
                Toast.info('发起成功')
                yield put({
                    type: 'clear'
                })
                router.goBack()
            } else {
                Toast.info(response.message)
            }
        },
        *clear({ payload }, { call, put }) {
            yield put({
                type: 'tradePartySelected/clearSelectedParty'
            })
            yield put({
                type: 'tradePartyAdd/clearSelected'
            })
            yield put({
                type: 'clearState'
            })
            // 清除添加票据中表单
            yield put({
                type: 'dealSelect/clearState'
            })
        }
    },
    subscriptions: {

    }
}