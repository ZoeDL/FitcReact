
import request from '../../../utils/request';
import {BankCardMsgName} from '../../../constants/TopicName';
import config from '../../../constants/Config';

/** 修改银行账户 */
export function modifyBankAccount(payload) {
    const {companyId, accountType, openAccountFullName, bigNum, accountName, accountNum, openProvince, openCity, isDefaultAccount, userId, token, bankId } = payload;
    return request(`${config.webUrl}/${BankCardMsgName.ModifyBankAccount}`,{
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            userId,
            token
        },
        method:'POST',
        body: `companyId=${companyId}&accountType=${accountType}&openAccountFullName=${openAccountFullName}&bigNum=${bigNum}&accountName=${accountName}&accountNum=${accountNum}&openProvince=${openProvince}&openCity=${openCity}&isDefaultAccount=${isDefaultAccount}&accountId=${bankId}`
    });
}