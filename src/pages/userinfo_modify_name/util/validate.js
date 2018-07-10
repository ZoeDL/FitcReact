import {Toast} from 'antd-mobile';

export default function checkInput(name) {
    if (!name) {
        Toast.info('交易称谓不能为空', 1);
        return false;
    }
    return true;
}