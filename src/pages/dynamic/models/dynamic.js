/*
 * @Author: Honye 
 * @Date: 2018-04-04 09:12:28 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-06-01 14:57:33
 */
import * as services from '../services/dynamic';
import { Toast } from 'antd-mobile';

export default {
    namespace: 'dynamic',
    state: {
        todos: [],     // 待办
        dynamics: [],  // 动态
    },
    reducers: {
        /** 得到动态列表 */
        gotList(state, { payload: { list } }) {
            const todos = list.filter((item) => {
                return item.canTodoShowing === '1'
            })
            return { ...state, todos, dynamics: list }
        },
        /** 更新列表 */
        updateList(state, { payload: { response } }) {
            const list = response.messageContent.list;
            const action = list.length>0 && list[0].action;
            // 得到更新的待办列表
            const resTodoList = list.filter((item) => item.canTodoShowing === '1')
            let newTodos = state.todos;
            let newDynamics = state.dynamics;
            switch(action) {
                case 'I':  // 增加
                    newTodos = [...resTodoList, ...newTodos]
                    newDynamics = [...list, ...newDynamics]
                    break;
                case 'D':  // 删除
                    for(let item of list) {
                        const index = state.dynamics.findIndex(data => data.tradeId===item.tradeId)
                        index !== -1 && state.dynamics.splice(index, 1)
                    }
                    for(let item of resTodoList) {
                        const index = state.todos.findIndex(data => data.tradeId===item.tradeId)
                        index !== -1 && state.todos.splice(index, 1)
                    }
                    newTodos = state.todos
                    newDynamics = state.dynamics
                    break;
                case 'M':  // 修改
                    let alt = {};
                    list.forEach((item, index) => {
                        alt[item.tradeId] = item
                    })
                    newDynamics = state.dynamics.map((item, index) => {
                        if(item.tradeId in alt) {
                            return alt[item.tradeId];
                        } else {
                            return item;
                        }
                    })
                    newTodos = state.todos.map((item, index) => {
                        if(item.tradeId in alt) {
                            return alt[item.tradeId]
                        } else {
                            return item
                        }
                    })
                    break;
                default:
                    break;
            }
            return {...state, todos: newTodos, dynamics: newDynamics}
        }
    },
    effects: {
        /** 请求动态及待办 */
        *reqDynamicList({ payload: { socket, params={ rowsPerPage: 1000 } } }, { call, put }) {
            yield call(services.reqDynamicList, socket, params)
        },
        /** 接收动态及待办 */
        *resDynamicList({ payload: { response } }, { call, put }) {
            if(response.state === 1) {
                yield put({
                    type: 'gotList',
                    payload: { list: response.data.list || [] }
                })
            } else {
                Toast.info(response.message)
            }
        }
    },
    subscriptions: {
        
    }
}