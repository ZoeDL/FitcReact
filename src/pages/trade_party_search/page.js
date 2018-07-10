/*
 * 搜索交易对手
 * @Author: Honye 
 * @Date: 2018-04-11 15:27:33 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-05-15 17:44:30
 */
import React from 'react';
import { NavBar, Icon, List, Toast } from 'antd-mobile';
import SearchBar from '../../components/SearchBar';
import Event from '../../socket/Event';
import PropTypes from "prop-types";
import { connect } from 'dva';
import { TradePartyName } from "../../constants/TopicName";
import images from '../../constants/Images';
import router from 'umi/router';
import withLogin from '../../components/withLogin';
import styles from './page.less';

class SearchPage extends React.PureComponent {

    static contextTypes = {
        socket: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            keyword: ''
        }
    }

    goBack = () => {
        const { dispatch } = this.props;
        dispatch({
            type: 'tradePartySearch/clearState'
        })
        router.goBack();
    }

    /**
     * 搜索
     * @param {String} keyword 搜索关键字
     */
    doSearch = (keyword) => {
        const { dispatch } = this.props;
        const { socket } = this.context;
        dispatch({
            type: 'tradePartySearch/reqSearchParty',
            payload: {
                socket,
                params: {
                    keyName: keyword,
                    pageNo: 0,
                    pageSize: 100000,
                    type: 2
                }
            }
        })
    }

    handleResponse = (response) => {
        const { dispatch } = this.props;
        switch(response.messageName) {
            case TradePartyName.SEARCH_PARTY:  // 搜索
                dispatch({
                    type: 'tradePartySearch/resSearchParty',
                    payload: { response }
                })
                break;
            case TradePartyName.WHITELIST_ADD:  // 添加白名单
                if(response.state === 1) {
                    this.goBack()
                }
                Toast.hide();
                break;
            default:
                break;
        }
    }

    onInputChange = (e) => {
        // 延时查询，避免刷新频率过高
        e.persist();
        if(this.timer) {
            clearTimeout(this.timer)
            this.timer = null;
        }
        this.timer = setTimeout(() => {
            this.doSearch(e.target.value);
        }, 500)
    }

    handleSelectAll = () => {
        const { dispatch } = this.props;
        dispatch({
            type: 'tradePartySearch/selectAll'
        })
    }

    onItemClick = (item, index) => () => {
        const { dispatch } = this.props;
        dispatch({
            type: 'tradePartySearch/selectParty',
            payload: { item }
        })
    }

    handleCommit = () => {
        const { dispatch, selectedIds } = this.props;
        const { socket } = this.context;
        const list = Object.keys(selectedIds).map( (key) => selectedIds[key] )
        dispatch({
            type: 'tradePartyAdd/pushList',
            payload: { list }
        })
        dispatch({
            type: 'tradePartySearch/reqAddWhitelist',
            payload: {
                socket,
                params: {
                    list,
		            whitelistType: 2,
                    version: 1
                }
            }
        })
        Toast.loading('加载中...');
    }

    render() {
        const { list, selectedIds } = this.props;
        const total = list.length;
        const selectedNum = Object.keys(selectedIds).length;
        return (
            <div className="page-container">
                <NavBar
                    className={ styles.navBar }
                    icon={<Icon type="left" />}
                    onLeftClick={ this.goBack }
                >
                    <SearchBar onChange={ this.onInputChange } />
                </NavBar>
                <div className={ styles.listWrapper }>
                    <List>
                    {
                        list.map((item, index) => (
                            <List.Item key={ item.cpCompanyId } className={ styles.item } onClick={ this.onItemClick(item, index) }>
                                <div className={ styles.itemContent }>
                                    { item.bankFullName }
                                    <img alt="icon" src={ selectedIds[item.cpCompanyId] ? images.ICON_CHECKED : images.ICON_UNCHECKED } />
                                </div>
                            </List.Item>
                        ))
                    }
                    </List>
                    <div className={ styles.bottom }>
                        <div className={ styles.selectAll } onClick={ this.handleSelectAll }>
                            <img alt="icon" src={ selectedNum===total ? images.ICON_CHECKED : images.ICON_UNCHECKED } />
                            <span>全选</span>
                        </div>
                        <div className={ styles.commit } onClick={ this.handleCommit }>
                            <span>已选{ selectedNum }/{ total }</span>
                            <div className={ styles.button }>确认</div>
                        </div>
                    </div>
                </div>
                <Event event="svevent" handler={ this.handleResponse } />
            </div>
        )
    }
}

const withLoginComponent = withLogin()(SearchPage);

const mapStateToProps = ({ tradePartySearch }) => ({
    ...tradePartySearch
})

export default connect(mapStateToProps)(withLoginComponent);