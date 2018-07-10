/*
 * @Author: Honye 
 * @Date: 2018-04-13 16:23:42 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-05-16 15:27:51
 */
'use strict';

import React from 'react';
import { Button, Icon, ActionSheet } from "antd-mobile";
import Timer from '../../../../components/Timer';
import PropTypes from 'prop-types';
import router from 'umi/router';
import { getVerifyTxt } from '../../utils';
import styles from './Description.less';

class Description extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            bankAccountIndex: 0,  // 选择账户的索引
        }
    }

    componentDidMount() {
        const { data } = this.props;
        if(data.accountList && data.accountList.length>0) {
            for(let i=0,len=data.accountList.length; i<len; ++i) {
                if(data.accountList[i].isSelect) {
                    this.setState({
                        bankAccountIndex: i
                    })
                    break;
                }
            }
        }
    }

    onBtnClick = (eventName) => () => {
        const { data, onBtnClick } = this.props;
        const { bankAccountIndex } = this.state;
        let params = {};
        if(data.nodeName==='WaitForLeader') {
            const bankAccount = data.accountList && data.accountList[bankAccountIndex] || {};
            params.ACCOUNTNAME = bankAccount.accountName;
			params.ACCOUNTNUM = bankAccount.accountNum;
			params.BANKACCOUNT = bankAccount.accountId;
			params.BANKNO = bankAccount.bankNo;
        }
        onBtnClick && onBtnClick(eventName, params)
    }

    showActionSheet = () => {
        const { data, lasted } = this.props;
        if(!lasted) {
            return;
        }
        const buttons = data.accountList.map((item, index) => item.bankAccount);
        ActionSheet.showActionSheetWithOptions({
            options: [...buttons, '取消'],
            cancelButtonIndex: buttons.length,
            maskCloseable: true
        }, (buttonIndex) => {
            if(buttonIndex>=0 && buttonIndex !== buttons.length) {
                this.setState({
                    bankAccountIndex: buttonIndex
                })
            }
        })
    }

    handleAddAccount = () => {
        const { lasted } = this.props;
        if(!lasted) {
            return;
        }
        router.push('/bank_account');
    }

    /** 入金 */
    onMoneyIn = () => {
        router.push('/funds')
    }

    pushPage = (pathname, query) => () => {
        router.push({ 
            pathname,
            query: { ...query }
        })
    }

    render() {
        const { data, lasted } = this.props;
        const { bankAccountIndex } = this.state;
        return (
            <div className={ styles.wrapper }>
                <div>{ data.strDiscribe }</div>
                {
                    // 计时器
                    !!data.timeType && lasted &&
                    <div>
                        <span>{ data.timeType===1 ? '用时：' : '倒计时：'}</span>
                        <Timer ms={ data.limitTime*1000 } 
                            increase={ data.timeType===1 }
                        />
                    </div>
                }{
                    // 银行账户
                    data.accountList && data.accountList.length>0 &&
                    <div>
                        <div className={ styles.picker }>
                            <div onClick={ this.showActionSheet }>
                                <div>{ data.accountList[bankAccountIndex].name }</div>
                                <Icon type="right" color="white" />
                            </div>
                            <div onClick={ this.handleAddAccount }>新增账户</div>
                        </div>
                        <div className={styles.table}>
                        {
                            data.accountList[bankAccountIndex].accountDetail.map((item, index) => (
                                <div className={styles.row} key={`row-${index}`}>
                                    <div>{ item.tableTitle }</div>
                                    <div>{ item.tableValue }</div>
                                </div>
                            ))
                        }
                        </div>
                    </div>
                }{
                    data.tableList && 
                    <div className={styles.table}>
                    {
                        data.tableList.map((item, index) => (
                            <div className={styles.row} key={`row-${index}`}>
                                <div>{ item.tableTitle }</div>
                                <div>{ item.tableValue }</div>
                            </div>
                        ))
                    }
                    </div>
                }{
                    data.accountMoney && <div>
                        <div>当前账户余额: <span className={ styles.price }>{ data.accountMoney }</span> 元</div>
                    </div>
                }{
                    data.nodeName==='WaitForCheckMoney' &&
                    <Button className={ styles.btnYellow } size='small' inline 
                        onClick={ this.pushPage('/logistics') }
                    >查看签收结果</Button>
                }
                <div>
                    { 
                        data.cancelEvent && 
                        <Button className={styles.button} 
                            type="warning"
                            size='small' inline 
                            disabled={ !lasted }
                            onClick={ this.onBtnClick(data.cancelEvent) }
                        >取消交易</Button> 
                    }{ 
                        data.verifyEvent && 
                        <Button className={ styles.button } 
                            type="primary"
                            size='small' inline 
                            disabled={ !lasted && data.verifyEvent !== 'ENSURETRANFER' }
                            onClick={ this.onBtnClick(data.verifyEvent) }
                        >{ getVerifyTxt(data.verifyEvent) }</Button> 
                    }{
                        data.nodeName==="PayMoney" &&
                        <Button className={ styles.button } 
                            type="primary"
                            size='small' inline 
                            disabled={ !lasted }
                            onClick={ this.onMoneyIn }
                        >入金</Button> 
                    }
                </div>
            </div>
        )
    }
}

Description.propTypes = {
    data: PropTypes.object.isRequired,  // 数据
    lasted: PropTypes.any,              // 是否为最新一步
}

Description.defaultProps = {
    data: {}
}

export default Description;