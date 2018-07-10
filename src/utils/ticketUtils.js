import styles from '../constants/commonstyle.less'

export default function ticketUtil() {
};

/**
 * 出票类型转换
 * @param {*} data 
 */
ticketUtil.expireTypeConvert = function(data) {
    let display = '';
    switch (data) {
        case 6:
            display = '半年期';
            break;
        case 12:
            display = '一年期';
            break;
        default:
            break;
    }
    return display;
}


/**
 * 审核状态设置样式
 */
ticketUtil.statusStyleConvert = function(state) {
    let displayStyle = null;
    switch (state) {
        case 1:
            displayStyle = styles.ticketStatusIng;
            break;
        case 2: 
            displayStyle = styles.ticketStatusFailure;
            break;
        case 3: 
            displayStyle = styles.ticketStatusPass;
            break;
        default:
            break;
    }
    return displayStyle;
}

/**
 * 审核状态转换
 */
ticketUtil.statusConvert = function(state) {
    let display = '';
    switch (state) {
        case 1:
            display = '审核中';
            break;
        case 2: 
            display = '审核失败';
            break;
        case 3: 
            display = '审核成功';
            break;
        default:
            break;
    }
    return display;
}

/**
 * 票据金额转换
 */
ticketUtil.moneyConvert = function(num) {
    let display = num / 10000;
    switch (num) {
        case 1:
            display = '审核中';
            break;
        case 2: 
            display = '审核失败';
            break;
        case 3: 
            display = '审核成功';
            break;
        default:
            break;
    }
    return display;
}
