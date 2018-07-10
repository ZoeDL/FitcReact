/*
 * 注册相关
 * @Author: Honye 
 * @Date: 2018-03-24 17:19:04 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-03-27 09:39:00
 */
'use strict';

import * as services from '../services/regist';
import * as loginServices from '../../login/services/login';
import { Toast } from 'antd-mobile';

export default {
    namespace: 'regist',
    state: {
        timing: false,  // 发送短信后进入倒计时
    },
    reducers: {
        // 发送短信成功
        sentSuccess(state) {
            return { ...state, timing: true }
        },
        // 倒计时结束
        clearInterval(state) {
            return { ...state, timing: false }
        }
    },
    effects: {
        // 发送短信
        *sendSMS({ payload: { socket, phone } }, { call, put }) {
            yield call(services.sendSMS, socket, { phone })
        },
        // 接收短信请求返回
        *gotSMS({ payload: { response } }, { call, put} ) {
            if( response.state === 1 ) {
                yield put({
                    type: 'sentSuccess'
                })
            } else {
                Toast.info(response.message)
            }
        },
        // 请求注册
        *reqRegist({ payload: { socket, params } }, { call, put }) {
            yield call(services.doRegist, socket, params)
        },
        // 注册请求返回
        *gotRegist( { payload:{ socket, response } }, { call, put } ) {
            console.log('注册请求返回', response)
            if(response.state === 1) {
                const { token, user } = response.data
                yield call(loginServices.putSession, socket, {
                    userId: user.userId,
                    token
                })
            } else {
                Toast.info(response.message)
            }
        }
    },
    subscriptions: {
        
    }
}