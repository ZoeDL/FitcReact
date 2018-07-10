
import React from 'react';
import styles from './BankCardItem.less';
import router from 'umi/router';
import { connect } from 'dva';
import bankcardUtil from '../../../utils/bankcardUtil';

class BankCardItem extends React.PureComponent {

    //银行卡号加密
    encryption = (num) => {
        const { show } = this.props;
        if (show) {
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
        } else {
            return "禁用";
        }
    }
    /** 进入详情 */
    onItemClick = (item) => {
        router.push('/bank_account_details');
        const { dispatch } = this.props;
        dispatch({
            type: 'modifyBankAccount/loadBankAccount',
            payload: item
        })
    }

    render() {
        const { item, onClick } = this.props;
        const logo = bankcardUtil.formatBankLogo(item.openAccountFullName);
        const bgColor = bankcardUtil.formatBankColor(item.openAccountFullName);
        return (
            <div className={styles.farmbank} style={{backgroundColor: bgColor}} onClick={onClick}>
                <div className={styles.bankName}>
                    <img src={logo} alt="banklogo" />
                    <div>{bankcardUtil.formatBankName(item.openAccountFullName)}</div>
                </div>
                <div className={styles.bankCardBottom}>
                    <div className={styles.bankCardState}>{this.returnState(item)}</div>
                    <div className={styles.bankCardNum}>{this.encryption(item.accountNum)}</div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ modifyBankAccount }) => ({
    modifyBankAccount
})

export default connect(mapStateToProps)(BankCardItem);