
import { MessageType, FundsMsgName } from '../../../constants/TopicName';

/** 获取交易中心银行卡账户列表[入金] */
export function getFundsIn({ socket, params }) {
    socket.sendToServer(MessageType.RPC, FundsMsgName.FUNDS_IN, { ...params });
}

