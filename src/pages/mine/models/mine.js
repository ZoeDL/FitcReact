import * as services from '../services/mine';
import { Modal, Toast } from 'antd-mobile';

const alert = Modal.alert;

export default {
    namespace: 'mine',
    state: {
        phone: "",
    },

    reducers: {
        getPhoneNumber(state,{payload}){
            return {...state, ...payload}
        },
    },

    effects: {
        /** 获取客服电话 */
        *reqKeFuPhone( { payload }, { call, put } ) {
            const response = yield call(services.fetchKeFu);
            if (response.data.state === 1) {
                yield put({
                    type: 'getPhoneNumber',
                    payload: response.data.data
                })
                alert('', `拨打${response.data.data.phone}客服热线？`, [
                    { text: '取消', onPress: () => console.log('cancel') },
                    { text: '确认', onPress: () => window.location.href = `tel:${response.data.data.phone}` },
                ])
            }else {
                Toast.info('获取号码失败')
            }
        },
    },
}