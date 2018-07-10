import React from 'react';
import router from 'umi/router';
import { NavBar, Icon, Button, Picker, List } from 'antd-mobile';
import styles from './page.less';
import { connect } from 'dva';
import cities from '../../assets/cities';
import checkInput from './util/validate';

const Item = List.Item;

class UpdateBankAccountPage extends React.Component {

    /** 账号 */
    onAccountNumChange = (event) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'updateBankAccount/onInputAccountNumSuccessed',
            payload: { accountNum: event.target.value }
        });
    }
    
    /** 大额行号 */
    onBigNumChange = (event) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'updateBankAccount/onInputBigNumSuccessed',
            payload: { bigNum: event.target.value }
        });
    }

    goBack = () => {
        router.goBack();
    }

    /** 保存 */
    onSaveClick = () => {
        const { dispatch } = this.props;
        const { login } = this.props;
        const { token } = login;
        const { userId } = login.user;
        const { updateBankAccount } = this.props;
        const { item } = updateBankAccount;
        const result = checkInput(item);
        if (result) {
            const { companyId, accountType, openAccountFullName, bigNum, accountName, accountNum, openProvince, openCity, isDefaultAccount, isUsing, bankId } = item;
            dispatch({
                type: 'updateBankAccount/modifyBankAccount',
                payload: { companyId, accountType, openAccountFullName, bigNum, accountName, accountNum, openProvince, openCity, isDefaultAccount, isUsing, userId, token, bankId }
            })
        }
    }

    /** 翻译账户类型 */
    tfAccountType = (type) => {
        if (type === 1) {
            return '资金接收账户';
        }
        if (type === 2) {
            return '电票接收账户';
        }

    }
    /** 跳转搜索银行 */
    toSearchBank = () => {
        const { dispatch } = this.props;
        dispatch({
            type: 'searchbank/searchSuccessed',
            payload: { bankList: [] }
        })
        dispatch({
            type: 'searchbank/searchInput',
            payload: { bankName: '' }
        })
        router.push('/search_bank');
    }

    /** 开户城市筛选 */
    onFilterCity = (v) => {
        const list = cities.list;
        const area = list.filter(item => item.value === v[0]);
        const province = area[0].label;
        const children = area[0].children;
        const city = children.filter(item => item.value === v[1])[0].label;
        const { dispatch } = this.props;
        dispatch({
            type: 'updateBankAccount/chooseCity',
            payload: { openProvince: province, openCity: city }
        })
    }

    render() {
        const { updateBankAccount } = this.props;
        const { item } = updateBankAccount;
        const pattern = /^[0-9]*$/;
        return (
            <div className="page-container">
                <NavBar
                    icon={<Icon type="left" />}
                    onLeftClick={this.goBack}
                >修改银行账户</NavBar>
                <List>
                    <Item className={`row-cell ${styles.listItem}`}>
                        <div className={styles.label}>账户类型</div>
                        <div className={styles.labelContent}>
                            {this.tfAccountType(item.accountType)}
                        </div>
                    </Item>
                    <Item arrow="horizontal" className="row-cell" onClick={this.toSearchBank} >
                        <div className={styles.item}>
                            <div className={styles.itemLeft}>开户行全称</div>
                            <div className={styles.itemRight} placeholder='请选择开户行' >{item.openAccountFullName}</div>
                        </div>
                    </Item>
                    <Item className="row-cell">
                        <div className={styles.label}>大额行号</div>
                        <div className={styles.labelContent}>
                            <input type='text' className={styles.input} placeholder='请在此输入大额行号' maxLength='22' onChange={this.onBigNumChange} value={item.bigNum} />
                        </div>
                    </Item>
                    <Item className="row-cell">
                        <div className={styles.item}>
                            <div className={styles.itemLeft}>户名</div>
                            <div className={styles.itemRight}>{item.accountName}</div>
                        </div>
                    </Item>
                    <Item className="row-cell">
                        <div className={styles.label}>账号</div>
                        <div className={styles.labelContent}>
                            <input type='text' className={styles.input} placeholder='请在此输入账号' maxLength='22' onChange={this.onAccountNumChange} value={item.accountNum} pattern={pattern} />
                        </div>
                    </Item>
                    <Picker
                        data={cities.list}
                        extra={<div className={styles.itemRight} placeholder='请选择开户城市' >{item.openProvince}{item.openCity}</div>}
                        title='请选择省市'
                        cols={2}
                        onChange={v => this.onFilterCity(v)}
                        onOk={v => this.onFilterCity(v)}
                    >
                        <Item arrow="horizontal" className="row-cell">
                            <div className={styles.item}>
                                <div className={styles.itemLeft}>开户城市</div>
                            </div>
                        </Item>
                    </Picker>
                </List>
                <Button className={styles.saveBtn} onClick={this.onSaveClick} >保存</Button>
            </div>
        )
    }
}


const mapStateToProps = ({ login, updateBankAccount, modifyBankAccount, searchbank }) => ({
    login,
    updateBankAccount,
    modifyBankAccount,
    searchbank
})

export default connect(mapStateToProps)(UpdateBankAccountPage);