import * as services from '../services/position';

export default {
    namespace: 'position',
    state: {
        inventList: //持仓列表请求
            { searchKeyValue: {},  // 筛选条件
            pageSize: 20,
            pageNumber: 0,
            isPaged: 0,
            ticketType: 'ETICKET',
            version: 1,
            list: [],
            },
        authStatus: false,
        inventHist://移入历史持仓请求
            {inventId:'',
            reasonInfo: '',
            reasonDesc: '',
            status: 0     
            }
    },

    reducers: {
        listSuccessed(state, {payload}){
            return { ...state, inventList: {...state.inventList, list: payload.data}}
        },

        updateAuth(state, {payload}){
            return {...state, authStatus: payload.authStatus}
        },

        handleMVC(state, {payload}){
            let alt = {};
            payload.data.forEach((item, index) => {
                alt[item.inventId] = item;
            })
            const action = payload.data.length > 0 && payload.data[0].action;
            let newList;
            if(action === 'D') {  //删除
                payload.data.forEach((item) => {
                    let index = state.inventList.list.findIndex(data => {
                        return item.inventId === data.inventId 
                    })
                    index !== -1 && state.inventList.list.splice(index, 1);
                })   
                newList = state.inventList.list;             
                
            } else if(action === 'M') {  //修改
                newList = state.inventList.list.map((item, index) => {
                    if (item.inventId in alt) return alt[item.inventId];
                    else return item;
                })
            } else {  //新增
                newList = [...payload.data, ...state.inventList.list];
            }
            return { ...state, inventList: { ...state.inventList, list: [...newList]} }
        }
    },

    effects: {
        *reqList({payload}, {call}){
            yield call(services.reqList, payload.socket, payload.params)
        },


        *resList({payload}, {call, put}){
            if(payload.res.state === 1){
                const data = payload.res.data.list.filter(item => item.inventType === "01");
                yield put({
                    type: 'listSuccessed', 
                    payload: {
                        data: data,
                    }
                })
            }
        },

        *reqAuth({payload}, {call}) {
            yield call(services.reqAuth, payload.socket)
        },

        *reqMoveToHistory({payload}, {call}){
            yield call(services.reqMoveToHistory, payload.socket, payload.params)
        },

        *reqRetrive({payload},{call}){
            yield call(services.reqRetrive, payload.socket, payload.params);
        },

        *resMVC({payload}, {put}){
            yield put({
                type: 'handleMVC',
                payload: {
                    data: payload.res.messageContent.BusinessObject
                }
            })
        }

       
    },

    subscriptions: {

    }
}