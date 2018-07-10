/*
 * 服务端的消息定义
 * @Author: Zyh 
 * @Date: 2018-03-23 11:00:11 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-05-17 16:14:45
 */
'use strict';

//消息类型
export const MessageType = {
    CMR: 'MRMsgType.CMR',
    RPC: 'MRMsgType.RPC',
    NO_LOGIN: 'MRMsgType.NO_LOGIN',
    REG: 'MRMsgType.REG',
}

//MVC事件类型
export const MVCType = {
    REGISTER: 'PhoneModelRelay.register',//MVC注册
    GMMUpdate: 'MRMsgType.GMMUpdate',//MVC更新
    UNREGISTER: 'PhoneModelRelay.unregister',//MVC取消注册
}

export const ImageUpload={
    commonImage:'web/upload',//上传普通图片地址，http请求
    uerImage:'user/upload',//上传用户头像图片地址，http请求
}

/** 登录相关 */
export const LoginMsgName = {
    LOGIN_TOKEN: 'user.mobileLogin',                // 请求登录 Token
    LOGIN: 'login',                                 // 登录
    REGIST: 'user.mobileRegistry',                  // 注册
    SMS: 'common.sendsms',                          // 获取短信验证码
    FORGOT_PASSWORD: 'user.forgetUserPassword',     // 忘记密码
    WX_LOGIN: 'user.weixinLogin',                   // 微信登录
}

//首页行情相关
export const MarketMsgName={
    DYNAMIC:'Market.queryDynamicRequestData', //今日请求逐笔
    DYNAMIC_HISTORY:'Market.queryDynamicDealItemData',//成交逐笔
    DYNAMIC_DETAIL:'Market.DynamicDetailInfoAction',//今日请求逐笔查看详情
    Shibor:'Market.queryDynamicShiborTopData',//顶部shibor数据

}
//
export const CharMarketMVCID={
   MarketUpdate: 'fitc.Externalmarket.refresh_data_update_server_mr',//新增折现一个点位数据
}

//银行卡管理相关
export const BankCardMsgName={
    BANKCARD:'bank/account/getBankAccountForCompanyVector', //银行卡(webservice接口)
    AddBankAccount: 'bank/account/addBankAccount', //添加银行账户(webservice接口)
    ModifyBankAccount: 'bank/account/modifyBankAccount', //修改银行账户(webservice接口)
    ModifyDefaultBankAccountMG: 'bank/account/modifyDefaultBankAccountMG', //开启-禁用银行卡(webservice接口)
    ModifyDefaultBankAccount: 'bank/account/modifyDefaultBankAccount', //银行卡设为默认(webservice接口)
    DeleBankAccountForCompanyVector: 'bank/account/deleBankAccountForCompanyVector', //删除银行卡(webservice接口)
    BankName: 'PhoneCommon.SearchBankAction', //搜索框输入搜索银行
}


//持仓相关
export const PositionMsgName = {
    INVENTORY:'PhoneCompnay.SearchNowTicketAction',  
    INVENT_DETAIL: 'PhoneCompnay.ShowTicketAction',   //票据详情
    IVENT_HISTORY: 'PhoneCompnay.SearchHistoryTicketAction', //历史持仓数据返回
    IVENT_AUTHCHECK: 'PhoneCompnay.CheckAuthAction', //持仓权限判断
    IVENT_MOVE_TO_HIST: 'PhoneCompany.MoveTicketToHistory',//移入历史持仓
    IVENT_MOVE_TO_TODAY:'PhoneCompany.MoveTicketToToday', //恢复到现有持仓
    IVENT_ADD_NEW: 'PhoneCompnay.AddInventoryTicketAction',  //录入持仓
    INVENT_EDITABLE: 'PhoneCompnay.CheckTicketCanEditAction', //判断该票是否可以编辑
    INVENT_LOCK: 'PhoneCompnay.LockOrUnLockInventAction', //请求将票据锁住
    INVENT_MODIFY:'PhoneCompnay.ModifyInventoryTicketAction', //请求编辑
    IVENT_ADD_RECEIPT: "Invoice.InvoiceAction", //添加发票
    SEARCH_COMPANY: "PhoneCommon.QuerySecurityCompanyAction", //搜索企业
}

// 交易动态
export const DynamicMVC = {
    ID_QUERY: 'tradeTrends',                                     // 交易动态及待办
    MSG_HISTORY: 'PhoneCompnay.SearchHistoryTradeAction',        // 历史动态
    DETAILS_DELIVERY: 'PhoneCompany.CompDeliveryDetailsAction',  // 交割详情
}

// 交割
export const DeliveryName = {
    NOTE_LIST: 'PhoneCompnay.BuildDeliveryTicketInfoAction',             // 票据清单
    MVC_TIMELINE: 'compSellTimeLineEticketMachine',                      // 时间轴
    TIMELINE_EVENT: 'PhoneCompSell.CompSellEticketTimeLineEventAction',  // 时间轴上按钮事件
    REPORT: 'Message.ComplainAction',                                    // 投诉
    EndorseStatus: 'PhoneCompany.CompSellTicketEndorseStatusAction',     // 获取票据背书状态
    EndorseInfo: 'PhoneCompnay.SearchTicketEndorseAction',               // 票据背书信息
}

//资金管理
export const FundsMsgName={
    ACCOUNT_BALANCE:'funds.VirtualAccountListAction', //资金账户余额获取
    ACCOUNT_RECORD:'funds.VirtualAccountRecordListAction', //账户流水记录
    FUNDS_IN:'CenterAccount.getAccountList', //获取交易中心银行卡账户列表[入金]
    FUNDS_OUT:'funds.BankCardAccountListAction', //获取交易中心银行卡账户列表[入金]
    SUBMIT:'funds.VirtualAccountWithdrawAction', //提交出金申请
    FUNDS_DYNAMIC:'MRMsgType.GMMUpdate', //资金动态变化事件
}
//资金管理MVC类型
export const FundsMVCID={
    FundsUpdate: 'fundsTrends',//资金动态变化事件
 }

