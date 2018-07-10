
import { MessageType, PositionMsgName } from '../../../constants/TopicName';


export function postSearch({ socket, params }) {
    socket.sendToServer(MessageType.RPC, PositionMsgName.SEARCH_COMPANY, { ...params });
}
