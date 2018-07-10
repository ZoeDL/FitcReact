import { MessageType, PositionMsgName } from '../../../constants/TopicName';

export function isEditable(socket, params) {
    socket.sendToServer(MessageType.RPC, PositionMsgName.INVENT_EDITABLE, { ...params })
}

export function lockReq(socket, params) {
    socket.sendToServer(MessageType.RPC, PositionMsgName.INVENT_LOCK, params)
}

export function unlockReq(socket, params) {
    socket.sendToServer(MessageType.RPC, PositionMsgName.INVENT_LOCK, params)
}

export function sendReq(socket, params) {
    socket.sendToServer(MessageType.RPC, PositionMsgName.INVENT_MODIFY, params)
}