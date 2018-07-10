/** 取2位小数且不四舍五入 */
export default function toFixedNum(value) {
    let result = value.toFixed(3);
    result = result.substring(0, result.lastIndexOf('.') + 3);
    return result;
}

/** 涨额 */
export function forehead(value) {
    if (value > 0) {
        return '<span style="color:#FA0000">' + value.toFixed(2) + ' BP</span>'
    }else if (value < 0) {
        return '<span style="color:#06B800">' + value.toFixed(2) + ' BP</span>'
    }else {
        return '<span style="color:#FFF">' + value.toFixed(2) + ' BP</span>'
    }
}

/** 涨幅 */
export function gains (value) {
    if (value > 0) {
        return '<span style="color:#FA0000">' + value.toFixed(2) + '%</span>'
    }else if (value < 0) {
        return '<span style="color:#06B800">' + value.toFixed(2) + '%</span>'
    }else {
        return '<span style="color:#FFF">' + value.toFixed(2) + '%</span>'
    }
    
}