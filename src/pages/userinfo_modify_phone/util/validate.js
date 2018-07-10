import {Toast} from 'antd-mobile';

export default function isPhoneAvailable(phoneNumber) {
    const phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;
    const result = phoneReg.test(phoneNumber);
    if (!phoneNumber) {
        Toast.info('手机号不能为空', 1);
        return false;
    }
    if (!result) {
        Toast.info('手机号格式不正确，请重新输入', 1);
        return false;
    }
    return true;
}