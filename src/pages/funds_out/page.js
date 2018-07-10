import React from 'react';
import { NavBar, Icon, List, Button, TextareaItem  } from 'antd-mobile';
import styles from './page.less';
import router from 'umi/router';
import {connect} from 'dva';
import Event from '../../socket/Event';
import { FundsMsgName } from '../../constants/TopicName';
import PropTypes from 'prop-types';
import checkInput from './util/validate';

const Item = List.Item;

class FundsOutPage extends React.Component {
    static contextTypes = {
        socket: PropTypes.object.isRequired,
    }
    goBack = () => {
        router.goBack();
    }
    /** 跳转开户行选择 */
    goBankSelection = () => {
        router.push({
            pathname: './funds_bank_selection',
            query:{
                fundsID:'fundsOut'
            }
        });
    }
    /** 出金金额 */
    onInputChange = (event) => {
        const {dispatch} = this.props;
        dispatch({
          type: 'fundsOut/updateWithDrawAmount',
          payload: { withdrawAmount: event.target.value }
        })
    }
    /** 备注 */
    onNoteChange = (text) => {
        const {dispatch} = this.props;
        dispatch({
          type: 'fundsOut/updateWithDrawReason',
          payload: { withdrawReason: text }
        })
    }
    /** 提交申请 */
    submit = () => {
        const {dispatch,login,funds,fundsOut} = this.props;
        const { socket } = this.context;
        const result = checkInput(funds, fundsOut);
        if (result) {
            dispatch({
                type: 'fundsOut/submit',
                payload: { socket,params:{
                    accountId: funds.account.accountId,
                    userId: login.user.userId,
                    userName: login.user.name,
                    accountName: fundsOut.defaultaccount.accountName,
                    accountNum: fundsOut.defaultaccount.accountNum,
                    bankAccountID: fundsOut.defaultaccount.bankId,
                    bigNum: fundsOut.defaultaccount.bigNum,
                    companyId: login.user.companyId,
                    withdrawReason : fundsOut.withdrawReason,
                    openAccount: fundsOut.defaultaccount.openAccountFullName,
                    openCity: fundsOut.defaultaccount.openCity,
                    openProvince: fundsOut.defaultaccount.openProvince,
                    withdrawAmount: fundsOut.withdrawAmount,
                } }
            })
        }
    }
    /** 拿到 socket 服务结果 */
    handleResponse = (response) => {
        const { dispatch } = this.props;
        const { socket } = this.context;
        if (response.messageName === FundsMsgName.FUNDS_OUT) {
            dispatch({
                type: 'fundsOut/reqfundsOuted',
                payload: { socket,response }
            })
        } 
        if (response.messageName === FundsMsgName.SUBMIT) {
            dispatch({
                type: 'fundsOut/submited',
                payload: { socket,response }
            })
        } 
    }
    render() {
        const {fundsOut,funds} = this.props;
        const {defaultaccount,withdrawAmount,withdrawReason} =fundsOut;
        const {account} =funds;
        return (
            <div>
                <Event event="svevent" handler={this.handleResponse} />
                <NavBar
                    icon={<Icon type="left" />}
                    onLeftClick={this.goBack}
                >出金</NavBar>
                <div className={styles.underline}></div>
                <List>
                    <Item className="row-cell">
                        <div className={styles.item}>
                            <div className={styles.itemLeft}>资金余额（元）</div>
                            <div className={`${styles.itemRight} ${styles.balance}`}>{account.balanceStr}</div>
                        </div>
                    </Item>
                    <Item className="row-cell">
                        <div className={styles.item}>
                            <div className={styles.itemLeft}>申请出金余额（元）</div>
                            <div className={styles.itemRight}>
                                <input type='text' 
                                    placeholder='请在此输入申请出金金额' 
                                    className={styles.input} 
                                    onChange={this.onInputChange} 
                                    value={withdrawAmount}
                                    maxLength={22}
                                />
                            </div>
                        </div>
                    </Item>
                    <Item className={styles.noteTitle}>转出银行账户</Item>
                    <Item className="row-cell" arrow="horizontal" onClick={this.goBankSelection} >
                        <div className={styles.item}>
                            <div className={styles.itemLeft}>开户行名称</div>
                            <div className={styles.itemRight}>{defaultaccount.openAccountFullName}</div>
                        </div>
                    </Item>
                    <Item className="row-cell">
                        <div className={styles.item}>
                            <div className={styles.itemLeft}>户名</div>
                            <div className={styles.itemRight}>{defaultaccount.accountName}</div>
                        </div>
                    </Item>
                    <Item className="row-cell">
                        <div className={styles.item}>
                            <div className={styles.itemLeft}>账户</div>
                            <div className={styles.itemRight}>{defaultaccount.accountNum}</div>
                        </div>
                    </Item>
                    <Item className="row-cell">
                        <div className={styles.item}>
                            <div className={styles.itemLeft}>大额行号</div>
                            <div className={styles.itemRight}>{defaultaccount.bigNum}</div>
                        </div>
                    </Item>
                </List>
                <div className={styles.note}>
                    <Item className={styles.noteTitle}>备注</Item>
                    <TextareaItem 
                        className={styles.textarea}
                        placeholder='请在此输入备注内容'
                        autoHeight
                        onChange={this.onNoteChange}
                        value={withdrawReason}
                    />
                </div>
                <Button
                    className={styles.button}
                    activeClassName={styles.buttonActive}
                    onClick={this.submit}
                >提交申请</Button>
            </div>
        )
    }
}
const mapStateToProps = ({login,fundsOut,funds}) => ({
    login,
    fundsOut,
    funds
})
export default connect(mapStateToProps)(FundsOutPage);