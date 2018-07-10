import {Toast} from 'antd-mobile';

export default function checkInput(info) {
    const {openAccountFullName, bigNum, accountNum, openProvince, openCity} = info;
    if (!openAccountFullName) {
        Toast.info('开户行全称不能为空',1);
        return false;
    }
    if (!bigNum) {
        Toast.info('大额行号不能为空',1);
        return false;
    }
    if (!accountNum) {
        Toast.info('账号不能为空',1);
        return false;
    }
    if (!openProvince || !openCity) {
        Toast.info('开户城市不能为空',1);
        return false;
    }
    return true;
}