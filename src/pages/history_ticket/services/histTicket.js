import { MessageType, PositionMsgName } from '../../../constants/TopicName';

export function reqList(socket, params) {
    socket.sendToServer(MessageType.RPC, PositionMsgName.IVENT_HISTORY, params);
}