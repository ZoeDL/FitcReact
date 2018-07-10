/*
 * 设置页
 * @Author: Honye 
 * @Date: 2018-03-16 09:46:36 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-05-16 08:34:35
 */
'use strict';

import React from 'react';
import { NavBar, Icon, List, Button } from 'antd-mobile';
import styles from './page.css';
import router from 'umi/router';
import { connect } from 'dva';
import { APP } from '../../constants/Config';

const Item = List.Item;

class SettingPage extends React.PureComponent {

    onItemPress = (path) => () => {
        router.push(path)
    }

    render() {
        const { login } = this.props;
        const { isLogined } = login;
        return (
            <div className="page-container">
                <NavBar
                    icon={<Icon type="left" />}
                    onLeftClick={router.goBack}
                >系统设置</NavBar>
                <List className={styles.list}>
                    {
                        isLogined && <Item className="row-cell" arrow="horizontal" onClick={this.onItemPress('/forgotpwd')} >修改密码</Item>
                    }
                    <Item className="row-cell" arrow="horizontal" onClick={this.onItemPress('/user_manual')} >帮助手册</Item>
                </List>
                <List className={styles.list}>
                    <Item className="row-cell" arrow="empty" extra={`v${APP.version}`} >版本</Item>
                    <Item className="row-cell" arrow="horizontal" onClick={this.onItemPress('/about')}>关于我们</Item>
                </List>
                <Button className={styles.button} type="warning">安全退出</Button>
            </div>
        )
    }
}

const mapStateToProps = ({ login }) => ({
    login
})

export default connect(mapStateToProps)(SettingPage);