

import DateUtil from '../../../utils/dateUtil';
import Config from '../../../constants/Config';
/**
 * 今日逐笔请求参数
 * @param {Object} options 参数
 * @param {String} options.paymentType 支付方式
 * @param {String} options.restDays 剩余天数
 * @param {Number} options.size 页容量
 * @param {String} options.startInquiryId ？
 * @param {String} options.status 状态
 * @param {String} options.ticketPrice 票价
 * @param {String} options.tradeType 交易类型
 * @param {Number} options.version 接口版本
 */
export function mergeDynamicOptions(options = {}) {
    const defaultOptions = {
        paymentType: "全部",
        restDays: "0~366",
        size: Config.pageSize,
        startInquiryId: "0",
        status: "全部",
        ticketPrice: "0~1000000000",
        tradeType: "",
        version: 1
    };
    return { ...defaultOptions, ...options };
}
/**
 * 成交逐笔请求参数
 * @param {*} options 
 */
export function mergeDynamicHistoryOptions(options = {}) {
    

    let dateStart=DateUtil.format(DateUtil.addYear(new Date(),-1),'yyyy-MM-dd');
    let dateEnd=DateUtil.format(new Date() ,'yyyy-MM-dd');
    const defaultOptions = {
        tradeType: '',//交易类型
        paymentType: "全部",//承兑行
        restDayStart: '0',//剩余天数起始
        restDayEnd: '366',//剩余天数结束
        restDays: '0~366',//剩余天数范围，~号间隔
        moneyStart: '0',//金额起始
        moneyEnd: '1000000000',//金额结束
        ticketPrice: '0~1000000000',//金额返回，~号间隔
        dateStart:dateStart,//日期起始
        dateEnd: dateEnd,//日期结束
        date: `${dateStart}~${dateEnd}`,//日期范围，~号间隔
        pageNumber: '0',//第几页
        pageSize: Config.pageSize,//每页数据条数
        version: 1//接口版本
    }
    return { ...defaultOptions, ...options };
}