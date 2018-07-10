/*
 * 交割详情
 * @Author: Honye 
 * @Date: 2018-04-12 19:17:10 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-05-03 16:50:25
 */
'use strict';

import * as services from '../services';
import { Toast, Modal } from "antd-mobile";

export default {
    namespace: 'deliveryDetails',
    state: {
        details: {},   // 部分详情
        noteList: [],  // 票据清单
        timeline: {    // 时间轴
            list: []
        },
    },
    reducers: {
        /** 部分详情 */
        gotDetails(state, { payload: { details } }) {
            return { ...state, details }
        },
        /** 票据清单 */
        gotNoteList(state, { payload: { list } }) {
            return { ...state, noteList: list }
        },
        /** 时间轴 */
        gotTimeline(state, { payload: { timeline } }) {
            return { ...state, timeline: { ...state.timeline, ...timeline } }
        },
    },
    effects: {
        /** 请求交割详情 */
        *reqDetails({ payload: { socket, params } }, { call, put }) {
            yield call(services.getDeliveryDetails, socket, params)
        },
        /** 接收交割详情返回 */
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
        /** 请求交割详情-票据清单 */
        *reqNoteList({ payload: { socket, params } }, { call, put }) {
            yield call(services.getNoteList, socket, params)
        },
        *resNoteList({ payload: { response } }, { call, put }) {
            if(response.state === 1) {
                yield put({
                    type: 'gotNoteList',
                    payload: { list: response.data.list }
                })
            } else {
                Toast.info(response.message)
            }
        },
        /** 请求交割详情-时间轴 */
        *reqTimeLine({ payload: { socket, params } }, { call, put }) {
            yield call(services.getTimeLine, socket, params)
        },
        *resTimeline({ payload: { response } }, { call, put }) {
            if(response.state === 1) {
                yield put({
                    type: 'gotTimeline',
                    payload: {
                        timeline: response.data
                    }
                })
            } else {
                Toast.info(response.message)
            }
        },
        /** 请求时间轴按钮事件 */
        *reqTimelineEvent({ payload: { socket, params } }, { call, put }) {
            yield call(services.putTimelineEvent, socket, params)
        },
        /** 更新时间轴 */
        *updateTimeline({ payload: { response } }, { call, put }) {
            yield put({
                type: 'gotTimeline',
                payload: {
                    timeline: response.messageContent
                }
            })
        }
    },
    subscriptions: {

    }
}