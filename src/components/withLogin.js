/*
 * 登录验证高阶组件
 * @Author: Honye 
 * @Date: 2018-05-07 09:40:37 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-05-07 14:49:37
 */
import React from 'react';
import Event from '../socket/Event';
import { MVCType } from "../constants/TopicName";
import PropTypes from 'prop-types';
import router from 'umi/router';
import LoginModal from './LoginModal';

const widthLogin = () => (Component) => {

    class NewComponent extends React.Component {

        needReLogin = () => {
            this.context.socket.reBuild();
            this.clearUserInfo();
            router.replace('/login');
        }
    
        backHome = () => {
            this.context.socket.reBuild();
            this.clearUserInfo();
            const { dispatch } = this.props;
            dispatch({
                type: 'tabbar/clearTab'
            })
            router.replace('/');
        }

        clearUserInfo = () => {
            const { dispatch } = this.props;
            dispatch({
                type: 'login/clearUserInfo'
            })
        }

        handleResponse = (response) => {
            switch(response.messageName) {
                case MVCType.GMMUpdate:
                    const messageContent = response.messageContent;
                    if(messageContent && messageContent.action==='offline') {
                        LoginModal.alert(
                            '重新登录',
                            '该账户已在其他设备登录，请重新登录',
                            [
                                { text: '取消', onPress: this.backHome },
                                { text: '确定', onPress: this.needReLogin }
                            ]
                        )
                    }
                    break;
                default:
                    if(response.state === -1) {
                        LoginModal.alert(
                            '重新登录',
                            '登录失效，请重新登录',
                            [
                                { text: '取消', onPress: this.backHome },
                                { text: '确定', onPress: this.needReLogin }
                            ]
                        )
                    }
                    break;
            }
        }

        render() {
            return (
                <div>
                    <Component {...this.props} />
                    <Event event="svevent" handler={ this.handleResponse } />
                </div>
            );
        }

    }

    NewComponent.contextTypes = {
        socket: PropTypes.object.isRequired
    }

    return NewComponent;
    
};

export default widthLogin;
