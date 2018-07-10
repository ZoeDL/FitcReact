import DateUtil from '../../../utils/dateUtil';
import Config from '../../../constants/Config';

/**
 * 资金流水记录请求参数
 * @param {*} options 
 */
export default function mergeFundsRecordOptions(options = {}) {
    let startDate=DateUtil.format(DateUtil.addYear(new Date(),-1),'yyyy-MM-dd');
    let endDate=DateUtil.format(new Date() ,'yyyy-MM-dd');
    const defaultOptions = {
        accountId: '',//账户ID
        tradeType: '',//业务类型
        startDate,//开始日期
        endDate,//结束日期
        isPage: '1',//是否分页 1:true,0:false
        pageNumber: 0,//当前页数
        pageSize: Config.pageSize,//每页大小
        version: 1//接口版本
    }
    return { ...defaultOptions, ...options };
}