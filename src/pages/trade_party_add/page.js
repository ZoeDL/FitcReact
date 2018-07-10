/*
 * 添加交易对手
 * @Author: Honye 
 * @Date: 2018-04-11 09:46:00 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-04-17 09:49:25
 */
'use strict';

import React from 'react';
import { NavBar, Icon, Accordion, List } from 'antd-mobile';
import SearchBar from '../../components/SearchBar';
import Event from '../../socket/Event';
import PropTypes from "prop-types";
import { TradePartyName } from '../../constants/TopicName';
import router from 'umi/router';
import { connect } from 'dva';
import images from '../../constants/Images';
import styles from './page.less';

class AddPage extends React.Component {

    static contextTypes = {
        socket: PropTypes.object.isRequired
    }

    renderAccordionHeader = (item, index) => {
        const { whitelist, selectedList } = this.props;
        const groupAll = selectedList[item.categoryId] && Object.keys(selectedList[item.categoryId]).length === whitelist[index].whitelists.length;
        return (
            <div className={ styles.accordionHeader }>
                { `${item.categoryName}(${item.whitelists.length})` }
                <img alt="icon" src={ groupAll ? images.ICON_CHECKED : images.ICON_UNCHECKED } onClick={ this.onHeaderClick(item, index) }/>
            </div>
        )
    }

    onHeaderClick = (item, index) => (e) => {
        e.stopPropagation();
        const { dispatch } = this.props;
        dispatch({
            type: 'tradePartyAdd/selectGroup',
            payload: {
                groupId: item.categoryId,
                index
            }
        })
    }

    onItemClick = (item, index) => (e) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'tradePartyAdd/selectChild',
            payload: {
                child: item
            }
        })
    }

    componentDidMount() {
        const { dispatch } = this.props;
        const { socket } = this.context;
        dispatch({
            type: 'tradePartyAdd/getWhitelist',
            payload: {
                socket,
                params: {
                    whitelistType: 2,
                    version: 1
                }
            }
        })
    }

    handleResponse = (response) => {
        const { dispatch } = this.props;
        switch(response.messageName) {
            case TradePartyName.WHITELIST:  // 白名单
                dispatch({
                    type: 'tradePartyAdd/resWhitelist',
                    payload: { response }
                })
                break;
            default:
                break;
        }
    }

    /** 确认选择 */
    handleCommit = () => {
        const { dispatch, selectedList } = this.props;
        let pushList = [];
        Object.keys(selectedList).forEach((groupId) => {
            pushList = pushList.concat(Object.keys(selectedList[groupId]).map((childId) => {
                return selectedList[groupId][childId]
            }))
        })
        dispatch({
            type: "tradePartySelected/pushSelectParty",
            payload: {
                list: pushList
            }
        })
        router.goBack()
    }

    /** 全选/取消全选 */
    handleSelectAll = () => {
        const { dispatch } = this.props;
        dispatch({
            type: 'tradePartyAdd/selectAll'
        })
    }

    render() {
        const { whitelist, selectedList } = this.props;
        let total = 0, selectedNum = 0;
        whitelist.forEach(element => {
            total += element.whitelists.length
        });
        Object.keys(selectedList).forEach((key) => {
            selectedNum += Object.keys(selectedList[key]).length
        })
        return (
            <div className="page-container">
                <NavBar
                    icon={ <Icon type="left" /> }
                    onLeftClick={ router.goBack }
                >选择交易对手</NavBar>
                <div>
                    <div className={ styles.searchBar }>
                        <SearchBar disabled placeholder="搜索" onClick={()=>router.push('/trade_party_search')} />
                    </div>
                    <div className={ styles.listWrapper }>
                        <Accordion className={ styles.accordion }>
                        {
                            whitelist.map((group, index) => (
                                <Accordion.Panel key={ group.categoryId }
                                    className={ styles.accordionItem }
                                    header={ this.renderAccordionHeader(group, index) }
                                >
                                    <List>
                                    {
                                        group.whitelists.map((item, index) => (
                                            <List.Item key={ item.cpCompanyId } className={ styles.item } onClick={ this.onItemClick(item, index) }>
                                                <div className={ styles.itemContent }>
                                                    { item.bankFullName }
                                                    <img alt="icon" src={ 
                                                        selectedList[item.categoryId] && selectedList[item.categoryId][item.cpCompanyId] ?
                                                        images.ICON_CHECKED
                                                        : images.ICON_UNCHECKED
                                                    } />
                                                </div>
                                            </List.Item>
                                        ))
                                    }
                                    </List>
                                </Accordion.Panel>
                            )) 
                        }
                        </Accordion>
                    </div>
                    <div className={ styles.bottom }>
                        <div className={ styles.selectAll } onClick={ this.handleSelectAll }>
                            <img alt="icon" src={ selectedNum===total ? images.ICON_CHECKED : images.ICON_UNCHECKED } />
                            <span>全选</span>
                        </div>
                        <div className={ styles.commit }>
                            <span>已选{ selectedNum }/{ total }</span>
                            <div className={ styles.button } onClick={ this.handleCommit } >确认</div>
                        </div>
                    </div>
                </div>
                <Event event="svevent" handler={ this.handleResponse } />
            </div>
        )
    }
}

const mapStateToProps = ({ tradePartyAdd }) => ({
    ...tradePartyAdd
})

export default connect(mapStateToProps)(AddPage);