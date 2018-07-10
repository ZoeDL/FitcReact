/*
 * 历史动态
 * @Author: Honye 
 * @Date: 2018-04-04 11:37:02 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-04-08 11:40:31
 */
'use strict';
import * as services from '../services/tradeHistory';
import { Toast } from 'antd-mobile';
import dateUtil from '../../../utils/dateUtil';

export default {
    namespace: 'tradeHistory',
    state: {
        startDate: '2017-04-02',  // 开始日期
        endDate: '2018-04-02',    // 结束日期
        list: []
    },
    reducers: {
        /** 得到历史动态列表 */
        gotHistoryList(state, { payload: { list } }) {
            // 过滤掉电商
            const mList = list.filter((item) => item.ticketType!=='TETICKET')
            return { ...state, list: mList }
        },
        /** 改变日期 */
        changeDate(state, { payload: { key, date } } ) {
            return { ...state, [key]: dateUtil.format(date, 'yyyy-MM-dd') }
        }
    },
    effects: {
        /** 请求历史动态 */
        *reqHistoryList({ payload: { socket, params }}, { call, put }) {
            console.log('hy-models-tradeHistory--', socket, params)
            yield call(services.reqHistoryList, socket, params)
        },
        /** 接收历史动态 */
        *resHistoryList({ payload: { response } }, { call, put }) {
            if(response.state === 1) {
                yield put({
                    type: 'gotHistoryList',
                    payload: { list: response.data.list }
                })
            } else {
                Toast.info(response.message)
            }
        }
    },
    subscriptions: {

    }
}