import request from '../../../utils/request';
import {BankCardMsgName} from '../../../constants/TopicName';
import config from '../../../constants/Config';

export function getBank({companyId, accountType, userId, token}) {
    return request(`${config.webUrl}/${BankCardMsgName.BANKCARD}`,{
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            userId,
            token
        },
        method:'POST',
        body: `companyId=${companyId}&accountType=${accountType}`
    });
}