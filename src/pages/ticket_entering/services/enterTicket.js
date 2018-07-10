import { MessageType, TicketMsgName } from '../../../constants/TopicName';

/** 录入票据*/
export function postEnterTicket({ socket, params }) {
    socket.sendToServer(MessageType.RPC, TicketMsgName.TicketAdd, { ...params });
}