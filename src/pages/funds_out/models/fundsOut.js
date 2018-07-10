import * as services from '../services/fundsOut';
import { Toast } from 'antd-mobile';
import router from 'umi/router';

export default {
    namespace: 'fundsOut',
    state: {
        accountList:[],
        defaultaccount: {},
        isCCenter: "0",
        isDeleted: "0",
        isUsing: "1",
        version: 1,
        withdrawAmount:'',
        withdrawReason:'',
    },

    reducers: {
        /** 交易中心银行卡账户列表[出金]请求成功 */
        reqfundsOutSuccessed(state, { payload }) {
            return { ...state, ...payload, defaultaccount: payload.accountList[0] }
        },
        /** 修改默认账户 */
        updateDefaultAccount(state, { payload }) {
            return { ...state, defaultaccount:payload.item }
        },
        /** 修改提现金额 */
        updateWithDrawAmount(state, { payload }) {
            return { ...state, ...payload }
        },
        /** 修改备注 */
        updateWithDrawReason(state, { payload }) {
            return { ...state, ...payload }
        },
        
    },
    effects: {
        //交易中心银行卡账户列表[出金]请求
        *reqfundsOut({ payload }, { call }) {
            yield call(services.getfundsOut, payload)
        },
        // 交易中心银行卡账户列表[出金]请求返回
        *reqfundsOuted( { payload:{socket,response} }, { call, put }) {
            if(response.state === 1) {  // 请求成功
                let data = response.data;
                let dataArr = Object.keys(data);
                if (dataArr.length !== 0) {
                    yield put({
                        type: 'reqfundsOutSuccessed',
                        payload: response.data
                    })
                }
            } else {
                Toast.info( response.message )
            }
        },
        //提交申请请求
        *submit({ payload }, { call }) {
            yield call(services.submitAccount, payload)
        },
        *submited({ payload:{socket,response} }, { call,put }) {
            if(response.state === 1) {  // 请求成功
                yield Toast.info( response.message )
                router.goBack()
            } else {
                Toast.info( response.message )
            }
        },
       
        
    },


}