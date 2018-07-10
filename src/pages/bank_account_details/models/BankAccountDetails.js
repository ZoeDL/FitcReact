
import * as services from '../services/BankAccountDetails';
import { Toast } from 'antd-mobile';
import router from 'umi/router';

export default {
    namespace: 'modifyBankAccount',
    state: {
        item: {}
    },
    
    reducers: {
        /** 银行账户详情 */
        loadBankAccount(state, { payload }) {
            return {...state,item: payload}
        },
        
    },
    effects: {
        /** 银行卡设为默认 */
        *modifyDefaultBankAccount({payload},{call,put}) {
           let response = yield call(services.modifyDefaultBankAccount, payload);
           if (response.data.state === 1) {
               yield Toast.info('设置成功', 1, () => {router.goBack();})
           }
        },
        /** 开启-禁用银行卡 */
        *modifyIsUsingBankAccount({payload},{call,put}) {
            let response = yield call(services.modifyIsUsingBankAccount, payload);
            if (response.data.state === 1) {
                yield Toast.info('设置成功', 1, () => {router.goBack();})
            }
         },
         /** 删除银行卡 */
        *delBankAccount({payload},{call,put}) {
            let response = yield call(services.delBankAccount, payload);
            if (response.data.state === 1) {
                yield Toast.info('删除成功', 1, () => {router.goBack();})
            }
         },
    },
    subscriptions: {

    }
}