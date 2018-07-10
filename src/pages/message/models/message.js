import * as services from '../services/message';
import {Toast} from 'antd-mobile';

export default {
    namespace: 'message',
    state: {
        list: [],
        refreshing: true,
    },

    reducers: {
        mergeMessageList(state, {payload, refreshing}){
            return {...state, list: payload.list, refreshing:refreshing }
        }
    },

    effects: {
        *reqMessageList({payload}, {call}) {
            yield call(services.getMessageList, payload)
        },
        *resMessageList(payload, {put}) {
            const response = payload.payload;
            if (response.state === 1) {
                yield put({
                    type: 'mergeMessageList',
                    payload: response.data,
                    refreshing: false
                })
            }else {
                Toast.info(response.message)
            }
        },
        *reqMessageRead({payload}, {call}) {
            yield call(services.setAllRead, payload)
        },
        *resMessageRead(payload, {put}) {
           
        },
    },
}