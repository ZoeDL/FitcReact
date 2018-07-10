import * as services from '../services/chart';
import {Toast} from 'antd-mobile';

export default {
    namespace: 'charts',
    state: {
        chartData:[]
    },

    reducers: {
        /** 更新数据 */
        updateChartData(state,{payload}){
            return {...state, chartData: payload.result}
        },
    },
    effects: {
        //查询图表数据请求
        *reqChartData({ payload }, { call }) {
            yield call(services.QueryChartData, payload)
        },
        //查询图表数据请求返回
        *resChartData( { payload:{response} }, { put }) {
            if(response.state === 1 ) {  // 请求成功
                yield put({
                    type: 'updateChartData',
                    payload: response.data
                })
            } else {
                Toast.info( '暂无数据' )
            }
        },
    }
}