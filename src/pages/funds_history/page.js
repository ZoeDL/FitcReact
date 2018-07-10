/*
 * 历史纪录
 * @Author: Honye 
 * @Date: 2018-04-02 14:38:48 
 * @Last Modified by: zhangyuhao
 * @Last Modified time: 2018-04-11 10:52:53
 */
'use strict';

import React from 'react';
import { NavBar, Icon, Button, Toast, ListView } from 'antd-mobile';
import Event from '../../socket/Event';
import DatePicker from './components/DatePicker';
import router from 'umi/router';
import images from '../../constants/Images';
import { FundsMsgName } from '../../constants/TopicName';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import DateUtil from '../../utils/dateUtil';
import styles from './page.less';
import mergeFundsRecordOptions from './entity/FundsHistory';
import RecordListItem from './components/RecordListItem';
import RefreshListView, { RefreshState } from '../../components/RefreshListView';

let pageNumber = 0;
let loadMoreTime = 0;

class TradeHistoryPage extends React.Component {

    static contextTypes = {
        socket: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            dataSource: new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 }),
        }
    }

    goBack = () => {
        router.goBack()
    }

    componentDidMount() {
        document.body.style.overflow = 'hidden';
        this.onHeaderRefresh()
        // this.queryHistory()
    }
    
    /** 查询历史记录 */
    queryHistory = () => {
        const { dispatch, fundsHistory, funds } = this.props;
        const {startDate, endDate} = fundsHistory;
        const { socket } = this.context;
        const {accountId} = funds.account;
        pageNumber = 0;
        let fundsRecordOptions =  mergeFundsRecordOptions({accountId,startDate,endDate,pageNumber});
        dispatch({
            type: 'fundsHistory/reqHistoryList',
            payload: {
                socket,
                params: {
                    ...fundsRecordOptions
                }
            }
        })
    }
    /** 比较开始日期和结束日期 */
    CompareDate = (d1,d2) =>{
        return ((new Date(d1.replace(/-/g,"\/"))) > (new Date(d2.replace(/-/g,"\/"))));
    }
    onPress = () => {
        const { fundsHistory } = this.props;
        const {startDate, endDate} = fundsHistory;
        let result = this.CompareDate(endDate,startDate);
        if (result) {
            // this.queryHistory()
            // document.body.scrollTop = document.documentElement.scrollTop = 0;
           this.lv.scrollToTop();
            this.onHeaderRefresh()
        } else {
            Toast.info('日期范围输入不正确')
        }
    }
    componentWillReceiveProps(newProps) {
        const { fundsHistory } = newProps;
        const { recordList, refreshState } = fundsHistory;
        if (refreshState === RefreshState.NoMoreData || refreshState === RefreshState.Failure) {
            pageNumber -= 1;
        }
        if (pageNumber < 0) pageNumber = 0;

        if (recordList && recordList.length > 0 && recordList !== this.props.dataSource) {
            console.log('shushu---', recordList)
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows([...recordList])
            });
        }
    }

    /**
     * 接收服务返回
     * @param {Object} response 服务返回
     */
    handleResponse = (response) => {
        const { dispatch } = this.props;
        switch (response.messageName) {
            case FundsMsgName.ACCOUNT_RECORD:  // 资金流水记录
                dispatch({
                    type: 'fundsHistory/resHistoryList',
                    payload: { response, pageNumber }
                })
                break;
            default:
                break;
        }
    }
    loadData(fundsRecordOptions) {
        const { dispatch, funds } = this.props;
        const { socket } = this.context;
        const { accountId } = funds.account
        dispatch({
            type: 'fundsHistory/reqHistoryList',
            payload: { socket, params: { ...fundsRecordOptions, accountId } }
        });
    }
    renderRow = (rowData, sectionID, rowID) => {
        return <RecordListItem key={rowID} item={rowData} />;
    }
    onHeaderRefresh = () => {
        //下拉刷新数据
        pageNumber = 0;
        const { fundsHistory } = this.props;
        const {startDate, endDate} = fundsHistory;
        let fundsRecordOptions = mergeFundsRecordOptions({ startDate,endDate,pageNumber });
        this.loadData(fundsRecordOptions);
    }
    onFooterRefresh = () => {
        //上拉加载更多数据
        const time = Date.parse(new Date()) / 1000;
        const { fundsHistory } = this.props;
        const {startDate, endDate} = fundsHistory;
        if (time - loadMoreTime > 1) {
            pageNumber += 1;
            let fundsRecordOptions = mergeFundsRecordOptions({ startDate,endDate,pageNumber });        
            this.loadData(fundsRecordOptions);
            loadMoreTime = Date.parse(new Date()) / 1000;
        }
    }

    /**
     * 改变日期
     * @param {String} key key of state
     */
    onDateChange = (key) => (date) => {
        let newDate = DateUtil.format(new Date(date) ,'yyyy-MM-dd');
        const {dispatch} = this.props;
        dispatch({
            type: 'fundsHistory/datePicker',
            payload:{[key]:newDate}
        })
    }

    render() {
        const {fundsHistory} = this.props;
        return (
            <div className="page-container">
                <NavBar
                    icon={<Icon type="left" />}
                    onLeftClick={this.goBack}
                >历史纪录</NavBar>
                <div>
                    <div className={styles.header}>
                        <div className={styles.dueDate}>
                            <div>
                                <span className={styles.tip}>开始日期</span>
                                <DatePicker
                                    title="开始日期"
                                    value={new Date(fundsHistory.startDate)}
                                    onChange={ this.onDateChange('startDate') }
                                />
                            </div>
                            <div>
                                <img className={styles.icon} alt="icon" src={images.IC_BETWEEN} />
                            </div>
                            <div>
                                <span className={styles.tip}>结束日期</span>
                                <DatePicker
                                    title="结束日期"
                                    value={new Date(fundsHistory.endDate)}
                                    onChange={ this.onDateChange('endDate') }
                                />
                            </div>
                        </div>
                        <div>
                            <Button className={styles.button} onClick={ this.onPress }>查询</Button>
                        </div>
                    </div>
                    <RefreshListView
                        ref={el => this.lv = el}
                        useBodyScroll={false}
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow}
                        refreshState={fundsHistory.refreshState}
                        onHeaderRefresh={this.onHeaderRefresh}//下拉刷新
                        onFooterRefresh={this.onFooterRefresh}//上拉加载
                        footerFailureText='我擦嘞，居然失败了，点我加载 =.=!'
                    />
                </div>
                <Event event="svevent" handler={this.handleResponse} />
            </div>
        )
    }
}

const mapStateToProps = ({ funds, fundsHistory }) => ({
    funds,
    fundsHistory
})

export default connect(mapStateToProps)(TradeHistoryPage);