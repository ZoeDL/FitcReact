import {Toast} from 'antd-mobile';

export default function checkInput(data){
    const validate = {
        invoiceCode: {
            type: "number",
            label: "发票代码"
        },

        invoiceNo: {
            type: "number",
            label: "发票号码"
        },

        invoiceSum: {
            type: "number",
            label: "发票金额"
        },

        invoiceDate: {
            type: "string",
            label: "出票日"
        },

        invoiceAcceptParty: {
            type: "string",
            label: "受票单位"
        }
    }

    for(let param in validate){
        console.log("zoe", data[param]);
        if(!data[param]){
            Toast.info(validate[param].label+"不能为空", 2);
            return false;
        }
    }

    return true;
   
};

