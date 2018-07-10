/*
 * 成交逐笔页
 * @Author: Honye 
 * @Date: 2018-03-21 19:29:58 
 * @Last Modified by: zhangyuhao
 * @Last Modified time: 2018-03-26 16:16:09
 */
'use strict';

import React from 'react';
import PropTypes from 'prop-types'
import { NavBar, Icon, ListView } from 'antd-mobile';
import HistoryListItem from '../quotation/components/HistroryListItem';
import router from 'umi/router';
import { connect } from 'dva';
import Event from '../../socket/Event';
import { MarketMsgName } from '../../constants/TopicName';
import RefreshListView, { RefreshState } from '../../components/RefreshListView';

import { mergeDynamicHistoryOptions } from '../quotation/entity/quotation';
import Filter from './components/Filter';

let pageNumber = 0;
let loadMoreTime = 0;

class DealClosedPage extends React.Component {

    static contextTypes = {
        socket: PropTypes.object.isRequired,
    }
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 }),
            open: false
        }
    }

    componentDidMount() {
        document.body.style.overflow = 'hidden';
        // document.body.style.overflow = 'auto';
        let dynamicHistoryOptions = mergeDynamicHistoryOptions();
        this.loadData(dynamicHistoryOptions);
    }

    goBack = () => {
        router.goBack()
    }

    loadData(dynamicHistoryOptions) {
        const { dispatch, login } = this.props;
        const { socket } = this.context;
        let isLogined = login.isLogined;
        dispatch({//
            type: 'quotation/dynamicHistory',
            payload: { socket, isLogined, dynamicHistoryOptions }
        });
    }
    renderRow = (rowData, sectionID, rowID) => {
        return <HistoryListItem key={rowID} item={rowData} />;
    }

    renderSeparator = (sectionID, rowID) => (
        <div style={{ height: '15px' }} key={`${sectionID}-${rowID}`} />
    )

    componentWillReceiveProps(nextProps) {
        if (nextProps.quotation.dynamicHistoryData.refreshState === RefreshState.NoMoreData || nextProps.quotation.dynamicHistoryData.refreshState === RefreshState.Failure) {
            pageNumber -= 1;
        }
        if (pageNumber < 0) pageNumber = 0;

        if (nextProps.quotation.dynamicHistoryData.dataSource
            && nextProps.quotation.dynamicHistoryData.dataSource.length > 0 && nextProps.quotation.dynamicHistoryData.dataSource !== this.props.dataSource) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows([...nextProps.quotation.dynamicHistoryData.dataSource])
            });
        }

    }

    /** 显示筛选器 ---sai--- */
    showFilter = () => {
        this.setState({
            open: !this.state.open
        })
    }
    /** 点击隐藏筛选器 ---sai--- */
    onClose = () => {
        this.setState({
            open: !this.state.open
        })
    }

    render() {
        const { quotation } = this.props;
        return (
            <div className="page-container">
                <Filter open={this.state.open} onClose={this.onClose} query={this.onHeaderRefresh} />
                <Event event="svevent" handler={this.handleResponse} />
                <NavBar
                    key='DealClosedPage'
                    icon={<Icon type="left" />}
                    onLeftClick={this.goBack}
                    rightContent={<span onClick={this.showFilter}>筛选</span>}
                >成交逐笔</NavBar>
                <RefreshListView
                    ref={el => this.lv = el}
                    useBodyScroll={false}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    renderSeparator={this.renderSeparator}
                    refreshState={quotation.dynamicHistoryData.refreshState}
                    onHeaderRefresh={this.onHeaderRefresh}//下拉刷新
                    onFooterRefresh={this.onFooterRefresh}//上拉加载
                    // 可选
                    // footerRefreshingText= '玩命加载中 >.<'
                    footerFailureText='我擦嘞，居然失败了，点我加载 =.=!'
                // footerNoMoreDataText= '-没有更多数据了-'
                />
            </div>
        )
    }
    //TODO 接收服务端
    handleResponse = (response) => {
        const { dispatch } = this.props;
        if (response.messageName === MarketMsgName.DYNAMIC_HISTORY) {//成交逐笔
            dispatch({
                type: 'quotation/dynamicHistoryFinish',
                payload: response,
                pageNumber: pageNumber
            })
        }
    }
    onHeaderRefresh = (options={}) => {
        //下拉刷新数据
        pageNumber = 0;
        let dynamicHistoryOptions = mergeDynamicHistoryOptions({ pageNumber });
        dynamicHistoryOptions = mergeDynamicHistoryOptions(options);
        this.loadData(dynamicHistoryOptions);
        this.lv.scrollToTop();
    };
    onFooterRefresh = () => {
        //上拉加载更多数据
        const time = Date.parse(new Date()) / 1000;
        if (time - loadMoreTime > 1) {
            pageNumber += 1;
            let dynamicHistoryOptions = mergeDynamicHistoryOptions({ pageNumber });
            this.loadData(dynamicHistoryOptions);
            loadMoreTime = Date.parse(new Date()) / 1000;
        }
    }
}

const mapStateToProps = ({ login, quotation }) => ({
    login,
    quotation
})

export default connect(mapStateToProps)(DealClosedPage);