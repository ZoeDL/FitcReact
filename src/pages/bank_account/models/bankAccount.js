/*
 * 登录
 * @Author: Honye 
 * @Date: 2018-03-19 17:03:54 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-03-23 16:18:11
 */
'use strict';

import * as services from '../services/bankAccount';

export default {
    namespace: 'bankAccount',
    state: {
        fundsData: [],
        ticketData: [],
        initialPage: 0
    },
    reducers: {
        reqBankAccounted(state, { payload }) {
            return { ...state, fundsData: payload }
        },
        reqEBankAccounted(state, { payload }) {
            return { ...state, ticketData: payload }
        },
        handlePage(state,{payload}){
            return { ...state, ...payload }
        }
    },
    effects: {
        *reqBankAccount({payload},{call,put}) {
           let response = yield call(services.getBank, payload);
           if (response.data.state === 1) {
               yield put({
                   type: 'reqBankAccounted',
                   payload: response.data.data
               })
           }
        },
        *reqEBankAccount({payload},{call,put}) {
            let response = yield call(services.getBank, payload);
            if (response.data.state === 1) {
                yield put({
                    type: 'reqEBankAccounted',
                    payload: response.data.data
                })
            }
         },
    },
    subscriptions: {

    }
}