import * as services from '../services/company';
import router from 'umi/router';

export default {
    namespace: 'company',
    state: {
        
    },

    reducers: {
        getCompany(state,{payload}){
            return {...state, ...payload}
        }
    },
    effects: {
        *reqCompany({ payload }, { call }){
            yield call(services.postCompany, payload);
        },
        *resCompany({ payload:{response} }, { put }){
            if (response.state === 1) {
                if (response.data.statusCode.toString() === '1') {
                    router.push('/company_auth')
                } else {
                    yield put({
                        type: 'getCompany',
                        payload: response.data
                    })
                }
            } 
        }
        
    },


}