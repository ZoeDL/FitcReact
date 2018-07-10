/*
 * 数字格式化
 * @Author: Honye 
 * @Date: 2018-04-04 11:25:24 
 * @Last Modified by: zhangyuhao
 * @Last Modified time: 2018-05-15 17:48:05
 */
'use strcit';

import Decimal from 'decimal.js/decimal';

export default function calckitUtil() {

}
calckitUtil.checkNumber = (str) => {
    if (str===undefined||str.toString().trim().length===0)
        throw Error("calckitUtil error 参数不能为空")
    if (/[^0-9\.]/.test(str))
        throw Error("calckitUtil error 参数必须为数字类型")
     return true;   
}
/**
 * 两个数字相加
 * @param {*} str1 
 * @param {*} str2 
 */
calckitUtil.add = (str1, str2) => {
    if(calckitUtil.checkNumber(str1)&&calckitUtil.checkNumber (str2)){
        let result = new Decimal(str1).add(new Decimal(str2));
        return result + '';
    } 
}
/**
 * 两个数字相减
 * @param {*} str1 
 * @param {*} str2 
 */
calckitUtil.minus = (str1, str2) => {
    if(calckitUtil.checkNumber(str1)&&calckitUtil.checkNumber (str2)){
        let result = new Decimal(str1).minus(new Decimal(str2));
        return result + "";
    }
}
/**
 * 两个数相乘
 * @param {*} str1 
 * @param {*} str2 
 */
calckitUtil.mul = (str1, str2) => {
    if(calckitUtil.checkNumber(str1)&&calckitUtil.checkNumber (str2)){

        let result = new Decimal(str1).mul(new Decimal(str2));
        return result + "";
    }
}
/**
 * 两个数相除
 * @param {*} str1 
 * @param {*} str2 
 */
calckitUtil.div = (str1, str2) => {
    if(calckitUtil.checkNumber(str1)&&calckitUtil.checkNumber (str2)){
        let Decimal9 = Decimal.clone({ precision: 7, rounding: 4 })
        let result = new Decimal9(str1).dividedBy(new Decimal9(str2));
        return result + '';
    }
}


/** 
 * 格式化票面金额，将元转换为万，每三位逗号分隔，不足两位小数时补0显示2位小数，超过2位则有多少位小数就显示多少位
 * @param {String|Number} moneny 金额, 单位(元)
 * @return {String} 每三位逗号分隔, 单位(万)
 */
calckitUtil.formatTicketPrice = (money) => {
    let result = new Decimal(money || 0).dividedBy(10000) + '';
    return calckitUtil.formatMoney(result);
}
/**
 * 金额按千位逗号分割 ,保留2位小数（不足2位则补0）超过2位则有多少位小数就显示多少位
 * @param {*} s  需要格式化的金额数值. 
 */
calckitUtil.formatMoney = (s) => {
    if (!s)
        return "0.00";
    if (/[^0-9\.]/.test(s))
        return "0.00";
    s = s.toString().replace(/^(\d*)$/, "$1.");
    var dot = s.split(".")
    if (dot[1]) {
        if (dot[1].length === 1) {
            s = (s + "0").replace(/(\d*\.\d*)\d*/, "$1");
        } else {
            s = s.replace(/(\d*\.\d*)\d*/, "$1");
        }
    } else {
        s = (s + "00").replace(/(\d*\.\d*)\d*/, "$1");
    }
    s = s.replace(".", ",");
    var re = /(\d)(\d{3},)/;
    while (re.test(s))
        s = s.replace(re, "$1,$2");
    s = s.replace(/,(\d*)$/, ".$1");
    return s;
}

calckitUtil.convertToInt = (s) => {
    return /\d+(?=\.)/.exec(s + '')[0];
}
