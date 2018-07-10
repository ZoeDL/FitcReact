/*
 * 选择交易对手
 * @Author: Honye 
 * @Date: 2018-03-30 17:39:45 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-05-16 17:17:06
 */
import React from 'react';
import { NavBar, Icon, Button } from 'antd-mobile';
import Accordion from './components/Accordion';
import router from 'umi/router';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import styles from './page.less';

class TradePartySelect extends React.Component {

    static contextTypes = {
        socket: PropTypes.object.isRequired,
    }

    goBack = () => {
        const { dispatch } = this.props;
        dispatch({
            type: 'tradePartySelected/clearSelectedParty'
        })
        router.goBack()
    }

    getNewItem = () => {
        router.push('/trade_party_add')
    }

    handleCommit = () => {
        router.goBack()
    }

    render() {
        const { saleVips, buyVips, selectedParty } = this.props;
        const { type } = this.props.location.query;
        const list = Number(type)===-1 ? [] : Number(type)===1 ? saleVips : buyVips;

        const rightContent = <span onClick={ this.getNewItem }>添加</span>

        return (
            <div className="page-container">
                <NavBar
                    icon={ <Icon type="left" /> }
                    onLeftClick={ this.goBack }
                    rightContent={ rightContent }
                >已选交易对手</NavBar>
                <div>
                {
                    list.length>0 && <Accordion header={`系统推荐对手(${list.length})`}>
                        {
                            list.map((item, index) => (
                                <div key={item.cpCompanyId} className={styles.listItem}>{ item.bankFullName }</div>
                            ))
                        }
                    </Accordion>
                }
                    <Accordion header={`已选交易对手(${selectedParty.length})`}>
                    {
                        selectedParty.map((item, index) => (
                            <div key={item.cpCompanyId} className={styles.listItem}>{ item.bankFullName }</div>
                        ))
                    }
                    </Accordion>
                </div>
                <Button className={styles.button} onClick={ this.handleCommit }>确认</Button>
            </div>
        )
    }
}

const mapStateToProps = ({ transfer, tradePartySelected }) => ({
    saleVips: transfer.saleVips,
    buyVips: transfer.buyVips,
    selectedParty: tradePartySelected.selectedParty,
})

export default connect(mapStateToProps)(TradePartySelect);