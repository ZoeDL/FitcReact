import React from 'react';
import { NavBar, Icon, List, Button, Toast } from 'antd-mobile';
import styles from './page.less';
import router from 'umi/router';
import {connect} from 'dva';
import Event from '../../socket/Event';
import { FundsMsgName } from '../../constants/TopicName';
import PropTypes from 'prop-types';

const Item = List.Item;

class FundsInPage extends React.Component {

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
                fundsID:'fundsIn'
            }
        });
    }
    onInputChange = (event) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'fundsIn/updateSerialNumber',
            payload: { serialNumber: event.target.value }
        })
    }
    onSumbit = () => {
        const {fundsIn} = this.props;
        const {serialNumber} = fundsIn;
        if (!serialNumber) {
            Toast.info('请输入转账流水号')
            return
        }
        Toast.info('已通知交易中心处理')
        router.goBack();
        
    }
    
    /** 拿到 socket 服务结果 */
    handleResponse = (response) => {
        const { dispatch } = this.props;
        const { socket } = this.context;
        if (response.messageName === FundsMsgName.FUNDS_IN) {
            dispatch({
                type: 'fundsIn/reqFundsIned',
                payload: { socket,response }
            })
        } 
    }
    render() {
        const {fundsIn} = this.props;
        const {defaultaccount,serialNumber} = fundsIn;
        return (
            <div>
                <Event event="svevent" handler={this.handleResponse} />
                <NavBar
                    icon={<Icon type="left" />}
                    onLeftClick={this.goBack}
                >入金</NavBar>
                <div>
                    <Item className={styles.tipItem}>
                        <div className={styles.tip}>交易中心资金存款账户</div>
                    </Item>
                </div>
                <List>
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
                    <Item className="row-cell">
                        <div className={styles.item}>
                            <div className={styles.itemLeft}>转账流水号</div>
                            <div className={styles.itemRight}>
                                <input type='text' 
                                    placeholder='请在此输入转账流水号' 
                                    className={styles.input} 
                                    onChange={this.onInputChange}
                                    value={serialNumber}
                                    maxLength={22}
                                />
                            </div>
                        </div>
                    </Item>
                </List>
                <div>
                    <Item className={styles.tipItem}>
                        <div className={`${styles.tip} ${styles.tipBottom}`}>在您完成充值操作后，可点击“已充值”提醒交易中心收款</div>
                    </Item>
                </div>
                <Button 
                    className={styles.button}
                    activeClassName={styles.buttonActive}
                    onClick={this.onSumbit}
                >已转账，通知交易中心</Button>
            </div>
        )
    }
}
const mapStateToProps = ({login, fundsIn}) => ({
    login,
    fundsIn
})
export default connect(mapStateToProps)(FundsInPage);