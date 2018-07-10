/*
 * @Author: Honye 
 * @Date: 2018-04-17 15:49:42 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-05-03 15:43:16
 */
'use strict';

import * as services from '../services';
import { Toast, Modal } from "antd-mobile";
import router from 'umi/router';

export default {
    namespace: 'bargainDetails',
    state: {
        details: {},          // 部分详情
        noteList: [],         // 票据清单
    },
    reducers: {
        gotDetails(state, { payload: { details } }) {
            return { ...state, details }
        },
        gotNoteList(state, { payload: { list } }) {
            return { ...state, noteList: list }
        }
    },
    effects: {
        /** 发起方请求详情 */
        *reqDetails({ payload: { socket, dealType, params } }, { call, put }) {
            yield call(services.getBargainDetails, socket, dealType, params)
        },
        *resDetails({ payload: { response } }, { call, put }) {
            if(response.state === 1) {
                yield put({
                    type: 'gotDetails',
                    payload: {
                        details: response.data.data
                    }
                })
            } else {
                Toast.info(response.message)
            }
        },
        /** 请求票据清单 */
        *reqNoteList({ payload: { socket, dealType, params } }, { call, put }) {
            yield call(services.getNoteList, socket, dealType, params)
        },
        *resNoteList({ payload: { response } }, { call, put }) {
            if(response.state === 1) {
                yield put({
                    type: 'gotNoteList',
                    payload: {
                        list: response.data.data.list
                    }
                })
            } else {
                Toast.info(response.message)
            }
        },
        /** 接收方请求详情 */
        *reqDetailsMVC({ payload: { socket, dealType, params }}, { call, put }) {
            yield call(services.getBargainDetailsMVC, socket, dealType, params)
        },
        *resDetailsMVC({ payload: { response } }, { call, put }) {
            if(response.state === 1) {
                if(response.data.isLocked === '0') {
                    Modal.alert('',
                        `该交易已被交易员(${response.data.lockedName})操作,您当前只能查看，不能操作！`,
                        [
                            { text: '确定' }
                        ]
                    )
                }
                yield put({
                    type: 'gotDetails',
                    payload: {
                        details: response.data
                    }
                })
            } else {
                Toast.info(response.message)
            }
        },
        *resDetailsUpdate({ payload: { response } }, { call, put, select }) {
            yield put({
                type: 'gotDetails',
                payload: {
                    details: response.messageContent
                }
            })
        },
        /** 请求拒绝交易 */
        *reqRefuse({ payload: { socket, dealType, params } }, { call, put }) {
            yield call(services.refuseDeal, socket, dealType, params)
        },
        *resRefuse({ payload: { response } }, { call, put }) {
            if(response.state === 1) {
                Toast.info('拒绝成功')
                yield router.goBack()
            } else {
                Toast.info(response.message)
            }
        },
        /** 请求成交 */
        *reqAcceptDeal({ payload: { socket, dealType, params } }, { call, put }) {
            yield call(services.acceptDeal, socket, dealType, params)
        },
        *resAcceptDeal({ payload: { response } }, { call, put }) {
            if(response.state === 1) {
                yield Toast.info('已成交');
            } else {
                Toast.info(response.message)
            }
        },
        /** 请求提交报价 */
        *reqSubmitQuotation({ payload: { socket, dealType, params } }, { call, put }) {
            yield call(services.putQuotation, socket, dealType, params)
        },
        *resSubmitQuotation({ payload: { response } }, { call, put }) {
            if(response.state !== 1) {
                yield Toast.info(response.message)
            }
        },
    },
    subscriptions: {

    }
}