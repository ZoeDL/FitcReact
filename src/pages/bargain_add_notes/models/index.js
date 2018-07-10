/*
 * @Author: Honye 
 * @Date: 2018-04-18 18:25:58 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-04-21 17:42:27
 */
'use strict';

import * as services from '../services';
import { Toast } from "antd-mobile";
import router from 'umi/router';

export default {
    namespace: 'bargainAddNotes',
    state: {
        details: {
            targetList: [],
        },
        noteList: [],
    },
    reducers: {
        gotDetails(state, { payload: { details } }) {
            return { ...state, details }
        },
        gotNoteList(state, { payload: { list } }) {
            return { ...state, noteList: list }
        },
        changeNoteRate(state, { payload: { inventId, value } }) {
            let noteList = [...state.noteList];
            noteList.forEach((item, index, array) => {
                if(item.inventId === inventId) {
                    item.rate = parseFloat(value)
                }
            })
            return { ...state, noteList }
        }
    },
    effects: {
        *reqDetails({ payload: { socket, params } }, { call, put }) {
            yield call(services.getDetails, socket, params)
        },
        *resDetails({ payload: { response } }, { call, put }) {
            if(response.state === 1) {
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
        *reqRefuse({ payload: { socket, params } }, { call, put }) {
            yield call(services.putRefuse, socket, params)
        },
        *resRefuse({ payload: { response } }, { call, put }) {
            if(response.state === 1) {
                Toast.info('拒绝成功')
                yield router.goBack()
            } else {
                Toast.info(response.message)
            }
        },
        *reqSubmitQuotation({ payload: { socket, params } }, { call, put }) {
            yield call(services.putQuotation, socket, params)
        },
        *resSubmitQuotation({ payload: { response } }, { call, put }) {
            if(response.state !== 1) {
                yield Toast.info(response.message)
            }
        },
        *resUpdate({ payload: { response, tradeId } }, { call, put }) {
            const messageContent = response.messageContent;
            yield put({
                type: 'gotDetails',
                payload: {
                    details: messageContent
                }
            })
            if(messageContent.inquiryListId+'' === tradeId+'') {
                router.replace({
                    pathname: '/bargain_details',
                    query: {
                        tradeId: messageContent.tradeId,
                        type: 'buy',
                        isReceiver: 'false',
                        reportId: messageContent.reportId
                    }
                })
            }
        }
    },
    subscriptions: {

    }
}