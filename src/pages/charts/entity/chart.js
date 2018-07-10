
/** 涨额计算方法 */
export default function forehead (currentVal, initVal) {
    let value = currentVal - initVal;
    if (value > 0) {
        return '<span style="color:#FA0000">' + (value * 100).toFixed(2) + ' BP</span>'
    }else if (value < 0) {
        return '<span style="color:#06B800">' + (value * 100).toFixed(2) + ' BP</span>'
    }else {
        return '<span style="color:#FFF">' + (value * 100).toFixed(2) + ' BP</span>'
    }
    
}

/** 涨幅计算方法 */
export function gains (currentVal, initVal) {
    let value = (currentVal - initVal) / initVal;
    if (value > 0) {
        return '<span style="color:#FA0000">' + (value * 100).toFixed(2) + '%</span>'
    }else if (value < 0) {
        return '<span style="color:#06B800">' + (value * 100).toFixed(2) + '%</span>'
    }else {
        return '<span style="color:#FFF">' + (value * 100).toFixed(2) + '%</span>'
    }
    
}

/** X轴数据显示方法 */
export function XData (index, chartData) {
    if (index < 3) {
        return chartData.map( (item) => (item.timeStamps.match(/\d+:\d+/)[0]) )
    }else if (index >= 3 && index < 6) {
        return chartData.map( (item) => (item.timeStamps.substr(5, 5)) )
    }else {
        return chartData.map( (item) => (item.timeStamps.substr(0, 7)) )
    }
    
}

/** 时间显示方法 */
export function showTime (date, timeStamps) { //时间类型 1分：O-,5分：F-,10分：T-,15分：E-，30分：S- 60分：L-,日：D-,周：W-,月：M-
    if (date === 'O-' || date === 'F-' || date === 'T-' || date === 'E-' || date === 'S-' || date === 'L-') {
        return timeStamps;
    }else if (date === 'D-' || date === 'W-') {
        return timeStamps.substr(0, 10)
    }else {
        return timeStamps.substr(0, 7)
    }
    
}

//计算MA平均线，N日移动平均线=N日收盘价之和/N  dayCount要计算的天数(5,10,20)
export function calculateMA(dayCount, data) {
    var result = [];
    for(var i = 0, len = data.length; i < len; i++) {
        if(i < dayCount) {
            result.push('-');
            //alert(result);
            continue; //结束单次循环，即不输出本次结果
        }
        var sum = 0;
        for(var j = 0; j < dayCount; j++) {
            //收盘价总和
            sum += data[i - j].closePrice;
            //alert(sum);
        }
        result.push(sum / dayCount);
        // alert(result);
    }
    return result;
}

/** legend */
export function showLegend (params) {
    let legends = [];
    for (let i = 0; i < params.length; i++) {
        if (params[i].seriesType === 'line') {
            legends.push(params[i])
        }
    }
    legends = legends.map( (item) => ([item.seriesName, Number(item.value).toFixed(2)]) );
    return legends;
}