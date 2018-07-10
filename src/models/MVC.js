/*
 * MVC 事件
 * @Author: Honye 
 * @Date: 2018-04-16 17:07:22 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-04-16 17:45:20
 */
'use strict';

import * as services from '../services/MVC';

export default {
    namespace: 'MVC',
    state: {

    },
    reducers: {

    },
    effects: {
        /** 请求注销 MVC */
        *unregister({ payload: { socket, params } }, { call, put }) {
            yield call(services.unregister, socket, params.MVCID)
        }
    },
    subscriptions: {

    }
}