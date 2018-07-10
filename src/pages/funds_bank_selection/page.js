import React from 'react';
import { NavBar, Icon, List, Modal } from 'antd-mobile';
import styles from './page.less';
import router from 'umi/router';
import { connect } from 'dva';

const Item = List.Item;
const alert = Modal.alert;

class FundsBankSelectionPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fundsID: this.props.location.query.fundsID,
        }
    }
    goBack = () => {
        router.goBack();
    }
    onItemClick = (item) => {
        const { dispatch } = this.props;
        const { fundsID } = this.state;
        if (fundsID === 'fundsIn') {
            dispatch({
                type: 'fundsIn/updateFundsIn',
                payload: { item }
            })
        }
        if (fundsID === 'fundsOut') {
            dispatch({
                type: 'fundsOut/updateDefaultAccount',
                payload: { item }
            })
        }
        router.goBack();
    }

    render() {
        const { fundsID } = this.state;
        if (fundsID === 'fundsIn') {
            const { fundsIn } = this.props;
            const { accounts } = fundsIn;
            return (
                <div>
                    <NavBar
                        icon={<Icon type="left" />}
                        onLeftClick={this.goBack}
                    >选择开户行</NavBar>
                    <div className={styles.underline}></div>
                    <List>
                        {
                            accounts.map((item, index) => (
                                this.renderInBankList(item, index)
                            ))
                        }
                    </List>
                </div>
            )
        } else if (fundsID === 'fundsOut') {
            const { fundsOut } = this.props;
            const { accountList } = fundsOut;
            if (accountList.length === 0) {
                alert('', '请前往银行账户管理添加银行账户', [
                    { text: '否', onPress: () => console.log('cancel') },
                    { text: '是', onPress: () => router.push('/bank_account') },
                ])
            }
            return (
                <div>
                    <NavBar
                        icon={<Icon type="left" />}
                        onLeftClick={this.goBack}
                    >选择开户行</NavBar>
                    <div className={styles.underline}></div>
                    <List>
                        {
                            accountList.map((item, index) => (
                                this.renderOutBankList(item, index)
                            ))
                        }
                    </List>
                </div>
            )
        }
    }
    /** render入金银行列表 */
    renderInBankList = (item, index) => {
        const { fundsIn } = this.props;
        const { defaultaccount } = fundsIn;
        if (item.accountNum === defaultaccount.accountNum) {
            return <Item key={index} className="row-cell" onClick={() => { this.onItemClick(item) }} >
                <div className={styles.default}>{item.openAccountFullName}</div>
            </Item>
        } else {
            return <Item key={index} className="row-cell" onClick={() => { this.onItemClick(item) }} >
                <div>{item.openAccountFullName}</div>
            </Item>
        }
    }
    /** render出金银行列表 */
    renderOutBankList = (item, index) => {
        const { fundsOut } = this.props;
        const { defaultaccount } = fundsOut;
        if (item.bankId === defaultaccount.bankId) {
            return <Item key={index} className="row-cell" onClick={() => { this.onItemClick(item) }} >
                <div className={styles.default}>{item.openAccountFullName}</div>
            </Item>
        } else {
            return <Item key={index} className="row-cell" onClick={() => { this.onItemClick(item) }} >
                <div>{item.openAccountFullName}</div>
            </Item>
        }
    }

}
const mapStateToProps = ({ fundsIn, fundsOut }) => ({
    fundsIn,
    fundsOut
})
export default connect(mapStateToProps)(FundsBankSelectionPage);