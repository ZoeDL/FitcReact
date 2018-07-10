
import * as services from '../services/updateDetails';
import { Toast } from 'antd-mobile';
import router from 'umi/router';

export default {
    namespace: 'updateBankAccount',
    state: {
        item: {}
    },
    
    reducers: {
        
        /** 银行账户详情返回 */
        localBankAccountSuccessed(state, { payload }) {
            return {...state, ...payload}
        },
        /** onInput大额行号 */
        onInputBigNumSuccessed(state, { payload }) {
            return {...state,   item: {...state.item, bigNum: payload.bigNum }  }
        },
        /** onInput账号 */
        onInputAccountNumSuccessed(state, { payload }) {
            return {...state,   item: {...state.item, accountNum: payload.accountNum }  }
        },
        /** onSelect开户行全称 */
        onSelectBankNameSuccessed(state, { payload }) {
            return {...state,   item: {...state.item, openAccountFullName: payload.bankName, bigNum: payload.bankCode }  }
        },
        /** 选择省市 */
        chooseCity(state, {payload}) {
            return {...state, item: {...state.item, ...payload}}
        }
        
    },
    effects: {
        /** 修改银行账户 */
        *modifyBankAccount({payload},{call,put}) {
           let response = yield call(services.modifyBankAccount, payload);
           if (response.data.state === 1) {
               yield put({
                   type: 'modifyBankAccount/loadBankAccount',
                   payload: payload
               })
               Toast.info('设置成功', 1, () => {router.goBack();})
           }else {
               Toast.info('设置失败', 1)
           }
        },
        
    },
    subscriptions: {

    }
}