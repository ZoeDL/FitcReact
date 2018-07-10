import * as services from '../services/details';
import {Toast} from 'antd-mobile';

export default {
    namespace: 'pos_details',
    state: {
        data: [],  // 服务返回详情
    },

    reducers: {
        loadData(state, { payload }) {
            return { ...state, data: payload.data }
        },

        clearInvoice(state){
            return {...state, data: {...state.data, voiceList: []}}
        },

        updateInvoive(state, {payload}){
            return { ...state, data: { ...state.data, voiceList: [payload] } }
        },

        updateData(state, {payload}){
            return { ...state, data: { ...state.data, ...payload }}
        }
    },

    effects: {
        *reqDetails({ payload }, { call, put }) {
            yield call(services.reqDetails, payload.socket, payload.params)
        },

        *resDetails({ payload }, { call, put }) {
            Toast.hide();
            if (payload.res.state === 1) {
                yield put({
                    type: 'loadData',
                    payload: {
                        data: payload.res.data
                    }
                })
            }
        },

       
    },

    subscriptions: {

    }
}