import { MessageType, FundsMsgName } from '../../../constants/TopicName';

/** 资金流水记录查询 */
export function getRecord({ socket, params }) {
    socket.sendToServer(MessageType.RPC, FundsMsgName.ACCOUNT_RECORD, { ...params });
}