import request from '../../../utils/request';
import { getKeFu } from '../../../constants/TopicName';
import config from '../../../constants/Config';

/** 获取客服电话 */
export function fetchKeFu() {
    return request(`${config.webUrl}/${getKeFu.KEFU}`, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: 'POST'
    });
}