// 交易
export const TradePartyName = {
    QUERY_VIP: 'PhoneCompnay.SearchVipListAction',             // VIP 交易对手（推荐对手）
    TIME_LIMIT: 'PhoneCommon.QuerySubmitTimeoutsAction',       // 交易议价时限
    BUSINESS_DAY: 'PhoneCommon.GetBusinessDayAction',          // 交割日期
    TRANSFER: 'PhoneCompnay.CompanySellTradeLaunchAction',     // 发起转让
    BUY: 'PhoneCompnay.CombuySubmitAction',                    // 发起买入
    WHITELIST: 'WhiteList.WhiteListQueryAction',               // 白名单
    WHITELIST_ADD: 'WhiteList.WhiteListAddAction',             // 添加白名单
    SEARCH_PARTY: 'PhoneCommon.QueryBankAndEnterpriseAction',  // 搜索全平台
    ReleaseLock: 'PhoneCompnay.ReleaseLockAction',             // 解锁
    CANCEL: 'PhoneCompnay.CompSellPartyCancelAction',          // 取消转让交易
}

// 转让交易
export const TransferName = {
    BargainDetails: 'PhoneCompnay.CompSellCompanyReportAction',  // 转让持票方查看报价详情
    NotesOfBargain: 'PhoneCompnay.CompSellYiJiaTicketAction',    // 议价中的票据清单
    REFUSE: 'PhoneCompnay.CompSellPassAction',                   // 拒绝交易
    ACCEPT: 'PhoneCompnay.CompSellAcceptAction',                 // 成交
    CompSellProcessSubmit: 'PhoneCompnay.CompSellProcessSubmitAction',  // 提交报价
}

// 买入交易
export const PurchaseName = {
    CANCEL: 'PhoneCompnay.CompBuyPartyCancelAction',              // 取消买入交易
    BargainDetails: 'PhoneCompnay.CompBuyCompanyReportAction',    // 买入发起方查看报价详情
    NotesOfBargain: 'PhoneCompnay.CompBuyYiJiaTicketAction',      // 买入发起方查看议价中票据清单
    REFUSE: 'PhoneCompnay.CompBuyPassAction',                     // 拒绝交易
    CompBuyPartySubmit: 'PhoneCompnay.CompBuyPartySubmitAction',  // 添加票据提交报价
    ACCEPT: 'PhoneCompnay.CompBuyAcceptAction',                   // 成交
    RISK_LIST: 'PhoneCommon.QueryRiskListAction',                 // 承兑人查询
}

//企业认证信息
export const CompanyAuthMsgName={
    CompanyAuth:'user.getCompanyAuth', //获取企业认证信息
    putCompanyAuth:'user.putCompanyAuth', //提交企业认证信息
}

// MVC ID
export const MVCIDs = {
    SellPartyDetail: 'compSellPartyDetail',    // 转让发起方查看企业报价列表
    SellCPartyDetail: 'compSellCPartyDetail',  // 转让接收方查看报价详情
    BuyPartyDetail: 'compBuyPartyDetail',      // 买入接收方查看报价详情(加票及详情)
    BuyCPartyDetail: 'compBuyCPartyDetail',    // 买入发起方查看企业报价列表
}

//行情走势图
export const MarketChartMsgName={
    QUERY_X: 'Market.QueryTimeCountAction',//查询x轴上共要绘制多少个点位
    QUERY_DATA: 'Market.queryMarketData',//查询图表数据
    UPDATE: 'MRMsgType.GMMUpdate',//行情图刷新
}

//行情图刷新MVCID
export const MarketChartMVCID = {
    ALL_UPDATE: 'fitc.Externalmarket.refresh_data_update_server_mr',//刷新事件
    O_UPDATE: 'fitc.Externalmarket.refresh_data_add_server_1k_mr',//1分钟图
    F_UPDATE: 'fitc.Externalmarket.refresh_data_add_server_5k_mr',//5分钟图
    T_UPDATE: 'fitc.Externalmarket.refresh_data_add_server_10k_mr',//10分钟图
    E_UPDATE: 'fitc.Externalmarket.refresh_data_add_server_15k_mr',//15分钟图
    S_UPDATE: 'fitc.Externalmarket.refresh_data_add_server_30k_mr',//30分钟图
    L_UPDATE: 'fitc.Externalmarket.refresh_data_add_server_60k_mr',//60分钟图
}

//shibor图表
export const ShiborMethod={
    // METHOD: 'api/pc/get_shibor_chart', //shibor数据图表
    METHOD: 'config/shibor', //shibor数据图表
} 

//更新用户资料
export const ModifyUserInfo={
    USER: 'user/updateProfile', 
} 

//消息通知
export const messageMsgName={
    LIST: 'Message.MessageListAction', //获取消息列表
    READ: 'Message.ModMessageReadAction', //设置所有消息为已读
} 

//联系客服
export const getKeFu={
    KEFU: 'config/php?method=POST&url=/api/mobile/get_kefu', //获取客服电话
} 

//出票记录
export const TicketMsgName = {
    RecordList: 'Assure.listTicket', //获取票据列表
    TicketDetails: 'Assure.showTicket', //查看票据详情
    TicketAdd: 'Assure.addTicket', //录入票据
    TicketEdit: 'Assure.editTicket', //编辑票面
    TicketSubmit: 'Assure.submitTicket', //提交审核
} 

//PDF上传
export const PDFUpload={
    pdf:'/TicketUpload',//pdf文件上传
}