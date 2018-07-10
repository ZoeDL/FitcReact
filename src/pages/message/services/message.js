import { MessageType, messageMsgName } from '../../../constants/TopicName';

/** 获取消息列表 */
export function getMessageList({ socket, params }) {
    socket.sendToServer(MessageType.RPC, messageMsgName.LIST, { ...params });
}
/** 设置所有消息为已读 */
export function setAllRead({ socket, params }) {
    socket.sendToServer(MessageType.RPC, messageMsgName.READ, { ...params });
}