/*
 * 注册页
 * @Author: Honye 
 * @Date: 2018-03-19 15:45:03 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-03-27 09:44:56
 */
'use strict';

import React from 'react';
import { NavBar, Icon, List, Button, Toast } from 'antd-mobile';
import Event from '../../socket/Event';
import PropTypes from 'prop-types';
import router from 'umi/router';
import { connect } from 'dva';
import { LoginMsgName } from '../../constants/TopicName';
import TimerMixin from 'react-timer-mixin';
import styles from './page.less';

class RegistPage extends React.Component {

    static mixins = [ TimerMixin ]

    static contextTypes = {
        socket: PropTypes.object.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            name: '',       // 名字
            phone: '',      // 手机号码
            code: '',       // 验证码
            password: '',   // 密码
            password2: '',  // 确认密码
            leftTime: 10,   // 剩余时间
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
                        type: 'regist/clearInterval'
                    })
                    this.setState({ leftTime }, () => clearInterval(this.timer))
                }
            }, 1000)
        } else {
            this.timer && clearInterval(this.timer)
        }
    }

    componentWillUnmount() {
        this.timer && clearInterval(this.timer)
    }

    /** 发送验证码 */
    handleSendSMS = () => {
        const { phone } = this.state;
        const { dispatch } = this.props;
        const { socket } = this.context;
        if(!phone) {
            Toast.info('请输入手机号', 1, null, false);
        } else {
            dispatch({
                type: 'regist/sendSMS',
                payload: { socket, phone }
            })
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

    /**
     * 接收服务返回
     * @param {Object} response 服务返回
     */
    handleResponse = (response) => {
        const { dispatch } = this.props;
        const { socket } = this.context;
        switch(response.messageName) {
            case LoginMsgName.SMS:  // 发送短信
                dispatch({
                    type: 'regist/gotSMS',
                    payload: { response }
                })
                break
            case LoginMsgName.REGIST:  // 注册
                dispatch({
                    type: 'regist/gotRegist',
                    payload: { socket, response }
                })
                break
            case LoginMsgName.LOGIN:  // 自动登录成功
                console.log('自动登录成功')
                dispatch({
                    type: 'login/sessionRes',
                    payload: response
                })
                break
            default:
        }
    }

    /** 注册 */
    doRegist = () => {
        const { name, phone, code, password, password2 } = this.state;
        const { dispatch } = this.props;
        const { socket } = this.context;
        if(!name) {
            Toast.info('请输入名称', 1, null, false)
            return
        } else if(!phone) {
            Toast.info('请输入手机号', 1, null, false)
            return
        } else if(!code) {
            Toast.info('请输入验证码', 1, null, false)
            return
        } else if(!password) {
            Toast.info('请输入密码', 1, null, false)
            return
        } else if( password2 !== password ) {
            Toast.info('两次密码不一致', 1, null, false)
            return
        }
        
        dispatch({
            type: 'regist/reqRegist',
            payload: { 
                socket, 
                params: { name, phone, code, password } 
            }
        })
    }

    render() {
        const { timing } = this.props;
        const { leftTime } = this.state;
        return (
            <div className="page-container">
                <Event event="svevent" handler={ this.handleResponse } />
                <NavBar
                    icon={ <Icon type="left" /> }
                    onLeftClick={() => { router.goBack() }}
                >注册</NavBar>
                <List className={styles.listWrapper}>
                    <div className={"am-list-item am-list-item-middle " + styles.listItem}>
                        <div className="am-list-line">
                            <div className={styles.listLabel}>交易员名称</div>
                            <div className={styles.listContent}>
                                <input className={styles.input} placeholder="请输入您的名称" 
                                    onChange={ this.onInputChange('name') } 
                                />
                            </div>
                        </div>
                    </div>
                    <div className={"am-list-item am-list-item-middle " + styles.listItem}>
                        <div className="am-list-line">
                            <div className={styles.listLabel}>手机号</div>
                            <div className={styles.listContent}>
                                <input className={styles.input} placeholder="请输入您的手机号" type="tel" maxLength={11} 
                                    onChange={ this.onInputChange('phone') } 
                                />
                            </div>
                        </div>
                    </div>
                    <div className={"am-list-item am-list-item-middle " + styles.listItem}>
                        <div className="am-list-line">
                            <div className={styles.listLabel}>验证码</div>
                            <div className={styles.listContent}>
                                <input className={styles.input} placeholder="请输入验证码" type="tel" maxLength={6} 
                                    onChange={ this.onInputChange('code') } 
                                />
                            </div>
                            <span className={timing ? styles.btnCodeDisabled : styles.btnCode} 
                                onClick={ timing ? undefined : this.handleSendSMS } 
                            >
                                { timing ? `${leftTime}(s)`: '发送验证码'}
                            </span>
                        </div>
                    </div>
                    <div className={"am-list-item am-list-item-middle " + styles.listItem}>
                        <div className="am-list-line">
                            <div className={styles.listLabel}>密码</div>
                            <div className={styles.listContent}>
                                <input className={styles.input} placeholder="请输入密码" type="password" maxLength={16} 
                                    onChange={ this.onInputChange('password') } 
                                />
                            </div>
                        </div>
                    </div>
                    <div className={"am-list-item am-list-item-middle " + styles.listItem}>
                        <div className="am-list-line">
                            <div className={styles.listLabel}>确认密码</div>
                            <div className={styles.listContent}>
                                <input className={styles.input} placeholder="再次输入密码" type="password" maxLength={16} 
                                    onChange={ this.onInputChange('password2') } 
                                />
                            </div>
                        </div>
                    </div>
                </List>
                <Button className={styles.btnCommit} activeClassName={styles.btnCommitActive} onClick={ this.doRegist }>提交</Button>
            </div>
        )
    }
}

const mapStateToProps = ({ regist }) => ({
    ...regist
})

export default connect(mapStateToProps)(RegistPage);