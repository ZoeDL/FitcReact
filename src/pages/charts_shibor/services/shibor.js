import {fetchReq} from '../../../utils/request';
// import {reqShibor} from '../../../constants/Config';
import config from '../../../constants/Config';
import {ShiborMethod} from '../../../constants/TopicName';

//请求shibor图表数据
export function getShibor(payload) {
    const {period, type} = payload;
    return fetchReq({
        url: `${config.webUrl}/${ShiborMethod.METHOD}`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        method:'GET',
        body:{
            period,
            type,
        }    
    });
}

