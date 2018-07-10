

import styles from '../constants/commonstyle.less';

export default function convertUtil() {
};


/**
 * 首页行情顶部数据转换
 * @param {} data 
 */
convertUtil.shiborConvert = function (data) {
    let display = '国股'
    switch (data) {
        case 'GG':
            display = '国股'
            break;
        case 'CS':
            display = '城商'
            break;
        case 'SN':
            display = '三农'
            break;
        case '00':
            display = 'Shibor-'
            break;
        default:
            break;
    }
    return display;
}
/**
 * 首页行情交易类型转换
 * @param {*} data 
 */
convertUtil.tradeTypeConvert = function (data) {
    let display = '';
    switch (data) {
        case '00':
            display = '3M';//shibor相关
            break;
        case '01':
            display = '直贴'
            break;
        case '03':
            display = '转让'
            break;
        default:
            break;
    }
    return display;
}

/**
 * 读取交易动态和交易待办，报价详情,今日请求逐笔状态对应的颜色值
 * @param {*} status 
 */
convertUtil.getTradeStatusColor = function (status) {
    let displayStyle = styles.tradingStatus;
    switch (status) {
        case '1'://交易中
            displayStyle = styles.tradingStatus;
            break;
        case '2'://交割中
            displayStyle = styles.tradeTransferingStatus;
            break;
        case '3'://交易失败
            displayStyle = styles.tradeErrorStatus;
            break;
        case '4'://交易成功
            displayStyle = styles.tradeSuccessStatus;
            break;
        default:
            break;
    }
    return displayStyle;
}

/**
 * 定义交易类型mode，
 */
convertUtil.tradeMode = {
    CompSell: {
        label: '转让',
        code: '20',
    },
    CompBuy: {
        label: '买入',
        code: '21',
    }
}
/**
 * 交易类型转换，若输入 '20' 得到 '转让',若输入'转让' 则得到 '20'
 * @param {*} type 
 */
convertUtil.tradeModeConvert = function (type) {
    for (var key of Object.keys(this.tradeMode)) {
        if (this.tradeMode[key].label === type) {
            return this.tradeMode[key].code;
        } else if (this.tradeMode[key].code === type) {
            return this.tradeMode[key].label;
        }
    }
    return 'NA'
}

/**
 * 获取交易类型颜色
 * @param {String} type
 */
convertUtil.getTradeModeClass = function (type) {
    switch (type) {
        case '20':  // 转让
            return styles.tradeCompsell
        case '21':  // 买入
            return styles.tadeCompbuy
        default:
            break;
    }
}

/**
 * 通过code类型返回 电银或者电商
 * @param {*} type 
 */
convertUtil.ticketTypeConvert = function (type) {
    let display = '电银';
    switch (type) {
        case 'ETICKET':
            display = '电银';
            break;
        case 'TETICKET':
            display = '电商';
            break;
        default: break;
    }
    return display;
}

/**
 * 通过text类型返回 电银或者电商
 * @param {*} type 
 */
convertUtil.ticketTypeTextConvert = function (type) {
    let display = 'ETICKET';
    switch (type) {
        case '电银':
            display = 'ETICKET';
            break;
        case '电商':
            display = 'TETICKET';
            break;
        default: break;
    }
    return display;
}

/**
 * 承兑人类型 定义
 */
convertUtil.paymentType = {
    ALL: {
        label: '全部',
        code: 'QB',
        type: 0
    },
    GUOGU: {
        label: '国股',
        code: 'GG',
        type: 1
    },
    DACHENGSHANG: {
        label: '大城商',
        code: 'DC',
        type: 2
    },
    XIAOCHENGSHANG: {
        label: '小城商',
        code: 'XC',
        type: 3
    },
    NONGXING: {
        label: '农信',
        code: 'NX',
        type: 4
    },
    NONGHE: {
        label: '农合',
        code: 'NH',
        type: 5
    },
    NONGSHANG: {
        label: '农商',
        code: 'NS',
        type: 6
    },
    CUNZHEN: {
        label: '村镇',
        code: 'CZ',
        type: 7
    },
    CWGS: {
        label: '其他',
        code: 'QT',
        type: 8
    },
    SP: {
        label: '商票',
        code: 'SP',
        type: 9
    }
}
/**
 * 承兑人类型转换，若输入 'GG' 得到 '国股',若输入'国股' 则得到 'GG'
 * @param {*} type 
 */
convertUtil.paymentTypeConvert = function (type) {
    for (var key of Object.keys(this.paymentType)) {
        if (this.paymentType[key].label === type) {
            return this.paymentType[key].code;
        } else if (this.paymentType[key].code === type) {
            return this.paymentType[key].label;
        }
    }
    return 'NA'
}

/**
 * 今日请求逐笔
 * 交易类型 定义
 * @Auther：sai
 */
convertUtil.tradeType_today = {
    ALL: {
        label: '全部',
        code: '',
        type: 0
    },
    TIEXIAN: {
        label: '贴现',
        code: '22',
        type: 1
    },
    MAIRU: {
        label: '买入',
        code: '21',
        type: 2
    },
    ZHUANRANG: {
        label: '转让',
        code: '20',
        type: 3
    },
}

/**
 * 今日请求逐笔
 * 交易状态 定义
 * @Auther：sai
 */
convertUtil.status_today = {
    ALL: {
        label: '全部',
        code: '全部',
        type: 0
    },
    YIJIA: {
        label: '议价中',
        code: '议价中',
        type: 1
    },
    JIAOGE: {
        label: '交割中',
        code: '交割中',
        type: 2
    },
    SUCCESS: {
        label: '交割成功',
        code: '交割成功',
        type: 3
    },
    FAILURE: {
        label: '交割失败',
        code: '交割失败',
        type: 4
    },
}

/**
 * 今日请求逐笔
 * 承兑行类型 定义
 * @Auther：sai
 */
convertUtil.paymentType_today = {
    ALL: {
        label: '全部',
        code: '全部',
        type: 0
    },
    GUOGU: {
        label: '国股',
        code: 'GG',
        type: 1
    },
    DACHENGSHANG: {
        label: '大城商',
        code: 'DC',
        type: 2
    },
    XIAOCHENGSHANG: {
        label: '小城商',
        code: 'XC',
        type: 3
    },
    NONGXING: {
        label: '农信',
        code: 'NX',
        type: 4
    },
    NONGHE: {
        label: '农合',
        code: 'NH',
        type: 5
    },
    NONGSHANG: {
        label: '农商',
        code: 'NS',
        type: 6
    },
    CUNZHEN: {
        label: '村镇',
        code: 'CZ',
        type: 7
    },
}


//票号加如空格
convertUtil.format = function (x) {
    if (!x) return x;
    var s = x.replace(/ /g, '');
    if (s.length <= 1) return s;
    else if (s.length <= 13) return [s.slice(0, 1), s.slice(1, s.length)].join(" ");
    else if (s.length <= 21) return [s.slice(0, 1), s.slice(1, 13), s.slice(13, s.length)].join(" ");
    else if (s.length <= 29) return [s.slice(0, 1), s.slice(1, 13), s.slice(13, 21), s.slice(21, s.length)].join(" ");
    else return [s.slice(0, 1), s.slice(1, 13), s.slice(13, 21), s.slice(21, 29), s.slice(29)].join(" ");
}