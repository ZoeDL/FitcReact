
import { MessageType, BankCardMsgName } from '../../../constants/TopicName';


export function postSearch({ socket, params }) {
    socket.sendToServer(MessageType.RPC, BankCardMsgName.BankName, { ...params });
}
