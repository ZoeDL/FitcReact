import * as services from "../services/addReceipt";

export default {
    namespace: 'addRecpt',
    state: {
        invoiceOutParty: "",
        invoiceNo: null,
        invoiceAcceptParty: null,
        invoiceDate: null,
        invoiceCode: null,
        invoiceAcceptPartyId: -1,
        invoiceId: -1,
        inventID: -1,
        inquiryId: -1,
        invoiceOutPartyId: -1,
        invoiceSum: null,
        invoiceUrl: '',
        createCompanyId: -1,
        ticketID: -1,
        operatorTag: 1,
        index: 0
    },
    reducers: {
        //新录入发票
        rcptOnChange(state, { payload }) {
            console.log("zoe-addRecpt-OnChange", { ...state, ...payload});
            return {...state, ...payload}
        },

        //清空原始数据
        clearData(state, {payload}){
            return {...state, ...payload}
        }
    },

    effects: {
        *sendReq({payload}, {call}){
            yield call(services.sendReq, payload.socket, payload.params);
        }


    },

    subscriptions: {

    },
}