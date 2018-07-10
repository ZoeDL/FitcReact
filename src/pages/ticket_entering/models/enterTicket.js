
import * as services from '../services/enterTicket';
import { Toast } from 'antd-mobile';
import router from 'umi/router';

export default {

    namespace: 'enterTicket',

    state: {
        ticket: {
            instrumentType: 'TETICKET', //电商
            version: 1
        },
    },

    effects: {
        /** 录入票据 */
        *reqEnterTicket({ payload }, { call }) {
            yield call(services.postEnterTicket, payload); 
        },
        *resEnterTicket({ payload: { response } }, { put }) {
            if (response.state === 1) {
                yield put({
                    type: 'clearInfo',
                    payload: {instrumentType: 'TETICKET', version: 1}
                })
                Toast.info('录入成功', 1.5);
                router.goBack();
            } else {
                yield Toast.info('录入失败', 1.5);
            }
        },
    },

    reducers: {
        /** 存储用户输入信息 */
        storageInfo(state, { payload }) {
            return { ...state, ticket: {...state.ticket, ...payload} };
        },

        /** 初始化用户信息 */
        clearInfo(state, { payload }) {
            return { ...state, ticket: {...payload} };
        },
    },

};
