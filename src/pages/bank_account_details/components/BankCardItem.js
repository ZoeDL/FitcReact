
import React from 'react';
import styles from './BankCardItem.less';

class BankCardItem extends React.PureComponent {
    
    //银行卡号加密
    encryption = (num) => {
        const {show} = this.props;
        if ( show ) {
            return num;
        }
        const reg = /^(\d{4})\d+(\d{4})$/;
        return num = num.replace(reg, "$1****$2");
    }
    //状态管理
    returnState = (item) => {
        if (item.isDefaultAccount.toString() === '1') {
            return '默认'
        } else if (item.isUsing.toString() === '1') {
            return "启用";
        }else if (item.isUsing.toString() === '0') {
            return "禁用";
        }
        return '';
    }

    render() {
        const {item} = this.props;
        return (
            <div className={styles.farmbank}>
                <div className={styles.bankName}>{item.openAccountFullName}</div>
                <div className={styles.bankCardBottom}>
                    <div className={styles.bankCardState}>{this.returnState(item)}</div>
                    <div className={styles.bankCardNum}>{this.encryption(item.accountNum)}</div>
                </div>
            </div>
        )
    }
}

export default BankCardItem;