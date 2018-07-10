import {Toast} from 'antd-mobile';
import dateformat from '../../../utils/dateUtil';

export default function checkInput(info){
    const { paymentBankFullName, ticketNo, ticketsPrice, 
        outTicketDate, expireDate, ptyFullName, instrumentType, 
        ptyAccount, ptyOpenBank, cnptyFullName, cnptyAccount, cnptyOpenBank, trdUser } = info;

    //检查兑换人填写
    if(!paymentBankFullName){
        Toast.info("承诺人全称不能为空", 2);
        return false;
    }

    //在提交时检查票号
    if(!ticketNo){
        Toast.info("票号不能为空", 2);
        return false;
    }else if (ticketNo.length !== 30) {
        Toast.info("票号位数不正确，请重新编辑票号信息", 2);
        return false;
    } else if (instrumentType === "ETICKET" && ticketNo.charAt(0) !== "1"){
        Toast.info('您输入的电银票号有误，请重新输入', 2);
        return false;
    } else if (instrumentType === "TETICKET" && ticketNo.charAt(0) !== "2") {
        Toast.info('您输入的电商票号有误，请重新输入', 2);
        return false;
    }

    //检查票面金额填写
    if (!ticketsPrice){
        Toast.info("票面金额不能为空", 2);
        return false;
    }else if(ticketsPrice > 1000000000){
        Toast.info("请填写正确的票据金额(不超过10亿)", 2);
        return false;
    }else if(ticketsPrice <= 0){
        Toast.info("票面金额不正确", 2);
        return false;
    }

    //检查出票日
    if (!outTicketDate){
        Toast.info("出票日不能为空", 2);
        return false;
    }else if (dateformat.compareDate(dateformat.formatToDate(outTicketDate), new Date()) === 1){
        Toast.info("请选择正确的出票日", 2);
        return false;
    }


    //检查到期日
    if(!expireDate){
        Toast.info("到期日不能为空", 2);
        return false;
    }else if(dateformat.compareDate(dateformat.formatToDate(expireDate), new Date()) !== 1) {
        Toast.info("到期日必须大于今天", 2);
        return false;
    }

    //检查出票人名称
    if(!ptyFullName){
        Toast.info("出票人名称不能为空", 2);
        return false;
    }

    //检查出票人账号
    if(!ptyAccount){
        Toast.info("出票人账号不能为空", 2);
        return false;
    }

    //检查出票人开户行
    if(!ptyOpenBank){
        Toast.info("出票人开户行不能为空", 2);
        return false;
    }

    //检查收款人名称
    if(!cnptyFullName){
        Toast.info("收款人名称不能为空", 2);
        return false;
    }

    //检查收款人账号
    if(!cnptyAccount){
        Toast.info("收款人账号不能为空", 2);
        return false;
    }

    //检查收款人开户行
    if(!cnptyOpenBank){
        Toast.info("收款人开户行不能为空", 2);
        return false;
    }

    //检查交易员
    if(!trdUser){
        Toast.info("交易员不能为空", 2);
        return false;
    }

    return true;
}





