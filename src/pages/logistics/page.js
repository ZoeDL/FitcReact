/*
 * 签收结果页
 * @Author: Honye 
 * @Date: 2018-04-26 10:02:27 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-04-28 17:23:43
 */
'use strict';

import React from 'react';
import { Tabs, Icon, NavBar, Button } from 'antd-mobile';
import ItemNote from './components/ItemNote';
import Event from '../../socket/Event';
import PropTypes from 'prop-types';
import router from 'umi/router';
import { connect } from 'dva';
import { DeliveryName } from '../../constants/TopicName';
import styles from './page.less';

class LogisticsPage extends React.PureComponent {

    renderTabBar = (tabBarProps) => {
        return <TabBar tabBarProps={tabBarProps} />
    }

    handleCommit = () => {
        const { dispatch } = this.props;
        const { socket } = this.context;
        const { eventName, tradeId } = this.props.location.query;
        dispatch({
            type: 'deliveryDetails/reqTimelineEvent',
            payload: {
                socket,
                params: {
                    tradeId,
                    eventName
                }
            }
        })
    }

    handleResponse = (response) => {
        switch(response.messageName) {
            case DeliveryName.TIMELINE_EVENT:
                if(response.state === 1) {
                    router.goBack()
                }
                break;
            default:
                break;
        }
    }

    render() {
        const { timeline } = this.props;
        const { isCurrent } = this.props.location.query;
        const tabs = [
            { title: '已签收' },
            { title: '未签收' },
        ];
        let data = { ticketList: [] };
        timeline.forEach(el => {
            if(el.nodeName==='WaitForCheckMoney' || el.nodeName === "WaitForEnsureTranfer") {
                data = el;
            }
        });;
        const { ticketList=[] } = data;
        return (
            <div className={`page-container ${styles.page}`}>
                <Tabs tabs={ tabs }
                    renderTabBar={ this.renderTabBar }
                >
                    <div>
                    {
                        ticketList.filter((value) => value.isSelected)
                            .map((item, index) => (
                                <ItemNote key={ item.inventId } data={ item } />
                            ))
                    }
                    </div>
                    <div>
                    {
                        ticketList.filter((value) => !value.isSelected)
                            .map((item, index) => (
                                <ItemNote key={ item.inventId } data={ item } />
                            ))
                    }
                    </div>
                </Tabs>
                { isCurrent && <Button className={ styles.button } onClick={ this.handleCommit }>确认签收</Button>}
                <Event event="svevent" handler={ this.handleResponse } />
            </div>
        )
    }
}

class TabBar extends React.PureComponent {

    goToTab = (index) => () => {
        const { tabBarProps } = this.props;
        tabBarProps.goToTab(index)
    }

    render() {
        const { tabBarProps } = this.props;
        return (
            <NavBar
                icon={ <Icon type="left" /> }
                onLeftClick={ router.goBack }
            >
                <div className={ styles.tabsWrap }>
                {
                    tabBarProps.tabs.map((item, index) => (
                        <span key={ index }
                            className={tabBarProps.activeTab===index?styles.active:''} 
                            onClick={ this.goToTab(index) }
                        >
                            { item.title }
                        </span>
                    ))
                }
                </div>
            </NavBar>
        )
    }
}

LogisticsPage.contextTypes = {
    socket: PropTypes.object.isRequired,
}

const mapStateToProps = ({ deliveryDetails }) => ({
    timeline: deliveryDetails.timeline.list
})

export default connect(mapStateToProps)(LogisticsPage);