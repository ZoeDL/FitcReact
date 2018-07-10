import * as services from '../services/FundsHistory';
import DateUtil from '../../../utils/dateUtil';
import { RefreshState } from '../../../components/RefreshListView';
import Config from '../../../constants/Config';

let startDate=DateUtil.format(DateUtil.addYear(new Date(),-1),'yyyy-MM-dd');
let endDate=DateUtil.format(new Date() ,'yyyy-MM-dd');

export default {
    namespace: 'fundsHistory',
    state: {
        startDate,
        endDate,
        recordList: [],
        refreshState:RefreshState.HeaderRefreshing,
    },

    reducers: {
        /** 日期选择 */
        datePicker(state,{payload}){
            return {...state, ...payload}
        },
        /** 得到历史纪录列表 */
        getHistoryList(state,{payload}){
            let recordList = [];
            if (payload.pageNumber > 0) {
                recordList = state.recordList;
                recordList = recordList.concat(payload.recordList);
            } else {
                recordList = payload.recordList
            }
            return { ...state, recordList:recordList, refreshState:payload.refreshState }
        }
    },
    effects: {
        *reqHistoryList({ payload }, { call }){
            yield call(services.getRecord, payload);
        },
        *resHistoryList({ payload:{response,pageNumber} },{put}){
            if(response.state === 1) {  // 请求成功
                let recordList = response.data.recordList;
                let refreshState = recordList.length < Config.pageSize ? RefreshState.NoMoreData : RefreshState.Idle;
                yield put({
                    type: 'getHistoryList',
                    payload: {
                        recordList,
                        refreshState,
                        pageNumber
                    }
                })
            } else {
                yield put({
                    type: 'getHistoryList',
                    payload: {
                        recordList: [],
                        refreshState: RefreshState.Failure,
                        pageNumber
                    }
                })
            }
        }
    },


}