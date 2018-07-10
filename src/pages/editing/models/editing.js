import * as services from '../services/editing';

const defaultState =  
    {
        inventJson: {
            voiceList: [{
                invoiceOutParty: null,
                invoiceNo: null,
                invoiceAcceptParty: null,
                invoiceDate: null,
                invoiceCode: null,
                invoiceAcceptPartyId: -1,
                invoiceId: null,
                inventID: null,
                inquiryId: -1,
                invoiceOutPartyId: null,
                invoiceSum: null,
                createCompanyId: -1,
                ticketID: null,
                operatorTag: 0,
                index: 0
            }],
            bankType: "",
            checkStatus: "01",
            ticketType: "ETICKET",
            displayBankType: "",
            expireDate: "",
            ticketNo: "",
            inventStatus: "A01",
            inventType: "01",
            issueAccount: "",
            issueBank: "",
            issueDate: "",
            issuePerson: "",
            paymentFullname: "",
            ticketImgURL: "",
            receiptAccount: "",
            receiptBank: "",
            receiptPerson: "",
            assureId: 0,
            costPrice: "",
            inventId: null,
            ticketPrice: '',
            platformMark: 0,
            // restDays: 363
        },
        version: 1
    }

export default {
    namespace: 'editing',
    state: {...defaultState},
    reducers: {
        lockMark(state, {payload}){
            return {...state, locked: payload.locked}
        },

        onInputChange(state, {payload}){
            console.log("zoe-edit-onchange", { ...state.inventJson, ...payload});
            return { ...state, inventJson: {...state.inventJson, ...payload}};
        },

        clearData(state){
            return {...state, ...defaultState}
        },


        //添加发票之后更新编辑页面
        updateRcpt(state, {payload}){
            console.log("zoe, update receipt data, voiceList: ", [{ ...state.inventJson.voiceList[0], ...payload }]);
            return {
                ...state,
                    inventJson:{
                        ...state.inventJson,
                        voiceList:[
                            {...state.inventJson.voiceList[0], ...payload}
                        ]
                    }
            }
        },

        //删除发票之后更新编辑页面
        clearInvoice(state){
            return { ...state, inventJson: { ...state.inventJson, voiceList: []}};
        },


    },

    effects: {
        *isEditable({payload}, {call}){
            yield call(services.isEditable, payload.socket, payload.params);
        },

        *lockReq({payload}, {call, put}) {
            yield put({
                type: 'lockMark',
                payload: {
                    locked: true
                }
            })
            yield call(services.lockReq, payload.socket, payload.params);
        },   

        *unlockReq({payload}, {call, put}){
            yield put({
                type: 'lockMark',
                payload: {
                    locked: false
                }
            })
            yield call(services.unlockReq, payload.socket, payload.params);
        },

        *sendReq({payload}, {call}){
            yield call(services.sendReq, payload.socket, payload.params);
        },
    },
    subscriptions: {

    }
}