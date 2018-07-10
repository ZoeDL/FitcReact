import React from 'react';
import { NavBar, Icon, Tabs, List } from 'antd-mobile';
import router from 'umi/router';
import styles from './page.less';
import {connect} from 'dva';
import Link from 'umi/link';
import BankCardItem from './components/BankCardItem';

const Item = List.Item;

class BankAccount extends React.Component {

    componentDidMount() {
        const {dispatch} = this.props;
        const {login} = this.props;
        const {token} = login;
        const {user} = login;
        dispatch({
            type: 'bankAccount/reqBankAccount',
            payload: { companyId: user.companyId, accountType: 1, userId: user.userId, token }
        });
        dispatch({
            type: 'bankAccount/reqEBankAccount',
            payload: { companyId: user.companyId, accountType: 2, userId: user.userId, token }
        });
    }
    goBack = () => {
        const {dispatch} = this.props;
        dispatch({
            type: 'bankAccount/handlePage',
            payload: { initialPage: 0 }
        })
        router.goBack();
    }

    tabsChange = (tab,index) => {
        const {dispatch} = this.props;
        dispatch({
            type: 'bankAccount/handlePage',
            payload: { initialPage: index }
        })
    }
    /** 跳转新增界面 */
    toAdd = (key,value) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'addBankAccount/setAccountType',
            payload: { [key]: value }
        })
        dispatch({
            type: 'addBankAccount/bankNameSuccessed',
            payload: {bankName: '',bankCode:''}
        })

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
        const tabs = [
            { title:'资金接收账户', sub: 1 },
            { title:'电票接收账户', sub: 2 }        
        ];
        const { bankAccount } = this.props;
        const { initialPage } = bankAccount;
        return (
            <div className="page-container">
                <NavBar
                    icon={ <Icon type="left" /> }
                    onLeftClick={ this.goBack }
                >银行账户管理</NavBar>
                <Tabs 
                    tabs={tabs}
                    initialPage={initialPage}
                    onChange={this.tabsChange}
                    tabBarBackgroundColor='#232529'
                    tabBarActiveTextColor='#CD6409'
                    tabBarInactiveTextColor='#FFFFFF'
                    tabBarUnderlineStyle={{border:'1px #CD6409 solid'}}
                >
                    {this.renderBankCard()}
                    {this.renderEBankCard()}
                    
                </Tabs>
            </div>
        )
    }
    //渲染资金接收账户
    renderBankCard() {
        const { bankAccount } = this.props;
        const { fundsData } = bankAccount;
        
        return <div className={styles.bankPageContainer}>
            {
                fundsData.map((item, index) => (
                    <BankCardItem key={index} item={item} onClick={() => this.onItemClick(item)} />
                ))
            }
            <div className={styles.addaccount}>
                <Link to="/bank_account_add" >
                    <Item className="row-cell" arrow="horizontal" onClick={() => { this.toAdd('accountType',1) } } >
                        <span>添加银行账户</span>
                    </Item>
                </Link>
            </div>
        </div>
    }
    //渲染电票接收账户
    renderEBankCard() {
        const { bankAccount } = this.props;
        const { ticketData } = bankAccount;
        
        return <div className={styles.bankPageContainer}>
            {
                ticketData.map((item, index) => (
                    <BankCardItem key={index} item={item} onClick={() => this.onItemClick(item)} />
                ))
            }
            <div className={styles.addaccount}>
                <Link to="/bank_account_add"  >
                    <Item className="row-cell" arrow="horizontal" onClick={() => { this.toAdd('accountType',2) } } >
                        <span>添加银行账户</span>
                    </Item>
                </Link>
            </div>
        </div>
    }
}

const mapStateToProps = ({ login, bankAccount, addBankAccount}) => ({
    login,
    bankAccount,
    addBankAccount
})

export default connect(mapStateToProps)(BankAccount);