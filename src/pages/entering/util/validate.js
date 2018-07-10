import {Toast} from 'antd-mobile';
import dateformat from '../../../utils/dateUtil';

export default function checkInput(info){
    const { paymentFullname, ticketNo, ticketPrice, issueDate, expireDate, ticketImgURL, ticketType} = info;
    //在提交时检查票号
    if(!ticketNo){
        Toast.info("票号不能为空", 2);
        return false;
    }else if (ticketNo.length !== 30) {
        Toast.info("票号位数不正确，请重新编辑票号信息", 2);
        return false;
    } else if (ticketType === "ETICKET" && ticketNo.charAt(0) !== "1"){
        Toast.info('您输入的电银票号有误，请重新输入', 2);
        return false;
    } else if (ticketType === "TETICKET" && ticketNo.charAt(0) !== "2") {
        Toast.info('您输入的电商票号有误，请重新输入', 2);
        return false;
    }

    //检查兑换人填写
    if(!paymentFullname){
        Toast.info("承诺人全称不能为空", 2);
        return false;
    }

    //检查片面金额填写
    if (!ticketPrice){
        Toast.info("票面金额不能为空", 2);
        return false;
    }else if(ticketPrice > 1000000000){
        Toast.info("请填写正确的票据金额(不超过10亿)", 2);
        return false;
    }else if(ticketPrice <= 0){
        Toast.info("票面金额不正确", 2);
        return false;
    }

    //检查出票日
    if (!issueDate){
        Toast.info("出票日不能为空", 2);
        return false;
    }else if (dateformat.compareDate(dateformat.formatToDate(issueDate), new Date()) === 1){
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

    //检查是否传了票据正面
    if (ticketImgURL.charAt(0) === "" || ticketImgURL.charAt(0) === ";") {
        Toast.info("请上传正面票面截图", 2);
        return false;
    } 
    

    return true;
    

}





