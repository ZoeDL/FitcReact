import * as services from '../services/ticketlist';
// import { Toast } from 'antd-mobile';
import { RefreshState } from '../../../components/RefreshListView';
import Config from '../../../constants/Config';

export default {
    namespace: 'ticketlist',
    state: {
        TicketList:[],
        refreshState: RefreshState.HeaderRefreshing,
    },

    reducers: {
        renderTicketList(state, {payload}) {
            let TicketList = [];
            const {list, refreshState, pageNumber} = payload;
            if (pageNumber > 0) {
                TicketList = state.TicketList;
                TicketList = TicketList.concat(list);
            } else {
                TicketList = list;
            }
            return {...state, TicketList, refreshState }
        }
    },

    effects: {
        //获取票据列表请求
        *reqTicketList({ payload }, { call }) {
            yield call(services.getTicketList, payload);
        },
        // 获取票据列表请求返回
        *resTicketList( { payload:{ response, pageNumber } }, { put }) {
            if(response.state === 1) {  // 请求成功
                let list = response.data.list;
                let refreshState = list.length < Config.pageSize ? RefreshState.NoMoreData : RefreshState.Idle;
                yield put({
                    type: 'renderTicketList',
                    payload: {
                        list,
                        refreshState,
                        pageNumber,
                    }
                })
            } else {
                yield put({
                    type: 'renderTicketList',
                    payload: {
                        recordList: [],
                        refreshState: RefreshState.Failure,
                        pageNumber
                    }
                })
            }
        },
    },


}