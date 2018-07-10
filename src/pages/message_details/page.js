/*
 * 消息通知页面
 * @Author: Honye 
 * @Date: 2018-03-21 17:43:55 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-03-24 10:59:49
 */
'use strict';

import React from 'react';
import { NavBar, Icon } from 'antd-mobile';
import router from 'umi/router';
import styles from './page.less';

class MessageDetailsPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            item: props.location.query
        }
    }

    goBack = () => {
        router.goBack();
    }

    render() {
        const {item} = this.state;
        return (
            <div className="page-container">
                <NavBar
                    icon={ <Icon type="left" /> }
                    onLeftClick={ this.goBack }
                >系统推送</NavBar>
                <div className={styles.content}>
                    {item.content}
                </div>
            </div>
        )
    }
}

export default MessageDetailsPage;