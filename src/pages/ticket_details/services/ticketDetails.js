import { MessageType, TicketMsgName } from '../../../constants/TopicName';

/** 查看票据详情 */
export function getTicket({ socket, params }) {
    socket.sendToServer(MessageType.RPC, TicketMsgName.TicketDetails, { ...params });
}

/** 提交审核 */
export function postAudit({ socket, params }) {
    socket.sendToServer(MessageType.RPC, TicketMsgName.TicketSubmit, { ...params });
}

/** 提交审核 */
export function postModifyTicket({ socket, params }) {
    socket.sendToServer(MessageType.RPC, TicketMsgName.TicketEdit, { ...params });
}