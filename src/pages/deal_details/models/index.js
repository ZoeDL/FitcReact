/*
 * 转让-发起方
 * @Author: Honye 
 * @Date: 2018-04-16 14:55:32 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-05-03 17:24:55
 */
'use strict';

import * as services from '../services';
import { Toast, Modal } from 'antd-mobile';
import router from "umi/router";

export default {
    namespace: 'transferSender',
    state: {
        details: {
            list: [],        // 转让票据清单
            bankReport: [],  // 参与报价的企业
            targetList: [],  // 买入票据清单
        }
    },
    reducers: {
        gotDetails(state, { payload: { details} }) {
            const bankReport = details.bankReport.filter((item) => item.isShowDetail)
            return { ...state, details: { ...details, bankReport } }
        }
    },
    effects: {
        /** 获取详情 */
        *reqDetails({ payload: { socket, dealType, params } }, { call, put }) {
            yield call(services.getDealDetailsForSender, socket, dealType, params)
        },
        *resDetails({ payload: { response } }, { call, put }) {
            if(response.state === 1) {
                if(response.data.isLocked === '0') {
                    Modal.alert('',
                        `该交易已被交易员(${response.data.lockedName})操作,您当前只能查看，不能操作！`,
                        [ { text: '确定' } ]
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
        /** 请求解锁 */
        *reqRelease({ payload: { socket, params } }, { call, put }) {
            yield call(services.releaseLock, socket, params)
        },
        /** 请求取消交易 */
        *reqCancel({ payload: { socket, dealType, params } }, { call, put }) {
            yield call(services.cancelDeal, socket, dealType, params)
        },
        *resCancel({ payload: { response } }, { call, put }) {
            if(response.state === 1) {
                Toast.info('取消成功')
                yield router.goBack()
            } else {
                Toast.info(response.message)
            }
        },
        /** 接收更新 */
        *resUpdate({ payload: { response } }, { call, put }) {
            yield put({
                type: 'gotDetails',
                payload: {
                    details: response.messageContent
                }
            })
            if(response.messageContent.isLocked==='0') {
                Toast.info('该交易已被交易员操作,您当前只能查看，不能操作！')
            }
        }
    },
    subscriptions: {

    }
}