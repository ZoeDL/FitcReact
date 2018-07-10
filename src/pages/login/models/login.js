/*
 * 登录
 * @Author: Honye 
 * @Date: 2018-03-19 17:03:54 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-04-03 17:31:37
 */
'use strict';

import * as services from '../services/login';
import { Toast } from 'antd-mobile';
import router from 'umi/router';

export default {
    namespace: 'login',
    state: {
        actionType:'',
        isLogined: false,   // 是否已登录
        username: '2000000721',       // 用户名
        password: '11111111',       // 密码
        token: '',          // 用户验证
        user: {},           // 用户信息
    },
    reducers: {
        // 登录成功
        loginSuccessed(state, { payload }) {
            return { ...state, ...payload, actionType:'login' }
        },
        // 表单输入
        inputChange(state, { payload }) {
            return { ...state, ...payload }
        },
        // 清空用户信息
        clearUserInfo(state) {
            return { ...state, token:'', user:{}, isLogined:false }
        },
        // 登录(session)成功
        sessionSuccess(state) {
            return { ...state, isLogined:true }
        },
        //修改用户信息
        modifyUserInfo(state, { payload } ) {
            return { ...state, user:{...state.user, ...payload} }
        }
    },
    effects: {
        // 请求登录
        *login({ payload }, { call, put }) {
            yield call(services.postLogin, payload)
        },
        // 请求返回
        *logined( { payload: { socket, response } }, { call, put }) {
            if(response.state === 1) {  // 登录成功
                yield put({
                    type: 'loginSuccessed',
                    payload: response.data
                })
                const { token, user: { userId } } = response.data;
                yield call( services.putSession, socket, { userId, token, isNewSession:1 } )
            } else {
                Toast.info( response.message )
            }
        },
        // 登录(session)结果
        *sessionRes({ payload }, { call, put }) {
            if(payload.state === 1) {
                yield put({
                    type: 'sessionSuccess'
                })
                router.replace('/');
            } else {
                Toast.info(payload.message)
            }
        }
    },
    subscriptions: {

    }
}