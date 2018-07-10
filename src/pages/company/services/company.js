import { MessageType, CompanyAuthMsgName } from '../../../constants/TopicName';

/** 公司资料认证查询 */
export function postCompany({ socket }) {
    socket.sendToServer(MessageType.RPC, CompanyAuthMsgName.CompanyAuth);
}