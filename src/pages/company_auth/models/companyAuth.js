import * as services from '../services/companyAuth';
import { Toast } from 'antd-mobile';
import router from 'umi/router';

export default {
    namespace: 'companyAuth',
    state: {
        name:'',
        legalPerson:'',
        province:'', 
        city:'', 
        address:'',
        business: '',
    },

    reducers: {
        changeInputVal(state,{payload}){
            return {...state, ...payload}
        },
        handleCancel(state,{payload}){
            return {...state, ...payload}
        },
        handlePreview(state,{payload}){
            return {...state, ...payload}
        },
        uploadSuccessed(state,{payload}){
            Toast.success('上传成功！');
            return {...state, ...payload}
        },
        /** 选择省市 */
        chooseCity(state, {payload}) {
            return {...state, ...payload}
        },
    },
    effects: {
        *reqCompanyAuth({ payload }, { call }){
            yield call(services.postCompanyAuth, payload);
        },
        *resCompanyAuth({ payload:{response} }, { put }){
            if (response.state === 1) {
                yield Toast.info(response.message);
                router.goBack();
            }else{
                Toast.info(response.message);
            }
        },
        
    },


}