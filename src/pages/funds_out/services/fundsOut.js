
import { MessageType, FundsMsgName } from '../../../constants/TopicName';

/** 获取交易中心银行卡账户列表[出金] */
export function getfundsOut({ socket, params }) {
    socket.sendToServer(MessageType.RPC, FundsMsgName.FUNDS_OUT, { ...params });
}
/** 申请提交 */
export function submitAccount({ socket, params }) {
    socket.sendToServer(MessageType.RPC, FundsMsgName.SUBMIT, { ...params });
}

