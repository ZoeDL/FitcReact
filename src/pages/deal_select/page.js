/*
 * 添加票据
 * @Author: Honye 
 * @Date: 2018-03-30 14:10:32 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-05-16 19:02:00
 */
'use strict';

import React from 'react';
import { NavBar, Icon } from 'antd-mobile';
import ItemDeal from './components/ItemDeal';
import LoadView from '../../components/LoadingView';
import router from 'umi/router';
import images from '../../constants/Images';
import { connect } from 'dva';
import styles from './page.less';

class DealSelect extends React.Component {

    goBack = () => {
        router.goBack()
    }

    componentDidMount() {
        const { dispatch, allDeals, allTickets } = this.props;
        const { filter, ticketType } = this.props.location.query;
        dispatch({
            type: 'dealSelect/formatList',
            payload: {
                allDeals: Number(ticketType)===3 ? allTickets : allDeals,
                selectedDeals: [],
                filter
            }
        })
    }

    /** 单个点击事件 */
    onItemClick = (item, index) => () => {
        const { dispatch } = this.props;
        dispatch({
            type: 'dealSelect/handleCheckChange',
            payload: { item, index }
        })
    }

    /** 全选/取消全选 */
    onSelectAll = () => {
        const { dispatch } = this.props;
        dispatch({
            type: 'dealSelect/selectAll'
        })
    }

    /** 确认 */
    onCommit = () => {
        const { dispatch, list, selectedIds } = this.props;
        const { actionType } = this.props.location.query;
        dispatch({
            type: actionType || 'transfer/gotSelectedBills',
            payload: { 
                list: list.filter(item => selectedIds[item.inventId]) 
            }
        })
        this.goBack()
    }

    render() {
        const { list, selectedIds } = this.props;
        return (
            <div className="page-container">
                <NavBar
                    icon={ <Icon type="left" /> }
                    onLeftClick={ this.goBack }
                >添加票据</NavBar>
                <div className={styles.contentWrapper}>
                {
                    list && list.length > 0
                    ? list.map((item, index) => <ItemDeal 
                            key={item.inventId} 
                            data={item} 
                            onClick={ this.onItemClick(item, index) }
                            checked={selectedIds[item.inventId]}
                        />)
                    : <LoadView refreshState={ LoadView.Empty } />
                }
                {
                    list && list.length > 0 && 
                    <div className={styles.bottom}>
                        <div className={ styles.checkbox } onClick={ this.onSelectAll }>
                            <img alt="icon" src={ Object.keys(selectedIds).length === list.length ? images.ICON_CHECKED : images.ICON_UNCHECKED } />
                            <span>全选</span>
                        </div>
                        <div className={ styles.right }>
                            <span className={ styles.count }>选中<span>{ Object.keys(selectedIds).length }</span>/{ list.length }</span>
                            <span className={ styles.button } onClick={ this.onCommit }>确认</span>
                        </div>
                    </div>
                }
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ position, dealSelect, ticket }) => ({
    allDeals: position.inventList.list,
    allTickets: ticket.inventList.list,
    ...dealSelect
})

export default connect(mapStateToProps)(DealSelect);