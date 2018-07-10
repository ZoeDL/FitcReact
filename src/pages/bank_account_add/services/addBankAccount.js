
import request from '../../../utils/request';
import {BankCardMsgName} from '../../../constants/TopicName';
import config from '../../../constants/Config';

/** 添加银行账户 */
export function addBankAccount({companyId, accountType, openAccountFullName, bigNum, accountName, accountNum, openProvince, openCity, isDefaultAccount, isSync, userId, token}) {
    return request(`${config.webUrl}/${BankCardMsgName.AddBankAccount}`,{
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            userId,
            token
        },
        method:'POST',
        body: `companyId=${companyId}&accountType=${accountType}&openAccountFullName=${openAccountFullName}&bigNum=${bigNum}&accountName=${accountName}&accountNum=${accountNum}&openProvince=${openProvince}&openCity=${openCity}&isDefaultAccount=${isDefaultAccount}&isSync=${isSync}`
            
    });
}