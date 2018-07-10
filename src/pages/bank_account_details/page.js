import React from 'react';
import { List, NavBar, Icon, Popover } from 'antd-mobile';
import BankCardItem from '../bank_account/components/BankCardItem';
import router from 'umi/router';
import {connect} from 'dva';
import styles from './page.less';

const Item = List.Item;
const Pitem = Popover.Item;

class Detailspage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item:this.props.location.query.item
        }
    }

    goBack = () => {
        router.goBack();
    }

    componentDidMount() {
        const {modifyBankAccount} = this.props;
        const {item} = modifyBankAccount;
        const {dispatch} = this.props;
        dispatch({
            type: 'modifyBankAccount/loadBankAccount',
            payload: item
        })
    }

    //账户类型
    toAccountType = (type) => {
        switch (type) {
            case 1:
                return '资金接收账户';
            case 2:
                return '电票接收账户';
            default:
                break;
        }
    }

    /** 银行卡号4位分隔 */
    separateAccountNum = (v) => v.replace(/\s/g, '').replace(/(.{4})/g, "$1 ");

    //银行账户操作列表
    overlayList = (item) => {
        if (item.isDefaultAccount.toString() === '1') {
            return [(<Pitem value="update" >修改</Pitem>)];
        } else if (item.isUsing.toString() === '1') {
            return [
                (<Pitem value="default" >默认</Pitem>),
                (<Pitem value="forbidden" >禁用</Pitem>),
                (<Pitem value="update" >修改</Pitem>),
                (<Pitem value="delete" >删除</Pitem>),
            ];
        } else {
            return [
                (<Pitem value="default" >默认</Pitem>),
                (<Pitem value="start" >启用</Pitem>),
                (<Pitem value="update" >修改</Pitem>),
                (<Pitem value="delete" >删除</Pitem>),
            ];
        }
    }
    //选中列表选项时的操作
    onPopSelect = (opt,item) => {
        const {value} = opt.props;
        const {dispatch} = this.props;
        const {login} = this.props;
        const {token} = login;
        const {user} = login;
        switch (value) {
            case 'default':
                dispatch({
                    type: 'modifyBankAccount/modifyDefaultBankAccount',
                    payload: { companyId: item.companyId, accountId: item.bankId, userId: user.userId, token }
                });
                break;
            case 'start':
                dispatch({
                    type: 'modifyBankAccount/modifyIsUsingBankAccount',
                    payload: { isUsing: 1, accountId: item.bankId, userId: user.userId, token }
                });
                break;
            case 'forbidden':
                dispatch({
                    type: 'modifyBankAccount/modifyIsUsingBankAccount',
                    payload: { isUsing: 0, accountId: item.bankId, userId: user.userId, token }
                });
                break;
            case 'update':
                dispatch({
                    type: 'updateBankAccount/localBankAccountSuccessed',
                    payload: { item }
                });
                router.push('/bank_account_details_update');
                break;
            case 'delete':
                dispatch({
                    type: 'modifyBankAccount/delBankAccount',
                    payload: { accountId: item.bankId, userId: user.userId, token }
                });
                break;
            default:
                break;
        }
    }
    
    render() {
        const {modifyBankAccount} = this.props;
        const {item} = modifyBankAccount;
        return (
            <div className="page-container">
                <NavBar
                    icon={<Icon type="left" />}
                    onLeftClick={this.goBack}
                    rightContent={
                        <Popover mask
                            overlay={this.overlayList(item)}
                            overlayStyle={{ opacity: '.8' }}
                            onSelect={(opt) => {this.onPopSelect(opt,item)}}
                        >
                            <Icon type="ellipsis" />
                        </Popover>
                    }
                >银行账户详情</NavBar>
                
                <div className={styles.bankCard}>
                    <BankCardItem item={item} show={false}/>
                </div>

                <List>
                    <Item className="row-cell" >
                        <div className={styles.item}>
                            <div className={styles.itemLeft}>账户类型</div>
                            <div className={styles.itemRight} >{this.toAccountType(item.accountType)}</div>
                        </div>
                    </Item>
                    <Item className="row-cell" >
                        <div className={styles.item}>
                            <div className={styles.itemLeft}>开户行全称</div>
                            <div className={styles.itemRight} >{item.openAccountFullName}</div>
                        </div>
                    </Item>
                    <Item className="row-cell" >
                        <div className={styles.item}>
                            <div className={styles.itemLeft}>大额行号</div>
                            <div className={styles.itemRight} >{item.bigNum}</div>
                        </div>
                    </Item>
                    <Item className="row-cell" >
                        <div className={styles.item}>
                            <div className={styles.itemLeft}>户名</div>
                            <div className={styles.itemRight} >{item.accountName}</div>
                        </div>
                    </Item>
                    <Item className="row-cell" >
                        <div className={styles.item}>
                            <div className={styles.itemLeft}>账号</div>
                            <div className={styles.itemRight} >{this.separateAccountNum(item.accountNum)}</div>
                        </div>
                    </Item>
                    <Item className="row-cell" >
                        <div className={styles.item}>
                            <div className={styles.itemLeft}>开户城市</div>
                            <div className={styles.itemRight} >{item.openProvince}{item.openCity}</div>
                        </div>
                    </Item>
                </List>
            </div>         
        );
    }
} 

const mapStateToProps = ( {login, modifyBankAccount, updateBankAccount}) => ({
    login,
    modifyBankAccount,
    updateBankAccount
})

export default connect(mapStateToProps)(Detailspage);