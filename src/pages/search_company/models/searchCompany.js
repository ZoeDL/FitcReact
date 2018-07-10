
'use strict';

import * as services from '../services/searchCompany';

export default {
    namespace: 'searchCompany',
    state: {

    },

    reducers: {

        //使用用户输入字段
        searchInput(state, { payload }) {
            return { ...state, ...payload }
        }
    },
    effects: {
        //搜索请求
        *search({ payload }, { call }) {
            yield call(services.postSearch, payload)
        },
    },


}