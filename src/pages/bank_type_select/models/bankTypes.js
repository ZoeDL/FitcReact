/*
 * 选择承兑人类型
 * @Author: Honye 
 * @Date: 2018-04-10 16:49:29 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-05-17 16:36:29
 */
import * as services from '../services';
import { Toast } from 'antd-mobile';

export default {
    namespace: 'bankTypes',
    state: {
        selectedBankIds: {},
        list: [],  // 承兑人全称
    },
    reducers: {
        gotRiskList(state, { payload: { list } }) {
            return { ...state, list }
        }
    },
    effects: {
        *reqRiskList({ payload: { socket, params } }, { call, put }) {
            yield call(services.queryRiskList, socket, params)
        },
        *resRiskLisk({ payload: { response } }, { call, put }) {
            if(response.state === 1) {
                yield put({
                    type: 'gotRiskList',
                    payload: {
                        list: response.data.list
                    }
                })
            } else {
                Toast.info(response.message);
            }
        }
    },
    subscriptions: {

    }
}