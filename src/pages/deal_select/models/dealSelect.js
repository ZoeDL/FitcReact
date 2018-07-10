/*
 * 添加票据
 * @Author: Honye 
 * @Date: 2018-04-09 11:35:32 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-05-16 19:51:12
 */
'use strict';

export default {
    namespace: 'dealSelect',
    state: {
        list: [],            // 全部列表
        selectedIds: {},     // 以选中的 id 对象 {id: item}
        query: {},           // 进入页面携带参数
    },
    reducers: {
        /** 得到带有选中状态的列表 */
        formatList(state, { payload: { allDeals, selectedDeals, filter } }) {
            // 过滤掉无用数据
            let list = allDeals.filter((item) => {
                // 持票据满足资金方需求
                let condition1 = true;
                if(filter) {
                    const oType = filter[item.bankType];
                    const bMinDateRange = oType && item.restDays >= oType.minDateRange;
                    const bMaxDateRange = oType && item.restDays <= oType.maxDateRange;
                    condition1 = bMinDateRange && bMaxDateRange;
                }

                return item.inventStatus.substring(0, 3) !== 'A02' && 
                    item.platformMark <= 0 &&
                    item.bankType !== 'QT' &&
                    Number(item.restDays) > 3 &&
                    condition1;
            })
            
            return { ...state, list }
        },
        /** 选中变化 */
        handleCheckChange(state, { payload: { item, index } }) {
            const selectedIds = { ...state.selectedIds };
            if( selectedIds[item.inventId] ) {
                delete selectedIds[item.inventId];
            } else {
                selectedIds[item.inventId] = item;
            }

            return { ...state, selectedIds }
        },
        /** 选中全部 */
        selectAll(state) {
            let selectedIds = { ...state.selectedIds };
            if( Object.keys(selectedIds).length === state.list.length ) {
                selectedIds = {}
            } else {
                state.list.forEach( element => {
                    selectedIds[element.inventId] = element
                })
            }
            return { ...state, selectedIds }
        },
        /** 改变选中的年利率 */
        changeItemYearRate(state, { payload: { inventId, value } }) {
            const { selectedIds } = state;
            selectedIds[inventId].yearRate = value;
            return { ...state, selectedIds }
        },
        clearState(state) {
            return { ...state, selectedIds: {}, list: [] }
        }
    },
    effects: {

    },
    subscriptions: {

    }
}