/*
 * 
 * @Author: Honye 
 * @Date: 2018-04-27 16:57:26 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-04-28 15:46:30
 */
'use strict';

import * as services from '../services';
import { Toast } from 'antd-mobile';
import router from 'umi/router';

export default {
    namespace: 'report',
    state: {

    },
    reducers: {

    },
    effects: {
        *reqReport({ payload: { socket, params } }, { call, put }) {
            yield call(services.putReport, socket, params)
        },
        *resReport({ payload: { response } }, { call, put }) {
            if(response.state === 1) {
                if(response.data.state===1) {
                    yield router.goBack()
                }
                Toast.info(response.data.message)
            } else {
                Toast.info(response.message)
            }
        }
    },
    subscriptions: {

    }
}