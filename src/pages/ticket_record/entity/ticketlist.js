
import Config from '../../../constants/Config';

/**
 * 票据列表请求参数
 * @param {*} options 
 */
export default function mergeTicketListOptions(options = {}) {
    const defaultOptions = {
        page: 0,//当前页码
        pageSize: Config.pageSize,//每页大小
        minLastDays: '',//最小剩余天数
        maxLastDays: '',//最大剩余天数
        minTicketPrice: '',//最小票据金额
        maxTicketPrice: '',//最大票据金额
        status: '',//审核状态
        version: 1//接口版本
    }
    return { ...defaultOptions, ...options };
}