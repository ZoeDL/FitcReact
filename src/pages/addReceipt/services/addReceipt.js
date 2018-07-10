import { MessageType, PositionMsgName } from '../../../constants/TopicName';

export function sendReq(socket, params) {
    console.log("zoe send to server services", params);
    socket.sendToServer(MessageType.RPC, PositionMsgName.IVENT_ADD_RECEIPT, params);
}