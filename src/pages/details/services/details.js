import { MessageType, PositionMsgName } from '../../../constants/TopicName'

export function reqDetails(socket, params) {
    socket.sendToServer(MessageType.RPC, PositionMsgName.INVENT_DETAIL, { ...params })
}

