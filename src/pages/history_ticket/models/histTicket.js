import * as services from '../services/histTicket';

export default {
    namespace: 'history_ticket',
    state: {
        ticketType: 'TETICKET',
        bankType: '',
        pageSize: 20,
        pageNumber: 0,  
        version: 1,
        list: []
    },
    reducers: {
        listSuccessed(state, { payload }) {
            return { ...state, list: payload.data }
        }

    },
    effects: {
        *reqList({ payload }, { call }) {
            yield call(services.reqList, payload.socket, payload.params);
        },

        *resList({ payload }, { put }) {
            if (payload.res.state === 1) {
                yield put({
                    type: 'listSuccessed',
                    payload: {
                        data: payload.res.data.list,
                    }
                })
            }

        }
    },
    subscriptions: {

    }
}