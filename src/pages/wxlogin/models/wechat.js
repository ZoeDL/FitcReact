/*
 * 微信相关
 * @Author: Honye 
 * @Date: 2018-04-03 14:04:13 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-04-03 17:39:31
 */
'use strict';

import * as services from '../services/wechat';

export default {
    namespace: 'wechat',
    state: {
        
    },
    reducers: {

    },
    effects: {
        /** 请求微信登录 */
        *reqWxLogin({ payload: { socket, params } }, { call, put }) {
            yield call(services.reqWxLogin, socket, params)
        }
    },
    subscriptions: {

    }
}