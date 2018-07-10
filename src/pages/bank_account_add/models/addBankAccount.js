
import * as services from '../services/addBankAccount';
import { Toast } from 'antd-mobile';
import router from 'umi/router';

export default {
    namespace: 'addBankAccount',
    state: {
        item: {
            openProvince: '', 
            openCity: '', 
        }
    },
    
    reducers: {
        /** 账户类型 */
        setAccountType(state, { payload }) {
            return { ...state, item: {...state.item, accountType: payload.accountType } }
        },
        /** 开户行返回 */
        bankNameSuccessed(state, { payload }) {
            return { ...state, item: {...state.item, openAccountFullName: payload.bankName,bigNum: payload.bankCode } }
        },
        /** 大额行号 */
        bigNumSuccessed(state, { payload }) {
            return { ...state, item: {...state.item, bigNum: payload.bigNum } }
        },
        /** 账号 */
        accountNumSuccessed(state, { payload }) {
            return { ...state, item: {...state.item, accountNum: payload.accountNum } }
        },
        /** 设置默认账户 */
        defaultAccountSuccessed(state, { payload }) {
            return { ...state, item: {...state.item, isDefaultAccount: payload.isDefaultAccount } }
        },
        /** 设置同步 */
        syncSuccessed(state, { payload }) {
            return { ...state, item: {...state.item, isSync: payload.isSync } }
        },
        /** 选择省市 */
        chooseCity(state, {payload}) {
            return {...state, item: {...state.item, openProvince: payload.openProvince,  openCity: payload.openCity}}
        }
    },
    effects: {
        /** 添加银行账户 */
        *addBankAccount({payload},{call,put}) {
           let response = yield call(services.addBankAccount, payload);
           if (response.data.state === 1) { //添加成功
            Toast.info(response.data.message, 1, () => {router.goBack();})
           }
        },
        
         
    },
    subscriptions: {

    }
}