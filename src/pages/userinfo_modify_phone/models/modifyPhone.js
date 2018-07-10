import * as services from '../services/modifyPhone';
import router from 'umi/router';

export default {
    namespace: 'modifyPhone',
    state: {
        
    },

    reducers: {

    },

    effects: {
        /** 修改备用号码 */
        *modifyPhone({ payload }, { call, put }) {
            const response = yield call(services.modifyUserInfo, payload);
            if (response.data.state === 1) {
                yield put({
                    type: 'login/modifyUserInfo',
                    payload: {phoneNumber2: response.data.data.phoneNumber2}
                })
                router.goBack()
            }
        },
    },


}