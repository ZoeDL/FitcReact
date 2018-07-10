import * as services from '../services/history'; 

export default {
    namespace: 'history',
    state: {
        ticketType: 'ETICKET',
        bankType: '',
        pageSize: 20,
        pageNumber: 0,
        version: 1,
        list: []
    },
    reducers: {
        listSuccessed(state, {payload}){
            return {...state, list: payload.data}
        }

    },
    effects: {
        *reqList({payload}, {call}){
            yield call(services.reqList, payload.socket, payload.params);
        },

        *resList({payload}, {put}){
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