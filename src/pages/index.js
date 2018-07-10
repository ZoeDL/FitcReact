/*
 * 主页
 * @Author: Honye 
 * @Date: 2018-03-15 15:57:01 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-06-01 15:53:48
 */
import React from 'react';
import { TabBar } from 'antd-mobile';
import PropTypes from 'prop-types'
import styles from './index.css';
import QuotationPage from './quotation';
import PositionPage from './position_tab/page';
import DynamicScreen from './dynamic';
import MinePage from './mine';
import BottomMenu from './components/BottomMenu';
import Event from '../socket/Event';
import { connect } from 'dva';
import { MVCType, DynamicMVC, PositionMsgName } from '../constants/TopicName';
import router from 'umi/router';

class TabBarApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showMenu: false
        }
    }

    /**
     * Tab 切换
     * @param {String} key TabItem key
     */
    onTabPress = (key) => () => {
        const { dispatch, isLogined } = this.props;
        if(isLogined || key==='quotation' || key==='us') {
            dispatch({
                type: 'tabbar/switchTab',
                payload: key
            })
        } else {
            router.push('/login')
        }
    }

    /**
     * 显示/隐藏菜单
     * @param {Boolean} show 是否显示菜单
     */
    showMenu = show => () => {
        this.setState({
            showMenu: show
        })
    }

    componentDidMount() {
        this.getTabsDatas()
    }

    /** 获取所有 Tab 页数据 */
    getTabsDatas = () => {
        const { dispatch, inventList, isLogined, inventTicketList } = this.props;
        const { socket } = this.context;
        if(!isLogined) return;
        // 持仓
        dispatch({
            type: 'position/reqList',
            payload: {
                socket,
                params: inventList
            }
        })
        dispatch({
            type: 'ticket/reqTicketList',
            payload: {
                socket: socket,
                params: inventTicketList
            }
        });
        dispatch({
            type: 'position/reqAuth',
            payload: { socket }
        })
        // 动态
        dispatch({
            type: 'dynamic/reqDynamicList',
            payload: { socket }
        })
    }

    handleResponse = (response) => {
        const { dispatch } = this.props;
        let MVCID;
        switch(response.messageName) {
            case MVCType.GMMUpdate:
                // MVC 更新事件
                MVCID = response.messageContent && response.messageContent.MVCID;
                if(MVCID === DynamicMVC.ID_QUERY) {
                    // 动态更新
                    dispatch({
                        type: 'dynamic/updateList',
                        payload: { response }
                    })
                } else if(MVCID === 'inventoryTrends') {
                    // 持仓更新
                    if(response.messageContent.BusinessObject[0].ticketType === "TETICKET") {
                        dispatch({
                            type: 'ticket/resMVC',
                            payload: {
                                res: response
                            }
                        })
                    } else if(response.messageContent.BusinessObject[0].ticketType === "ETICKET") {
                        dispatch({
                            type: 'position/resMVC',
                            payload: {
                                res: response
                            }
                        })
                    }
                }
                break;
            case MVCType.REGISTER:
                // MVC 注册事件
                MVCID = response.data && response.data.MVCID;
                if(MVCID === DynamicMVC.ID_QUERY) {
                    // 动态列表
                    dispatch({
                        type: 'dynamic/resDynamicList',
                        payload: { response }
                    })
                }
                break;
            case PositionMsgName.INVENTORY:
                // 持仓事件
                const ticketType = response.data && response.data.ticketType;
                if(ticketType === 'TETICKET') {
                    dispatch({
                        type: 'ticket/resList',
                        payload: {
                            list: response.data.list
                        }
                    })
                } else if(ticketType === 'ETICKET') {
                    dispatch({
                        type: 'position/resList',
                        payload: {
                            res: response
                        }
                    })
                }
                break;
            case PositionMsgName.IVENT_AUTHCHECK:
                // 权限检查
                if(response.state === 1) {
                    // state=1 则说明有权限
                    dispatch({
                        type: 'position/updateAuth',
                        payload: {
                            authStatus: true
                        }
                    })
                }
                break;
            default:
                break;
        }
    }

    render() {
        const { selectedTab, todos } = this.props;
        const { showMenu } = this.state;
        return (
            <div className={styles.container}>
                <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#CD6409"
                    barTintColor="#232529">
                    <TabBar.Item
                        title="行情"
                        key="quotation"
                        icon={<TabBarIcon icon={require('../assets/nav_quotation_normal@2x.png')} />}
                        selectedIcon={<TabBarIcon icon={require('../assets/nav_quotation_hover@2x.png')} />}
                        selected={ selectedTab === 'quotation' }
                        onPress={this.onTabPress('quotation')}
                    >
                        <QuotationPage />
                    </TabBar.Item>
                    <TabBar.Item
                        icon={<TabBarIcon icon={require('../assets/nav_position_normal@2x.png')} />}
                        selectedIcon={<TabBarIcon icon={require('../assets/nav_position_hover@2x.png')} />}
                        title="持仓"
                        key="position"
                        selected={ selectedTab === 'position' }
                        onPress={this.onTabPress('position')}
                    >
                        <PositionPage />
                    </TabBar.Item>
                    <TabBar.Item
                        icon={<TabBarIcon icon={require('../assets/nav_trade_normal@2x.png')} />}
                        selectedIcon={<TabBarIcon icon={require('../assets/nav_trade_hover@2x.png')} />}
                        title="交易"
                        key="trade"
                        selected={ selectedTab === 'trade' }
                        onPress={ this.showMenu(true) }
                    >
                        <div>交易 Tab 没有页面</div>
                    </TabBar.Item>
                    <TabBar.Item
                        icon={<TabBarIcon icon={require('../assets/nav_dynamic_normal@2x.png')} />}
                        selectedIcon={<TabBarIcon icon={require('../assets/nav_dynamic_hover@2x.png')} />}
                        title="动态"
                        key="dynamic"
                        badge={ todos.length }
                        selected={ selectedTab === 'dynamic' }
                        onPress={this.onTabPress('dynamic')}
                    >
                        <DynamicScreen />
                    </TabBar.Item>
                    <TabBar.Item
                        icon={<TabBarIcon icon={require('../assets/nav_us_normal@2x.png')} />}
                        selectedIcon={<TabBarIcon icon={require('../assets/nav_us_hover@2x.png')} />}
                        title="我的"
                        key="us"
                        selected={ selectedTab === 'us' }
                        onPress={this.onTabPress('us')}
                    >
                        <MinePage />
                    </TabBar.Item>
                </TabBar>
                <BottomMenu visible={ showMenu } onCancel={ this.showMenu(false) } />
                <Event event="svevent" handler={ this.handleResponse } />
            </div>
        );
    }
}

class TabBarIcon extends React.PureComponent {

    render() {
        const { icon } = this.props;
        return (
            <div 
                style={{
                    width: '22px',
                    height: '22px',
                    background: `url(${icon}) center center /  21px 21px no-repeat`
                }}
            />
        )
    }
}

TabBarApp.contextTypes = {
    socket: PropTypes.object.isRequired
}

const mapStateToProps = ({ tabbar, login, position, ticket, dynamic }) => ({
    selectedTab: tabbar.selectedTab,
    isLogined: login.isLogined,
    inventList: position.inventList,
    inventTicketList: ticket.inventList,
    todos: dynamic.todos
})


export default connect(mapStateToProps)(TabBarApp);
