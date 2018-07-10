/*
 * 微信授权返回页
 * @Author: Honye 
 * @Date: 2018-04-03 11:29:54 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-05-31 18:29:31
 */
'use strict';

import React from 'react';
import Event from '../../socket/Event';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import { LoginMsgName } from '../../constants/TopicName';

class WxLogin extends React.Component {

    static contextTypes = {
        socket: PropTypes.object.isRequired
    }

    componentDidMount() {
        this.wxLogin()
    }

    /** 微信登录 */
    wxLogin = () => {
        const { dispatch } = this.props;
        const { socket } = this.context;
        const url = new URL(window.location.href);
        const code = url.searchParams.get('code');
        dispatch({
            type: 'wechat/reqWxLogin',
            payload: {
                socket,
                params: { code }
            }
        })
    }

    handleResponse = (res) => {
        const { dispatch } = this.props;
        const { socket } = this.context;
        switch(res.messageName) {
            case LoginMsgName.WX_LOGIN:  // 微信登录
                dispatch({
                    type: 'login/logined',
                    payload: { socket, response:res}
                })
                break;
            case LoginMsgName.LOGIN:  // session 登录成功
                dispatch({
                    type: 'login/sessionRes',
                    payload: res
                })
                break;
            default:
                break;
        }
    }

    render() {
        const url = new URL(window.location.href);
        const code = url.searchParams.get('code');
        const state = url.searchParams.get('state');
        return (
            <div>
                <div>
                    <span>Code: </span>
                    <span>{ code }</span>
                </div>
                <div>
                    <span>State: </span>
                    <span>{ state }</span>
                </div>
                <Event event="svevent" handler={ this.handleResponse } />
            </div>
        )
    }
}

const mapStateToProps = ({ wechat }) => ({
    
})

export default connect(mapStateToProps)(WxLogin);