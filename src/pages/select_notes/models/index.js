/*
 * @Author: Honye 
 * @Date: 2018-05-07 16:27:41 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-05-17 11:53:24
 */
import * as services from '../services';
import { Toast } from "antd-mobile";

export default {
    namespace: 'endorseStatus',
    state: {
        list: []
    },
    reducers: {
        gotEndorseStatus(state, { payload: { list } }) {
            return {...state, list }
        },
        changeCheck(state, { payload: { index, checked } }) {
            const { list } = state;
            list[index].checked = checked;
            return { ...state, list: [...list] }
        },
        changeComment(state, { payload: { index, value } }) {
            const { list } = state;
            list[index].comment = value;
            return { ...state, list: [...list] };
        }
    },
    effects: {
        *reqEndorseStatus({ payload: { socket, params } }, { call, put }) {
            yield call(services.getEndorseStatus, socket, params)
        },
        *resEndorseStatus({ payload: { response } }, { call, put }) {
            if(response.state === 1) {
                yield put({
                    type: 'gotEndorseStatus',
                    payload: {
                        list: response.data.ticketList
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