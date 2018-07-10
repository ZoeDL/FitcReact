import { MessageType, TicketMsgName } from '../../../constants/TopicName';

/** 获取票据列表 */
export function getTicketList({ socket, params }) {
    socket.sendToServer(MessageType.RPC, TicketMsgName.RecordList, { ...params });
}