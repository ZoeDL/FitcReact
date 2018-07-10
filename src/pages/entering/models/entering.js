import * as services from '../services/entering'

const defaultParams = {
    inventJson: {
        productType: "01",
        inventType: "01",
        inventStatus: "A01",
        instrument: {
            paymentFullname: "", 
            bankType: "",
            expireDate: "",
            issueDate: "",
            invoiceList: [],
            issueAccount: "",
            issueBank: "",
            issuePerson: "",
            receiptAccount: "",
            receiptBank: "",
            receiptPerson: "",
            ticketImgURL: "",
            ticketNo: "",
            ticketType: "ETICKET",
            ticketPrice: ""
        },
        createBy: "00",
        creatCompanyID: 21575,
        costPrice: null,
        operatorId: 0,
        creatUserID: 0,
        platformMark: 0
    },
   
}

   
export default {
    namespace: 'entering',
    state: {...defaultParams},
    reducers: {
        //清空上一次录入时选择的内容
        clearOriginalData(state){
            return {...state, ...defaultParams}
        },

        //清空上一次录入的发票内容
        clearInvoiceData(state){
            return { ...state, inventJson: { ...state.inventJson, instrument: { ...state.inventJson.instrument, invoiceList: [] } } };
        },

        //传一些固定数据，如用户id等
        fixedParams(state, {payload}){
            return {...state, inventJson: {...state.inventJson, ...payload}}
        },
        //录入票据内容
        onInputChange(state, {payload}){
            return {...state, inventJson: {...state.inventJson, instrument: {...state.inventJson.instrument, ...payload}}};
        },

        //买入成本的输入
        costChange(state,{payload}){
            return {...state, inventJson: {...state.inventJson, ...payload}}
        },
        //发票内容
        rcptOnChange(state, {payload}){
            return { ...state, inventJson: { ...state.inventJson, instrument: { ...state.inventJson.instrument, invoiceList: [{ ...state.inventJson.instrument.invoiceList[0], ...payload}] } } }
        },

        //票据类型
        ticketTypeChange(state, {payload}){
            return { ...state, inventJson: { ...state.inventJson, instrument: { ...state.inventJson.instrument, ticketType: payload.ticketType } } }
        },

    },  

    effects: {
        *sendingForm({payload}, {call}){
            yield call(services.sendingForm, payload.socket, payload.params)
        }
    },

    subscriptions: {

    }
}