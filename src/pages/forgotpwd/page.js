/*
 * 找回密码（忘记密码）
 * @Author: Honye 
 * @Date: 2018-03-19 11:03:41 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-03-27 14:13:39
 */
'use strict';

import React from 'react';
import { NavBar, Icon, Toast } from 'antd-mobile';
import router from 'umi/router';
import { List, Button } from 'antd-mobile';
import Event from '../../socket/Event';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { LoginMsgName } from '../../constants/TopicName';
import styles from './page.less';

class ForgotPage extends React.Component {

    static contextTypes = {
        socket: PropTypes.object.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            phone: '',          // 手机
            code: '',           // 验证码
            password: '',       // 新密码
            password2: '',      // 确认密码
            leftTime: 10,       // 剩余时间
        }
    }

    /**
     * 输入变化
     * @param {String} key state key
     */
    onInputChange = (key) => (event) => {
        this.setState({
            [key]: event.target.value
        })
    }

    /** 发送验证码 */
    handleSendSMS = () => {
        const { phone } = this.state;
        const { socket } = this.context;
        const { dispatch } = this.props;
        if(!phone) {
            Toast.info('请输入手机号', 1, null, false)
            return
        }
        dispatch({
            type: 'forgotPassword/reqSendSMS',
            payload: { socket, phone }
        })
    }

    /** 更改密码 */
    handleModifyPassword = () => {
        const { phone, code, password, password2 } = this.state;
        const { socket } = this.context;
        const { dispatch } = this.props;
        if(!phone) {
            Toast.info('请输入手机号', 1, null, false)
            return
        } else if(!code) {
            Toast.info('请输入验证码', 1, null, false)
            return
        } else if(!password) {
            Toast.info('请输入密码', 1, null, false)
            return
        } else if(password2 !== password) {
            Toast.info('两次密码不一致', 1, null, false)
            return
        }
        dispatch({
            type: 'forgotPassword/reqModifyPassword',
            payload: { 
                socket,
                params: { phone, code, password }
            }
        })
    }

    /**
     * 接收服务返回
     * @param {Object} response 服务返回
     */
    handleResponse = (response) => {
        const { dispatch } = this.props;
        switch(response.messageName) {
            case LoginMsgName.SMS:  // 短信验证码
                dispatch({
                    type: 'forgotPassword/resSMS',
                    payload: { response }
                })
                break
            case LoginMsgName.FORGOT_PASSWORD:  // 忘记密码功能
                console.log('忘记密码---', response)
                dispatch({
                    type: 'forgotPassword/resModifyPassword',
                    payload: { response }
                })
                break
            default:
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.timing) {
            const { leftTime } = this.state
            let timeout = leftTime
            this.timer = setInterval(() => {
                if(timeout>1) {
                    this.setState({ leftTime: --timeout })
                } else {
                    nextProps.dispatch({
                        type: 'forgotPassword/clearInterval'
                    })
                    this.setState({ leftTime }, () => clearInterval(this.timer))
                }
            }, 1000)
        } else {
            this.timer && clearInterval(this.timer)
        }
    }

    render() {
        const { timing } = this.props;
        const { leftTime } = this.state;
        return (
            <div className="page-container">
                <NavBar 
                    icon={ <Icon type="left" /> }
                    onLeftClick={() => { router.goBack() }}
                >找回密码</NavBar>
                <div className={ styles.tips }>
                    如果收不到验证码，请致电：
                    <a className={styles.phone} href="tel:400-111-8908">400-111-8908</a>
                </div>
                <List className={styles.listWrapper}>
                    <div className={"am-list-item am-list-item-middle " + styles.listItem}>
                        <div className="am-list-line">
                            <div className={styles.listLabel}>手机号</div>
                            <div className={styles.listContent}>
                                <input className={styles.input} placeholder="请输入您的手机号" 
                                    type="tel" maxLength={11}
                                    onChange={ this.onInputChange('phone') }
                                />
                            </div>
                        </div>
                    </div>
                    <div className={"am-list-item am-list-item-middle " + styles.listItem}>
                        <div className="am-list-line">
                            <div className={styles.listLabel}>验证码</div>
                            <div className={styles.listContent}>
                                <input className={styles.input} placeholder="请输入您的验证码" 
                                    onChange={ this.onInputChange('code') }
                                />
                            </div>
                            <div className={timing ? styles.btnCodeDisabled : styles.btnCode}
                                onClick={ timing ? undefined : this.handleSendSMS }
                            >
                                { timing ? `${leftTime}(s)`: '发送验证码'}
                            </div>
                        </div>
                    </div>
                </List>
                <List className={styles.listWrapper}>
                    <div className={"am-list-item am-list-item-middle " + styles.listItem}>
                        <div className="am-list-line">
                            <div className={styles.listLabel}>新密码</div>
                            <div className={styles.listContent}>
                                <input className={styles.input} placeholder="密码为8-16个大小写字母、数字" 
                                    type="password" maxLength={16}
                                    onChange={ this.onInputChange('password') }
                                />
                            </div>
                        </div>
                    </div>
                    <div className={"am-list-item am-list-item-middle " + styles.listItem}>
                        <div className="am-list-line">
                            <div className={styles.listLabel}>确认新密码</div>
                            <div className={styles.listContent}>
                                <input className={styles.input} placeholder="再次确认新密码" 
                                    type="password" maxLength={16}
                                    onChange={ this.onInputChange('password2') }
                                />
                            </div>
                        </div>
                    </div>
                </List>
                <Button className={styles.btnCommit} activeClassName={styles.btnCommitActive}
                    onClick={ this.handleModifyPassword }
                >提交</Button>
                <Event event="svevent" handler={ this.handleResponse } />
            </div>
        )
    }
}

const mapStateToProps = ({ forgotPassword }) => ({
    ...forgotPassword
})

export default connect(mapStateToProps)(ForgotPage);