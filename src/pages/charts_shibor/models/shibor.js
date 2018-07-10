import * as services from '../services/shibor';
import {Toast}  from 'antd-mobile';

export default {
    namespace: 'shibor',
    state: {
        shibor_data:[]
    },

    reducers: {
        /** 更新数据 */
        reserveData(state, {payload}){
            return {...state, ...payload}
        },
    },

    effects: {
        //请求shibor图表数据
        *reqShiborData({ payload }, { call, put }) {
            const res = yield call(services.getShibor, payload);
            if (res.state === 1) {
                yield put({
                    type: 'reserveData',
                    payload: res.data
                })
            }else {
                Toast.info('暂无数据')
            }
        },
    }
}