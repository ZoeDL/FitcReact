
import request from '../../../utils/request';
import {BankCardMsgName} from '../../../constants/TopicName';
import config from '../../../constants/Config';

/** 银行卡设为默认 */
export function modifyDefaultBankAccount({companyId, accountId, userId, token}) {
    return request(`${config.webUrl}/${BankCardMsgName.ModifyDefaultBankAccount}`,{
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            userId,
            token
        },
        method:'POST',
        body: `companyId=${companyId}&accountId=${accountId}`
    });
}

/** 开启-禁用银行卡 */
export function modifyIsUsingBankAccount({accountId, isUsing, userId, token}) {
    return request(`${config.webUrl}/${BankCardMsgName.ModifyDefaultBankAccountMG}`,{
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            userId,
            token
        },
        method:'POST',
        body: `accountId=${accountId}&isUsing=${isUsing}`
    });
}

/** 删除银行卡 */
export function delBankAccount({accountId, userId, token}) {
    return request(`${config.webUrl}/${BankCardMsgName.DeleBankAccountForCompanyVector}`,{
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            userId,
            token
        },
        method:'POST',
        body: `accountId=${accountId}`
    });
}