/*
 * 搜索银行页面
 * @Author: caocong 
 */
'use strict';

import React from 'react';
import { NavBar, Icon, List, Toast } from 'antd-mobile';
import router from 'umi/router';
import styles from './page.less';
import { connect } from 'dva';
import Event from '../../socket/Event';
import { PositionMsgName } from '../../constants/TopicName';
import PropTypes from 'prop-types';

const Item = List.Item;

class SearchCompanyPage extends React.Component {

    static contextTypes = {
        socket: PropTypes.object.isRequired,
    }

    state = {
        companyList: [],
        bankName: '',
    }

    goBack = () => {
        const { dispatch } = this.props;
        dispatch({
            type: 'addBankAccount/bankNameSuccessed',
            payload: { bankName: '' }
        })
        router.goBack();
    }

    //监听用户输入
    onInputChange = (event) => {
        const { dispatch } = this.props;
        const { socket } = this.context;
        dispatch({
            type: 'searchCompany/search',
            payload: {
                socket, params: {
                    keyName: event.target.value,
                    type: '2',
                    pageNo: 0,
                    pageSize: 10,
                    version: 1
                }
            }
        })
        dispatch({
            type: 'searchCompany/searchInput',
            payload: {
                bankName: event.target.value,
                bankType: "QT"
            }
        })
        this.setState({
            bankName: event.target.value,
        })
    }

    /** 选择企业 */
    onItemClick = (item) => {
        const { dispatch, location } = this.props;
        const { fromEntering, fromEditing } = location.query;
        if (fromEntering) {
            dispatch({
                type: 'entering/onInputChange',
                payload: {
                    paymentFullname: item.bankName,
                }
            })
        } else if (fromEditing) {
            dispatch({
                type: 'editing/onInputChange',
                payload: {
                    paymentFullname: item.bankName,
                }
            })
            dispatch({
                type: 'pos_details/updateData',
                payload: {
                    paymentFullname: item.bankName,
                }
            })
        }
        router.goBack();
    }

    //点击确定时将用户输入内容存入state
    onSureClick = () => {
        const { location } = this.props;
        const { bankName } = this.state;
        const { dispatch } = this.props;
        if (location.query.fromEntering) {
            dispatch({
                type: 'entering/onInputChange',
                payload: {
                    paymentFullname: bankName,
                }
            })
        } else if (location.query.fromEditing) {
            dispatch({
                type: 'editing/onInputChange',
                payload: {
                    paymentFullname: bankName,
                }
            })
            dispatch({
                type: 'pos_details/updateData',
                payload: {
                    paymentFullname: bankName,
                }
            })
        }
        router.goBack();
    }
    /** 拿到 socket 服务结果 */
    handleResponse = (response) => {
        if (response.messageName === PositionMsgName.SEARCH_COMPANY) {
            if (response.state === 1) {  // 请求成功
                this.setState({
                    companyList: response.data.list
                })
            } else {
                Toast.info(response.message)
            }
        }
    }

    render() {
        const { companyList } = this.state;
        return (
            <div className="page-container">
                <Event event="svevent" handler={this.handleResponse} />
                <NavBar
                    icon={<Icon type="left" />}
                    onLeftClick={this.goBack}
                    rightContent={<div onClick={this.onSureClick} >确认</div>}
                ><input type='text' className={styles.search} placeholder='搜索企业' onChange={this.onInputChange} /></NavBar>
                <List className={styles.list}>
                    {
                        companyList.map((item, index) => (
                            <Item className="row-cell" key={index} onClick={() => this.onItemClick(item)}>
                                {item.bankName}
                            </Item>
                        ))
                    }
                </List>
            </div>
        )
    }
}

const mapStateToProps = ({ searchCompany }) => ({
    searchCompany
})

export default connect(mapStateToProps)(SearchCompanyPage);