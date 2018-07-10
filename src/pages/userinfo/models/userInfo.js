import * as services from '../services/userInfo';
import { Toast } from 'antd-mobile';

export default {
    namespace: 'userInfo',
    state: {
        fileList: [],
    },

    reducers: {
        handleChange(state,{payload}){
            return {...state, ...payload}
        },
    },

    effects: {
        /** 修改用户头像 */
        *modifyAvatar({ payload }, { call, put }) {
            const response = yield call(services.modifyUserInfo, payload);
            Toast.success('上传成功！')
            if (response.data.state === 1) {
                yield put({
                    type: 'login/modifyUserInfo',
                    payload: {avatar: response.data.data.avatar}
                })
            }
        },
    },


}