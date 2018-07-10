/*
 * @Author: Honye 
 * @Date: 2018-05-08 17:03:45 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-05-08 18:03:32
 */
import * as services from '../services';
import { Toast } from 'antd-mobile';

export default {
    namespace: 'endorseInfo',
    state: {
        list: []
    },
    reducers: {
        gotEndorseInfo(state, { payload: { list } }) {
            return { ...state, list }
        }
    },
    effects: {
        *reqEndorseInfo({ payload: { socket, params } }, { call, put }) {
            yield call(services.queryEndorseInfo, socket, params)
        },
        *resEndorseInfo({ payload: { response } }, { call, put }) {
            if(response.state === 1) {
                yield put({
                    type: 'gotEndorseInfo',
                    payload: {
                        list: response.data.data
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