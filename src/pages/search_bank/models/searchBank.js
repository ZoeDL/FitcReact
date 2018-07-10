
'use strict';

import * as services from '../services/searchBank';
import { Toast } from 'antd-mobile';

export default {
    namespace: 'searchbank',
    state: {
        bankList:[]
    },

    reducers: {
        searchSuccessed(state, { payload }) {
            console.log('zoe-searchSuccessed',payload)
            return { ...state, ...payload }
        },

        //使用用户输入字段
        searchInput(state, { payload }) {
            return { ...state, ...payload }
        }
    },
    effects: {
        //搜索请求
        *search({ payload }, { call }) {
            yield call(services.postSearch, payload)
        },
        // 请求返回
        *searched( { payload:{response} }, { call, put }) {
            if(response.state === 1) {  // 请求成功
                yield put({
                    type: 'searchSuccessed',
                    payload: response.data
                })
            } else {
                Toast.info( response.message )
            }
        },
    },


}