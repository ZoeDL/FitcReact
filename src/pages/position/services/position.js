import { MessageType, PositionMsgName } from '../../../constants/TopicName'

export function reqList(socket, params) {
    socket.sendToServer(MessageType.RPC, PositionMsgName.INVENTORY, params);
}

export function reqAuth(socket) {
    socket.sendToServer(MessageType.RPC, PositionMsgName.IVENT_AUTHCHECK);
}

export function reqMoveToHistory(socket, params){
    socket.sendToServer(MessageType.RPC, PositionMsgName.IVENT_MOVE_TO_HIST, params);
}

export function reqRetrive(socket, params) {
    socket.sendToServer(MessageType.RPC, PositionMsgName.IVENT_MOVE_TO_TODAY, params);
}

