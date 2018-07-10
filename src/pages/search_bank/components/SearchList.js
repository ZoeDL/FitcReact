
import React from 'react';
import { List } from 'antd-mobile';
import router from 'umi/router';
import {connect} from 'dva';

const Item = List.Item;

class SearchList extends React.Component {
    goBack = () => {
        router.goBack();
    }
    /** 选择开户银行 */
    onItemClick = (bankName, bankCode, bankType) => {
        const { dispatch, fromEntering, fromEditing } = this.props;
        if (fromEntering) {
            dispatch({
                type: 'entering/onInputChange',
                payload: { 
                    paymentFullname: bankName,
                    bankType: bankType
                 }
            })
        }else if(fromEditing){
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
                payload: { bankName, bankCode }
            })
            dispatch({
                type: 'updateBankAccount/onSelectBankNameSuccessed',
                payload: { bankName, bankCode }
            })
        }
        router.goBack();
    }

    render() {
        const {item} = this.props;
        const {bankName, bankCode, bankType} = item;
        return (
            <Item className="row-cell" onClick={()=>{this.onItemClick(bankName, bankCode, bankType)}} >
                {bankName}
            </Item>
        )
    }
}

const mapStateToProps = ({addBankAccount, updateBankAccount}) => ({
    addBankAccount,
    updateBankAccount
})

export default connect(mapStateToProps)(SearchList);