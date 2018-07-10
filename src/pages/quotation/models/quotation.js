
'use strict';

import * as services from '../services/quotation';
import { Toast } from 'antd-mobile';
import { RefreshState } from '../../../components/RefreshListView';
import Config from '../../../constants/Config';
export default {
    namespace: 'quotation',
    state: {
        dynamicData: {//今日请求逐笔
            refreshState: RefreshState.HeaderRefreshing,
            dataSource: []
        },
        shiborData: [],//行情顶部shibor数据
        dynamicHistoryData: {//成交逐笔
            refreshState: RefreshState.HeaderRefreshing,
            dataSource: []

        },
        dynamicDetailData:{}//今日请求逐笔详情
    },

    reducers: {
        dynamicFinished(state, { payload, pageNumber ,isGMMUpdate}) {//今日请求逐笔数据返回
            let datas = [];
            if(isGMMUpdate){//主动更新
                if(state.dynamicData.dataSource){
                    datas = state.dynamicData.dataSource;
                    let index=state.dynamicData.dataSource.findIndex(function(value, index, arr) {
                        return value.inquiryId ===payload.dataSource.inquiryId;
                      })
                    if(index>-1){
                        datas.splice(index,1);
                        datas.unshift(payload.dataSource);
                      }else{
                        datas.unshift(payload.dataSource)
                      }
                }else{
                    datas.unshift(payload.dataSource)
                }
            }else{
                if (pageNumber > 0) {
                    datas = state.dynamicData.dataSource;
                    datas = datas.concat(payload.dataSource);
                } else {
                    datas = payload.dataSource;
                }
            }
            return { ...state, dynamicData: { refreshState: payload.refreshState, dataSource: datas } }
        },
        shiborFinished(state, { payload }) {//行情顶部shibor数据
            return { ...state, shiborData: payload }
        },
        dynamicHistoryFinished(state, { payload, pageNumber }) {//成交逐笔
            let datas = [];
            if (pageNumber > 0) {
                datas = state.dynamicHistoryData.dataSource;
                datas = datas.concat(payload.dataSource);
            } else {
                datas = payload.dataSource;
            }
            return { ...state, dynamicHistoryData: { refreshState: payload.refreshState, dataSource: datas } }
        },
        dynamicDetailFinished(state,{payload}){//今日请求逐笔详情，买入详情
            return { ...state, dynamicDetailData: payload }
        }


    },
    effects: {
        *dynamic({ payload }, { call }) {//今日请求逐笔数据
            Toast.loading('加载中', 0);
            yield call(services.postDynamicData, payload)
        },
        *dynamicFinish({ payload, pageNumber ,isGMMUpdate}, { put }) {//今日请求逐笔数据返回
            Toast.hide();
            if(isGMMUpdate){//增量更新
                yield put({
                    type: 'dynamicFinished',
                    payload: {
                        refreshState: RefreshState.Idle,
                        dataSource: payload,
                    },
                    isGMMUpdate
                })
            }else  if (payload.state === 1) {//成功
                let refreshState1;
                if (payload.data.entityList && payload.data.entityList.length > 0) {
                    refreshState1 = payload.data.hasNextPage ? RefreshState.Idle : RefreshState.NoMoreData;
                } else {
                    refreshState1 = pageNumber > 0 ? RefreshState.Idle : RefreshState.Empty
                }

                yield put({
                    type: 'dynamicFinished',
                    payload: {
                        refreshState: refreshState1,
                        dataSource: payload.data.entityList
                    },
                    pageNumber: pageNumber,
                    isGMMUpdate
                })
            } else if (payload.state === -1) {//用户登录过期
                Toast.info(payload.message, 1);
                yield put({
                    type: 'login/clearUserInfo',
                })
            } else {
                yield put({
                    type: 'dynamicFinished',
                    payload: {
    
                    }
                })
                Toast.info(payload.message, 1);
            }
        },
        *shibor({ payload }, { call }) {//shibor请求数据
            yield call(services.postShiborData, payload)
        },
        *shiborFinish({ payload }, { put }) {
            if (payload.state === 1) {//成功
                yield put({
                    type: 'shiborFinished',
                    payload: payload.data.result
                })
            }
        },
        *dynamicHistory({ payload }, { call }) {//成交逐笔
            Toast.loading('加载中', 0);
            yield call(services.postDynamicHistoryData, payload)
        },
        *dynamicHistoryFinish({ payload, pageNumber }, { put }) {//成交逐笔结束
            Toast.hide();
            if (payload.state === 1) {//成功
                let data = payload.data.CursorPage.rows;
                let refreshState1 = data.length < Config.pageSize ? RefreshState.NoMoreData : RefreshState.Idle;
                yield put({
                    type: 'dynamicHistoryFinished',
                    payload: {
                        refreshState: refreshState1,
                        dataSource: payload.data.CursorPage.rows
                    },
                    pageNumber: pageNumber,
                })
            } else {
                yield put({
                    type: 'dynamicHistoryFinished',
                    payload: {
                        refreshState: RefreshState.Failure,
                        dataSource: []
                    },
                    pageNumber: pageNumber,
                })
            }

        },
        *dynamicItemDetail({ payload }, { call }){//请求逐笔点击查看详情
            yield call(services.postDynamicDetailData, payload)
        },
        *dynamicDetailFinish({ payload }, { put }){//请求逐笔点击查看详情结果
            if(payload.state === 1){//成功
                yield put({
                    type: 'dynamicDetailFinished',
                    payload:payload.data
                })
            }
        }
    },


}