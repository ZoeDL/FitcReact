import {Toast} from 'antd-mobile';

export default function checkInput(funds, fundsOut) {
    const {account} =funds;
    const {withdrawAmount} =fundsOut; 
    if (!withdrawAmount) {
        Toast.info('请输入申请出金金额', 1);
        return false;
    }
    if (withdrawAmount > account.balance) {
        Toast.info('申请出金金额不能大于资金余额', 1);
        return false;
    }
    return true;
}