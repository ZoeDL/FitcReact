/*
 * 行情
 * @Author: Honye 
 * @Date: 2018-03-15 16:11:21 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-06-01 14:59:37
 */
import React from 'react';
import { NavBar, ActionSheet, Toast, Modal } from 'antd-mobile';
import PropTypes from 'prop-types'
import Event from '../../socket/Event';
import TopItem from './components/TopItem';
import { ListView } from 'antd-mobile';
import RefreshListView, { RefreshState } from '../../components/RefreshListView';
import ListItem from './components/ListItem';
import Link from 'umi/link';
import images from '../../constants/Images';
import router from 'umi/router';
import styles from './index.less';
import { connect } from 'dva';
import TimerMixin from 'react-timer-mixin';

import { mergeDynamicOptions } from './entity/quotation';
import { MarketMsgName, MVCType, CharMarketMVCID } from '../../constants/TopicName';
import convertUtil from '../../utils/convertUtil';

import Filter from './components/Filter';
import NativeShare from 'nativeshare';

let pageNumber = 0;
let loadMoreTime = 0;

const dataList = [
    { url: images.WEIXIN, title: '微信朋友圈' },
    { url: images.WEIXIN_FRIEND, title: '微信好友' },
].map(item => ({
    icon: <img src={item.url} alt={item.title} style={{ width: 36 }} />,
    title: item.title,
}));

const nativeShare = new NativeShare();

class QuotationPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 }),
            open: false,
            visible: false,
            title: '',
            desc: '',
            index: 0
        }
    }

    componentDidMount() {
        this.initData();
    }

    componentWillUnmount() {
        document.body.style.overflow = 'hidden';
        // document.body.style.overflow = 'auto';
        this.timer && TimerMixin.clearInterval(this.timer);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.quotation.dynamicData.refreshState === RefreshState.NoMoreData || nextProps.quotation.dynamicData.refreshState === RefreshState.Failure) {
            pageNumber -= 1;
        }
        if (pageNumber < 0) pageNumber = 0;

        if (nextProps.quotation.dynamicData.dataSource
            && nextProps.quotation.dynamicData.dataSource.length > 0 && nextProps.quotation.dynamicData.dataSource !== this.props.dataSource) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows([...nextProps.quotation.dynamicData.dataSource])
            });
        }

    }

    /** 加载今日请求逐笔数据及shibor数据 */
    initData(options) {
        const { login } = this.props;
        let isLogined = login.isLogined;
        let dynamicOptions = mergeDynamicOptions(options);
        this.timer && TimerMixin.clearInterval(this.timer);
        if (isLogined) {//已登录情况下
            this.loadData(isLogined, dynamicOptions, true);
            // this.timer && TimerMixin.clearInterval(this.timer);
        } else {//未登录情况，主动请求，每隔10s请求一次
            this.loadData(isLogined, dynamicOptions, true);
            this.timer = TimerMixin.setInterval(() => {
                this.loadData(isLogined, dynamicOptions, true);
            }, 10 * 1000);
        }
    }

    loadData(isLogined, dynamicOptions, isLoadShibor) {
        const { dispatch } = this.props;
        const { socket } = this.context;
        dispatch({
            type: 'quotation/dynamic',
            payload: { socket, isLogined, dynamicOptions }
        });
        if (isLoadShibor) {
            dispatch({
                type: 'quotation/shibor',
                payload: { socket }
            });
        }

    }


    /** 进入消息通知 */
    handleMsgPress = () => {
        const { login } = this.props;
        router.push(login.isLogined ? '/message' : '/login')
    }

    /** 接收服务端 */
    handleResponse = (response) => {
        const { dispatch } = this.props;
        if (response.messageName === MarketMsgName.DYNAMIC) {  //今日请求逐笔
            dispatch({
                type: 'quotation/dynamicFinish',
                payload: response,
                pageNumber: pageNumber,
                isGMMUpdate: false
            })
        } else if (response.messageName === MarketMsgName.Shibor) {  //shibor 数据
            dispatch({
                type: 'quotation/shiborFinish',
                payload: response
            })
        } else if (response.messageName === MVCType.GMMUpdate && response.messageContent.MVCID === MarketMsgName.DYNAMIC) {  // 今日请求逐笔主动推送的数据
            dispatch({
                type: 'quotation/dynamicFinish',
                payload: response.messageContent.entity,
                pageNumber: pageNumber,
                isGMMUpdate: true
            })
        } else if (response.messageName === MVCType.GMMUpdate && response.messageContent.MVCID === CharMarketMVCID.MarketUpdate) {  // 刷新shibor数据
            const { socket } = this.context;
            dispatch({
                type: 'quotation/shibor',
                payload: { socket }
            });
        }
    }

    /** 进入详情 */
    onItemClick = (item) => {
        if (item.tradeType === convertUtil.tradeMode.CompSell.code) {  //转让
            router.push({
                pathname: '/deal_details_out',
                query: {
                    item: item,
                },
            });
        } else if (item.tradeType === convertUtil.tradeMode.CompBuy.code) {  //买入
            router.push({
                pathname: '/deal_details_in',
                query: {
                    item: item,
                },
            });
        }

    }

    /** 顶部 shibor 进入图表 */
    onShiborClick = (item) => {
        if (item.bankType === '00') {
            router.push({
                pathname: '/charts_shibor',
                query: { item }
            })
            return
        }
        router.push({
            pathname: '/charts',
            query: { item }
        })
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

    /** 显示分享面板 */
    showShareActionSheet = () => {
        ActionSheet.showShareActionSheetWithOptions({
            options: dataList,
        },
            (buttonIndex) => {
                if (buttonIndex >= 0) {
                    // this.shareTo(dataList[buttonIndex].title)
                    this.setState({
                        index: buttonIndex
                    })
                    this.showModel();
                } else {
                    return
                }
            });
    }

    showModel = () => {
        this.setState({
            visible: true,
        })
    }

    onCloseModal = () => {
        this.setState({
            visible: false
        })
    }

    onChange = key => (e) => {
        this.setState({
            [key]: e.target.value
        })
    }

    /** 分享至 */
    shareTo = () => {
        this.onCloseModal();
        nativeShare.setShareData({
            icon: images.APP_ICON,
            link: window.location.href,
            title: this.state.title,
            desc: this.state.desc,
        })
        let title = dataList[this.state.index].title;
        let command = '';
        if (title === '微信朋友圈') {
            command = 'wechatTimeline'
        } else if (title === '微信好友') {
            command = 'wechatFriend'
        } else {
            return
        }
        try {
            nativeShare.call(command)
        } catch (error) {
            Toast.info('请使用浏览器分享')
        }
    }

    render() {
        const leftIcon = <div style={{ position: 'relative' }}>
            <img
                style={{ width: '1.4em', height: '1.4em' }}
                alt="message"
                src={images.ICON_MSG}
            />
            {/* <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'red', position: 'absolute', top: 0, right: 0 }} /> */}
        </div>;
        const rightIcon = <img src={images.ICON_SHARE} alt="分享" style={{ width: '1.5em', height: '1.5em' }} onClick={this.showShareActionSheet} />

        return (
            <div className="page-container">
                <Event event="svevent" handler={this.handleResponse} />
                <Filter open={this.state.open} onClose={this.onClose} query={this.onHeaderRefresh} />
                <NavBar
                    icon={leftIcon}
                    onLeftClick={this.handleMsgPress}
                    rightContent={rightIcon}
                >行情</NavBar>
                <Modal
                    visible={this.state.visible}
                    transparent
                    onClose={this.onCloseModal}
                    footer={[{ text: '取消', onPress: () => { this.onCloseModal() } }, { text: '确认', onPress: () => { this.shareTo() } }]}
                >
                    <div className={styles.shareWrap}>
                        <div className={styles.shareTitle}>
                            <input type="text" placeholder="请在此输入分享标题" onChange={this.onChange('title')} />
                        </div>
                        <div className={styles.shareDesc}>
                            <textarea placeholder="请在此输入分享描述" onChange={this.onChange('desc')} ></textarea>
                        </div>
                    </div>
                </Modal>
                {this.renderShibor()}
                {this.renderMiddle()}
                {this.renderDynamic()}
            </div>
        )
    }

    renderRow = (rowData, sectionID, rowID) => {
        return <ListItem key={rowID} item={rowData} onClick={this.onItemClick} />;
    }

    /** 渲染今日请求逐笔 */
    renderDynamic() {
        const { quotation } = this.props;
        return (
            // <div>
            <RefreshListView
                ref={el => this.lv = el}
                useBodyScroll={false}
                dataSource={this.state.dataSource}
                pullTopRefreshEnable={false}
                renderRow={this.renderRow}
                renderSeparator={this.renderSeparator}
                refreshState={quotation.dynamicData.refreshState}
                onHeaderRefresh={this.onHeaderRefresh}//下拉刷新
                onFooterRefresh={this.onFooterRefresh}//上拉加载
                // 可选
                // footerRefreshingText= '玩命加载中 >.<'
                footerFailureText='我擦嘞，居然失败了，点我加载 =.=!'
                footerNoMoreDataText='-没有更多数据了-'
            />
            // </div>
        )
    }

    /** 渲染顶部shibor数据 */
    renderShibor() {
        const { quotation } = this.props;
        if (quotation.shiborData && quotation.shiborData.length > 0) {
            return <div className={styles.topWrapper}>
                {
                    quotation.shiborData.map((item, index) => (
                        <TopItem key={index} item={item} onClick={() => this.onShiborClick(item)} />
                    ))
                }
            </div>
        }
    }

    renderMiddle() {
        return <div className={styles.listHeader}>
            <div>今日请求逐笔</div>
            <div>
                <Link className={styles.smallButton} to="/deal_closed">
                    <span>成交逐笔</span>
                </Link>
                <a className={styles.smallButton}>
                    <span onClick={this.showFilter} >筛选</span>
                </a>
            </div>
        </div>
    }

    /** 下拉刷新数据 */
    onHeaderRefresh = (options = {}) => {
        this.initData(options);
        pageNumber = 0;
    };

    /** 上拉加载更多数据 */
    onFooterRefresh = () => {
        const time = Date.parse(new Date()) / 1000;
        if (time - loadMoreTime > 1) {
            pageNumber += 1;
            let dynamicOptions = mergeDynamicOptions({ startInquiryId: this.props.quotation.dynamicData.dataSource[this.props.quotation.dynamicData.dataSource.length - 1].inquiryId });
            const { login } = this.props;
            let isLogined = login.isLogined;
            this.loadData(isLogined, dynamicOptions, false);
            loadMoreTime = Date.parse(new Date()) / 1000;
        }
    }
}

QuotationPage.contextTypes = {
    socket: PropTypes.object.isRequired,
}

const mapStateToProps = ({ login, quotation }) => ({
    login,
    quotation
})

export default connect(mapStateToProps)(QuotationPage);
