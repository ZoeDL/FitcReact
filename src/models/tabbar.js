/*
 * 主页 Tab
 * @Author: Honye 
 * @Date: 2018-03-19 16:46:13 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-05-07 10:23:45
 */
'use strict';

export default {
    namespace: 'tabbar',
    state: {
        selectedTab: 'quotation'
    },
    reducers: {
        switchTab(state, { payload }) {
            return { ...state, selectedTab: payload }
        },
        clearTab(state, { payload }) {
            return { ...state, selectedTab: 'quotation' }
        }
    },
    effects: {

    },
    subscriptions: {
        
    }
}