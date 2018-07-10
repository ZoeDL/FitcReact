
import request from '../../../utils/request';
import {ModifyUserInfo} from '../../../constants/TopicName';
import config from '../../../constants/Config';

/** 修改交易称谓 */
export function modifyUserInfo(payload) {
    const {userId, token, name, phoneNumber, phoneNumber2, avatar} = payload;
    return request(`${config.webUrl}/${ModifyUserInfo.USER}`,{
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            userId,
            token
        },
        method:'POST',
        body: `name=${name}&phoneNumber=${phoneNumber}&phoneNumber2=${phoneNumber2}&avatar=${avatar}`
            
    });
}