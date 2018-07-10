import * as services from '../services/funds';
import { Toast } from 'antd-mobile';
import mergeFundsRecordOptions from '../entity/funds';
import { RefreshState } from '../../../components/RefreshListView';
import Config from '../../../constants/Config'

export default {
    namespace: 'funds',
    state: {
        account:{},
        isVisible: true,
        accountType: '03',
        version: 1,
        recordList:[],
        refreshState: RefreshState.HeaderRefreshing,
    },

    reducers: {
        /** 资金账户余额请求成功 */
        reqBalanceSuccessed(state, { payload }) {
            return { ...state, ...payload }
        },
        /** 控制余额是否可以显示 */
        handleVisible(state, { payload }) {
            return { ...state, ...payload }
        },
        /** 资金账户余额请求成功 */
        reqFundsRecordedSuccessed(state, { payload,pageNumber }) {
            let recordList = [];
            if (pageNumber > 0) {
                recordList = state.recordList;
                recordList = recordList.concat(payload.recordList);
            } else {
                recordList = payload.recordList
            }
            return { ...state, recordList:recordList, refreshState:payload.refreshState }
        },
    },
    effects: {
        //资金账户余额请求
        *reqBalance({ payload }, { call }) {
            yield call(services.getBalance, payload)
        },
        //资金流水记录请求
        *reqFundsRecord({ payload }, { call }) {
            yield call(services.getRecord, payload)
        },
        // 资金账户余额请求返回
        *reqBalanced( { payload:{socket,response} }, { call, put }) {
            if(response.state === 1) {  // 请求成功
                yield put({
                    type: 'reqBalanceSuccessed',
                    payload: response.data
                })
                let fundsRecordOptions = mergeFundsRecordOptions();
                yield put({
                    type: 'reqFundsRecord',
                    payload: {socket, params:{...fundsRecordOptions, accountId:response.data.account.accountId}}
                })
            } else {
                Toast.info( response.message )
            }
        },
        // 资金流水记录请求返回
        *reqFundsRecorded( { payload:{socket,response,pageNumber} }, { call, put }) {
            if(response.state === 1) {  // 请求成功
                let recordList = response.data.recordList;
                let refreshState = recordList.length < Config.pageSize ? RefreshState.NoMoreData : RefreshState.Idle;
                yield put({
                    type: 'reqFundsRecordedSuccessed',
                    payload: {
                        recordList,
                        refreshState
                    },
                    pageNumber
                })
            } else {
                yield put({
                    type: 'reqFundsRecordedSuccessed',
                    payload: {
                        recordList: [],
                        refreshState:RefreshState.Failure
                    },
                    pageNumber
                })
            }
        },
        
    },


}