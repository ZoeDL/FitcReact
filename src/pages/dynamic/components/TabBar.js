/*
 * 动态标题
 * @Author: Honye 
 * @Date: 2018-04-02 11:49:34 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-04-28 16:34:26
 */
'use strict';

import React from 'react';
import { NavBar, Badge, Icon } from 'antd-mobile';
import router from 'umi/router';
import styles from './TabBar.less';

class TabBar extends React.Component {

    goToTab = (index) => () => {
        const { tabBarProps } = this.props;
        tabBarProps.goToTab(index)
    }

    handleLeftClick = () => {
        if (this.props.from === "position") 
            router.push('history_tab');
        else if (this.props.from === "history")
            router.goBack();
        else router.push('/trade_history')
    }

    render() {
        const { tabBarProps } = this.props;
        return (
            <NavBar
                icon={this.props.icon? <img className={ styles.tabIcon } alt="icon" src={ this.props.icon } /> : <Icon type="left" />}
                onLeftClick={ this.handleLeftClick }
                rightContent={this.props.rightIcon}
            >
                <div className={ styles.tabsWrap }>
                {
                    tabBarProps.tabs.map((item, index) => (
                        <span key={ index }
                            className={tabBarProps.activeTab===index?styles.active:''}
                            onClick={ this.goToTab(index) }
                        >
                            <Badge text={item.badge && item.badge}>{ item.title }</Badge>
                        </span>
                    ))
                }
                </div>
             </NavBar>
        )
    }
}

export default TabBar;