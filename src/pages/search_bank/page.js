/*
 * 搜索银行页面
 * @Author: caocong 
 */
'use strict';

import React from 'react';
import { NavBar, Icon, List } from 'antd-mobile';
import router from 'umi/router';
import styles from './page.less';
import SearchList from './components/SearchList';
import {connect} from 'dva';
import Event from '../../socket/Event';
import { BankCardMsgName } from '../../constants/TopicName';
import PropTypes from 'prop-types';

class SearchBankPage extends React.Component {
    static contextTypes = {
        socket: PropTypes.object.isRequired,
    }
    goBack = () => {
        const {dispatch} = this.props;
        dispatch({
            type: 'addBankAccount/bankNameSuccessed',
            payload: {bankName: ''}
        })
        router.goBack();
    }

    //监听用户输入
    onInputChange = (event) => {
        const {dispatch} = this.props;
        const { socket } = this.context;
        dispatch({
            type: 'searchbank/search',
            payload: { socket, params:{
                bankName: event.target.value, 
                pageNo:0, 
                pageSize:10, 
                version:1
            } }
        })
        dispatch({
            type: 'searchbank/searchInput',
            payload: { bankName: event.target.value,
                       bankType: "QT" 
                    }
        })
    }

    //点击确定时将用户输入内容存入state
    onSureClick = () => {
        const {searchbank, location} = this.props;
        const { bankName, bankCode, bankType} = searchbank;
        const { dispatch } = this.props;
        console.log("onSureClick")
        if(location.query.fromEntering){
            dispatch({
                type: 'entering/onInputChange',
                payload: { 
                    paymentFullname: bankName,
                    bankType: bankType
                }
            })
        } else if (location.query.fromEditing){
            dispatch({
                type: 'editing/onInputChange',
                payload: {
                    paymentFullname: bankName,
                    bankType: bankType
                }
            })
            dispatch({
                type: 'pos_details/updateData',
                payload: {
                    paymentFullname: bankName,
                    bankType: bankType
                }
            })
        }else{
            dispatch({
                type: 'addBankAccount/bankNameSuccessed',
                payload: { bankName }
            })
            dispatch({
                type: 'updateBankAccount/onSelectBankNameSuccessed',
                payload: { bankName, bankCode }
            })
        }
        router.goBack();
    }
    /** 拿到 socket 服务结果 */
    handleResponse = (response) => {
        const { dispatch } = this.props;
        console.log('zoe-response---',response)
        if (response.messageName === BankCardMsgName.BankName) {
            dispatch({
                type: 'searchbank/searched',
                payload: { response }
            })
        } 
    }

    render() {
        const {searchbank, location} = this.props;
        const {bankList} = searchbank;
        return (
            <div className="page-container">
                <Event event="svevent" handler={this.handleResponse} />
                <NavBar
                    icon={ <Icon type="left" /> }
                    onLeftClick={ this.goBack }
                    rightContent={ <div onClick={this.onSureClick} >确认</div> }
                ><input type='text' className={styles.search} placeholder='搜索银行' onChange={this.onInputChange} /></NavBar>
                <List className={styles.list}>
                    {
                        bankList.map((item,index) =>
                        (<SearchList key={index} item={item} 
                                     fromEntering={location.query.fromEntering}
                                     fromEditing={location.query.fromEditing}/>))
                    }
                </List>
            </div>
        )
    }
}

const mapStateToProps = ({searchbank, updateBankAccount}) => ({
    searchbank,
    updateBankAccount
})

export default connect(mapStateToProps)(SearchBankPage);