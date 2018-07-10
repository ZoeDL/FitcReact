import * as services from '../services/ticketDetails';
import { Toast } from 'antd-mobile';
import router from 'umi/router';

export default {

    namespace: 'ticketDetails',

    state: {
        id: '',
        isEdit: false,
        instrumentType: 'TETICKET',
        ticket: {},
    },

    effects: {
        /** 查看详情 */
        *reqTicket({ payload }, { call }) {
            yield call(services.getTicket, payload); 
        },
        *resTicket({ payload: { response } }, { put }) {
            if (response.state === 1) {
                yield put({
                    type: 'showTicket',
                    payload: response.data.list
                })
            } else {
                
            }
        },
        /** 提交审核 */
        *reqAudit({ payload }, { call }) {
            yield call(services.postAudit, payload); 
        },
        *resAudit({ payload: { response } }, { put }) {
            if (response.state === 1) {
                yield Toast.info('提交成功', 1.5);
                router.goBack();
            } else {
                yield Toast.info('提交失败', 1.5);
            }
        },
        /** 修改票据详情 */
        *reqModifyTicket({ payload }, { call }) {
            yield call(services.postModifyTicket, payload); 
        },
        *resModifyTicket({ payload: { response } }, { put }) {
            if (response.state === 1) {
                yield Toast.info('修改成功', 1.5);
                router.goBack();
            } else {
                yield Toast.info('修改失败', 1.5);
            }
        },
    },

    reducers: {
        /** 存储票据id */
        storageId(state, { payload }) {
            return { ...state, ...payload };
        },

        /** 查看票据详情 */
        showTicket(state, { payload }) {
            return { ...state, ticket: payload };
        },

        /** 设置是否编辑 */
        hanldeEdit(state, { payload }) {
            return { ...state, ...payload };
        },

        /** 修改票据信息 */
        editTicket(state, { payload }) {
            return { ...state, ticket: {...state.ticket, ...payload} };
        },

    },

};
