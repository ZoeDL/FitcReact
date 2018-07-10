import { MessageType, PositionMsgName} from '../../../constants/TopicName';

export function sendingForm(socket, params) {
    console.log("zoe-send-form-3")
    socket.sendToServer(MessageType.RPC, PositionMsgName.IVENT_ADD_NEW, params);
}