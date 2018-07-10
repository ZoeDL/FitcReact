import React from 'react';
import { List, NavBar, Icon, Picker, ActionSheet, Modal } from 'antd-mobile';
import router from 'umi/router';
import styles from './page.less';
import images from '../../constants/Images';
import {connect} from 'dva';
import cities from '../../assets/cities';
import checkInput from './util/validate';

const Item = List.Item;
const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let wrapProps;
if (isIPhone) {
  wrapProps = {
    onTouchStart: e => e.preventDefault(),
  };
}
const alert = Modal.alert;


class AddBankAccountPage extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            isDefaultAccount: 0,
            isSync: 1,
        }
    }

    goBack = () => {
        const {dispatch} = this.props;
        dispatch({
            type: 'addBankAccount/chooseCity',
            payload: {openProvince: '', openCity: ''}
        })
        router.goBack();
    }
    /** 账户信息同步类型 */
    syncAccountType = (type) => {
        if (type === 1) {
            return '电票接收账户';
        }else if (type === 2){
            return '资金接收账户';
        }
    }

    /** 确认添加账户 */
    onSureClick = () => {
        const {addBankAccount} = this.props;
        const {item} = addBankAccount;
        const result = checkInput(item);
        if (result) {
            alert('', `是否将此账户信息同步添加到${ this.syncAccountType(item.accountType) }中`, [
                { text: '取消', onPress: this.onAsynChange },
                { text: '确定', onPress: this.onSyncChange },
            ]);
        }
    }
    /** 账户类型转换 */
    tfAccountType = (type) => {
        if (type === 1) {
            return '资金接收账户';
        } 
        return '电票接收账户';
    }
    /** 显示操作面板 */
    showActionSheet = () => {
        const BUTTONS = ['资金接收账户', '电票接收账户', '取消'];
        const {dispatch} = this.props;
        ActionSheet.showActionSheetWithOptions({
          options: BUTTONS,
          cancelButtonIndex: BUTTONS.length - 1,
          maskClosable: true,
          wrapProps,
        },
        (buttonIndex) => {
            if (buttonIndex === BUTTONS.length - 1) {
                return
            }
            if (buttonIndex === 0) {
                dispatch({
                    type: 'addBankAccount/setAccountType',
                    payload: { accountType: 1 }
                })
            }
            if (buttonIndex === 1) {
                dispatch({
                    type: 'addBankAccount/setAccountType',
                    payload: { accountType: 2 }
                })
            }
        });
      }
      /** 设置大额行号 */
      onBigNumChange = (event) => {
          const {dispatch} = this.props;
          dispatch({
            type: 'addBankAccount/bigNumSuccessed',
            payload: { bigNum: event.target.value }
          })
      }
      /** 设置账号 */
      onAccountNumChange = (event) => {
          const { dispatch } = this.props;
          dispatch({
              type: 'addBankAccount/accountNumSuccessed',
              payload: { accountNum: event.target.value }
          })
      }
      
      /** 设置是否默认用户 */
      onDefaultChange = () => {
        this.setState((prevState) => {
            if (prevState.isDefaultAccount === 0) {
                return {isDefaultAccount: 1};
            } else if (prevState.isDefaultAccount === 1) {
                return {isDefaultAccount: 0};
            }
        });
      }
      /** 设置同步 */
      onSyncChange = () => {
          this.setState({
              isSync: 1
          },() => {
            const {dispatch, addBankAccount} = this.props;
            const {login} = this.props;
            const {token} = login;
            const {user} = login;
            const { item } = addBankAccount;
            const {accountType, openAccountFullName, bigNum, accountNum, openProvince, openCity } = item;
            const {isDefaultAccount, isSync } = this.state;
            dispatch({
                type: 'addBankAccount/addBankAccount',
                payload: { companyId: user.companyId, accountType, openAccountFullName, bigNum, accountName:user.companyName, accountNum, openProvince, openCity, isDefaultAccount, isSync, userId: user.userId, token }
            });
          })
      }
      /** 设置不同步 */
      onAsynChange = () => {
        this.setState({
            isSync: 0
        },() => {
          const {dispatch,addBankAccount} = this.props;
          const {login} = this.props;
          const {token} = login;
          const {user} = login;
          const { item } = addBankAccount;
          const {accountType, openAccountFullName, bigNum, accountNum, openProvince, openCity } = item;
          const {isDefaultAccount, isSync } = this.state;
          
          dispatch({
              type: 'addBankAccount/addBankAccount',
              payload: { companyId: user.companyId, accountType, openAccountFullName, bigNum, accountName:user.companyName, accountNum, openProvince, openCity, isDefaultAccount, isSync, userId: user.userId, token }
          });
        })
    }
    /** 跳转搜索银行 */
    toSearchBank = () => {
        const {dispatch} = this.props;
        dispatch({
            type: 'searchbank/searchSuccessed',
            payload:{bankList: []}
        })
        dispatch({
            type: 'searchbank/searchInput',
            payload:{bankName: ''}
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
        const {dispatch} = this.props;
        dispatch({
            type: 'addBankAccount/chooseCity',
            payload: {openProvince: province, openCity: city}
        })
    }



    render() {
        const {isDefaultAccount} = this.state;
        const {login} = this.props;
        const {user} = login;
        const imgSrc = isDefaultAccount ? images.DEFAULT_ACCOUNT_ON : images.DEFAULT_ACCOUNT_OFF; 
        const {addBankAccount} = this.props;
        const { item } = addBankAccount;
        const { accountType, openAccountFullName, bigNum, openProvince, openCity } = item;
        
        return( 
            <div className='page-container'>
                <NavBar
                    icon={<Icon type="left" />}
                    onLeftClick={this.goBack}
                >添加银行账户</NavBar>
                <div className={styles.prompt}>请绑定本公司银行卡</div>
                <List>
                    <Item arrow="horizontal" className={`row-cell ${styles.listItem}`} onClick={this.showActionSheet}>
                        <div className={styles.label}>账户类型</div>
                        <div className={styles.labelContent}>{ this.tfAccountType(accountType) }</div>
                    </Item>
                    <Item arrow="horizontal" className="row-cell" onClick={this.toSearchBank} >
                        <div className={styles.item}>
                            <div className={styles.itemLeft}>开户行全称</div>
                            <div className={styles.itemRight} placeholder='请选择开户行' >{openAccountFullName}</div>
                        </div>
                    </Item>
                     <Item className="row-cell">
                        <div className={styles.label}>大额行号</div>
                        <div className={styles.labelContent}>
                            <input type='text' className={styles.input}  placeholder='请在此输入大额行号' maxLength='22' onChange={this.onBigNumChange} value={bigNum} />
                        </div>
                    </Item>
                    <Item className="row-cell">
                        <div className={styles.item}>
                            <div className={styles.itemLeft}>户名</div>
                            <div className={styles.itemRight}>{user.companyName}</div>
                        </div>
                    </Item>
                    <Item className="row-cell">
                        <div className={styles.label}>账号</div>
                        <div className={styles.labelContent}>
                            <input type='text' className={styles.input}  placeholder='请在此输入账号' maxLength='22' onChange={this.onAccountNumChange} pattern="^[0-9]*$"/>
                        </div>
                    </Item>
                    <Picker
                        data={cities.list}
                        extra={<div className={styles.itemRight} placeholder='请选择开户城市' >{openProvince}{openCity}</div>}
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
                
                <div className={styles.flexwrap}>
                    <div className={styles.flexitem} onClick={(isDefaultAccount) => {this.onDefaultChange(isDefaultAccount)}}>
                        <img src={imgSrc} alt="" />
                        设为默认账户
                    </div>
                    <div className={styles.flexitem} onClick={this.onSureClick}>
                        确认
                    </div>
                </div>
            </div>
        ) 
    }
};

const mapStateToProps = ( {login, addBankAccount, searchbank}) => ({
    login,
    addBankAccount,
    searchbank
})

export default connect(mapStateToProps)(AddBankAccountPage);