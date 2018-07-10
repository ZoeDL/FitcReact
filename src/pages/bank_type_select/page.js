/*
 * 承兑人类型选择页
 * @Author: Honye 
 * @Date: 2018-03-30 11:27:53 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-05-17 18:07:16
 */
import React from 'react';
import { NavBar, Icon } from 'antd-mobile';
import ItemCheck from './components/ItemCheck';
import Event from '../../socket/Event';
import convertUtil from '../../utils/convertUtil';
import router from 'umi/router';
import { connect } from 'dva';
import { PurchaseName } from '../../constants/TopicName';
import PropTypes from 'prop-types';
import withLogin from '../../components/withLogin';

class BankTypeSelect extends React.Component {

    componentDidMount() {
        const { ticketType } = this.props.location.query;
        const { dispatch } = this.props;
        const { socket } = this.context;
        if(Number(ticketType) === 3) {
            dispatch({
                type: 'bankTypes/reqRiskList',
                payload: {
                    socket,
                    params: {
                        tradeMode: '21',
                        version: 1
                    }
                }
            })
        }
    }

    goBack = () => {
        router.goBack()
    }

    handleClick = (item) => () => {
        const { dispatch } = this.props;
        const { ticketType } = this.props.location.query;
        dispatch({
            type: 'transfer/pushBankType',
            payload: {
                bankType: Number(ticketType) === 3 ? { code: item } : item
            }
        })
        this.goBack()
    }

    handleResponse = (response) => {
        const { dispatch } = this.props;
        switch(response.messageName) {
            case PurchaseName.RISK_LIST:
                dispatch({
                    type: 'bankTypes/resRiskLisk',
                    payload: { response }
                })
                break;
            default:
                break;
        }
    }

    render() {
        const arr = Object.keys(convertUtil.paymentType).map( (key) => convertUtil.paymentType[key] )
        arr.shift();
        const { list } = this.props;
        const { ticketType } = this.props.location.query;
        return (
            <div className="page-container">
                <NavBar
                    icon={ <Icon type="left" /> }
                    onLeftClick={ this.goBack }
                >选择承兑人类型</NavBar>
                <div>
                {
                    Number(ticketType) === 3 ?
                    list.map((item, index) => (
                        <ItemCheck 
                            key={ index }
                            title={ item } 
                            checked={ index===0 } 
                            onClick={ this.handleClick(item) }
                        />
                    ))
                    : arr.map((item, index) => (
                        <ItemCheck 
                            key={ index }
                            title={ item.label } 
                            checked={ index===0 } 
                            onClick={ this.handleClick(item) }
                        />
                    ))
                }
                </div>
                <Event event="svevent" handler={ this.handleResponse } />
            </div>
        )
    }
}

BankTypeSelect.contextTypes = {
    socket: PropTypes.object.isRequired,
}

const withLoginComponent = withLogin()(BankTypeSelect);

const mapStateToProps = ({ bankTypes }) => ({
    list: bankTypes.list
})

export default connect(mapStateToProps)(withLoginComponent);