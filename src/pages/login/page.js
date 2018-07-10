/*
 * 登录页
 * @Author: Honye 
 * @Date: 2018-03-19 08:37:47 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-06-01 14:55:39
 */
import React from 'react';
import InputCell from './components/InputCell';
import { Button, Toast,  NavBar, Icon } from 'antd-mobile';
import Link from 'umi/link';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import Event from '../../socket/Event';
import config from '../../constants/Config';
import router from 'umi/router';
import styles from './page.less';
import { LoginMsgName } from '../../constants/TopicName';


class LoginPage extends React.Component {

    static contextTypes = {
        socket: PropTypes.object.isRequired,
    }

    /** 登录 */
    login = () => {
        const { dispatch, username, password } = this.props;
        if(!username) {
            Toast.info('请输入用户名', 1, ()=>{}, false);
            return;
        } else if(!password) {
            Toast.info('请输入密码', 1, ()=>{}, false);
            return;
        }
        const { socket } = this.context;
        dispatch({
            type: 'login/login',
            payload: { socket, username, password }
        })
    }

    onInputChange = (key) => (event) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'login/inputChange',
            payload: { [key]: event.target.value }
        })
    }

    /** 拿到 socket 服务结果 */
    handleResponse = (response) => {
        const { dispatch } = this.props;
        const { socket } = this.context;
        if (response.messageName === LoginMsgName.LOGIN_TOKEN) {
           //只处理登录消息
            dispatch({
                type: 'login/logined',
                payload: { socket, response }
            })
        } else if( response.messageName === LoginMsgName.LOGIN) {  // session 登录成功
            dispatch({
                type: 'login/sessionRes',
                payload: response
            })
        }
    }

    goBack = () => {
        router.goBack()
    }

    render() {
        return (
            <div className="page-container">
                <Event event="svevent" handler={this.handleResponse} />
                <NavBar
                    className={ styles.navBar }
                    icon={<Icon type="left" />}
                    onLeftClick={ this.goBack }
                ></NavBar>
                <div className={styles.bgLogo} />
                <form>
                    <InputCell labelIcon={require('../../assets/img/yhm@2x.png')}
                        placeholder="请输入10位数字交易账号"
                        maxLength={11}
                        onChange={this.onInputChange('username')}
                    />
                    <InputCell
                        labelIcon={require('../../assets/img/pass@2x.png')}
                        placeholder="请输入密码"
                        maxLength={16}
                        type="password"
                        onChange={this.onInputChange('password')}
                    />
                </form>
                <Button className={styles.btnLogin}
                    activeClassName={styles.btnActive}
                    onClick={this.login}
                >登录</Button>
                <div className={styles.actions}>
                    <Link to="/forgotpwd"><span className={styles.label}>忘记密码？</span></Link>
                    <Link to="/regist"><span className={styles.label}>注册账号</span></Link>
                </div>
                <div className={styles.bottom}>
                    <a href={ config.wxLoginUrl }>微信登录</a>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ login, loading: { models: { login: loading } } }) => ({
    ...login, loading
})

export default connect(mapStateToProps)(LoginPage);