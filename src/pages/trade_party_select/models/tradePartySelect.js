/*
 * 已选交易对手
 * @Author: Honye 
 * @Date: 2018-04-08 14:56:24 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-04-12 14:22:06
 */
'use strict';

export default {
    namespace: 'tradePartySelected',
    state: {
        selectedParty: [],  // 自我选择的交易对手
    },
    reducers: {
        /** 改变选择交易对手 */
        pushSelectParty(state, { payload: { list } }) {
            return { ...state, selectedParty: list }
        },
        /** 清空已选择 */
        clearSelectedParty(state) {
            return { ...state, selectedParty: [] }
        }
    },
    effects: {
        
    },
    subscriptions: {

    }
}