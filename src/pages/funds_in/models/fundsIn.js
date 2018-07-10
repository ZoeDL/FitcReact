import * as services from '../services/fundsIn';
import { Toast } from 'antd-mobile';

export default {
    namespace: 'fundsIn',
    state: {
        accounts:[],
        defaultaccount:{
            openAccountFullName: '',
            accountName: '',
            accountNum: '',
            bigNum: ''
        },
        accountType: '01',
        isCCenter: "1",
        isDeleted: "0",
        isUsing: "0",
        version: 1,
        serialNumber: '',
    },

    reducers: {
        /** 交易中心银行卡账户列表[入金]请求成功 */
        reqFundsInSuccessed(state, { payload }) {
            return { ...state,  ...payload, defaultaccount: payload.accounts[0] }
        },
        /** 修改默认账户 */
        updateFundsIn(state, { payload }) {
            return { ...state,  defaultaccount: payload.item }
        },
        /** 修改流水号 */
        updateSerialNumber(state, { payload }) {
            return { ...state, ...payload }
        },
        
    },
    effects: {
        //交易中心银行卡账户列表[入金]请求
        *reqFundsIn({ payload }, { call }) {
            yield call(services.getFundsIn, payload)
        },
        // 交易中心银行卡账户列表[入金]请求返回
        *reqFundsIned( { payload:{socket,response} }, { call, put }) {
            if(response.state === 1 ) {  // 请求成功
                let data = response.data;
                if(data.accounts.length > 0){
                    yield put({
                        type: 'reqFundsInSuccessed',
                        payload: data
                    })
                }
                
            } else {
                Toast.info( response.message )
            }
        },
       
        
    },


}