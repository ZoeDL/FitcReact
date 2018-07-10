/*
 * 忘记密码
 * @Author: Honye 
 * @Date: 2018-03-26 13:59:10 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-03-29 11:17:34
 */
'use strict';

import * as services from '../services/forgotPassword';
import { Toast } from 'antd-mobile';
import router from 'umi/router';

export default {
    namespace: 'forgotPassword',
    state: {
        timing: false,  // 短信发送成功后进入倒计时
    },
    reducers: {
        // 短信发送成功
        smsSuccessed(state) {
            return { ...state, timing:true }
        },
        // 倒计时结束
        clearInterval(state) {
            return { ...state, timing: false }
        },
    },
    effects: {
        // 请求发送短信
        *reqSendSMS( { payload: { socket, phone } }, { call, put } ) {
            yield call( services.reqSendSMS, socket, { phone } )
        },
        // 接收短信请求返回
        *resSMS({ payload: { response } }, { call, put }) {
            if(response.state === 1) {
                yield put({
                    type: 'smsSuccessed'
                })
            } else {
                Toast.info(response.message)
            }
        },
        // 请求更改密码
        *reqModifyPassword({ payload: { socket, params } }, { call, put }) {
            yield call(services.reqModifyPassword, socket, params)
        },
        // 接收更改密码返回
        *resModifyPassword({ payload: { response } }, { call, put }) {
            if(response.state === 1) {
                Toast.info('密码修改成功，请重新登录')
                yield router.replace('/login')
            } else {
                Toast.info(response.message)
            }
        }
    },
    subscriptions: {

    }
}