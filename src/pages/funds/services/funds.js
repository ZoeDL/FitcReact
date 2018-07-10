
import { MessageType, FundsMsgName } from '../../../constants/TopicName';

/** 资金账户余额获取 */
export function getBalance({ socket, params }) {
    socket.sendToServer(MessageType.RPC, FundsMsgName.ACCOUNT_BALANCE, { ...params });
}
/** 资金流水记录查询 */
export function getRecord({ socket, params }) {
    socket.sendToServer(MessageType.RPC, FundsMsgName.ACCOUNT_RECORD, { ...params });
}
