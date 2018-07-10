import * as services from '../services/modifyName';
import router from 'umi/router';

export default {
    namespace: 'modifyName',
    state: {
        
    },

    reducers: {

    },

    effects: {
        /** 修改交易称谓 */
        *modifyTradeName({ payload }, { call, put }) {
            const response = yield call(services.modifyUserInfo, payload);
            if (response.data.state === 1) {
                yield put({
                    type: 'login/modifyUserInfo',
                    payload: {name: response.data.data.name}
                })
                router.goBack()
            }
        },
    },


}