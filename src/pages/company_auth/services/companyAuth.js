import { MessageType, CompanyAuthMsgName } from '../../../constants/TopicName';

/** 提交企业认证信息 */
export function postCompanyAuth({ socket, params }) {
    socket.sendToServer(MessageType.RPC, CompanyAuthMsgName.putCompanyAuth, params);
}