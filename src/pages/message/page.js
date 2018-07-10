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
import MessageList from './components/MessageList';
import router from 'umi/router';
import styles from './page.less';
import { connect } from 'dva';
import Event from '../../socket/Event';
import { messageMsgName} from '../../constants/TopicName';
import PropTypes from 'prop-types';



class MessagePage extends React.Component {
    static contextTypes = {
        socket: PropTypes.object.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            messageId: '',
            version: 1
        }
    }

    goBack = () => {
        router.goBack();
    }

    componentDidMount() {
        this.postMessage()
    }

    postMessage = () => {
        const {dispatch} = this.props;
        const { socket } = this.context;
        const {messageId, version} = this.state;
        dispatch({
            type: 'message/reqMessageList',
            payload: {socket, params:{version}}
        })
        dispatch({
            type: 'message/reqMessageRead',
            payload: {socket, params:{messageId, version}}
        })
    }

    handleResponse = (response) => {
        const {dispatch} = this.props;
        if (response.messageName === messageMsgName.LIST) {
            dispatch({
                type: 'message/resMessageList',
                payload: response
            })
        }
        if (response.messageName === messageMsgName.READ) {
            dispatch({
                type: 'message/resMessageRead',
                payload: response
            })
        }
    }

    render() {
        const { message } = this.props;
        const {list, refreshing} = message;
        return (
            <div className="page-container">
                <Event event="svevent" handler={this.handleResponse} />
                <NavBar
                    icon={ <Icon type="left" /> }
                    onLeftClick={ this.goBack }
                >消息</NavBar>
                <div className={styles.division}></div>
                <MessageList list={list} onRefresh={this.postMessage} refreshing={refreshing} />
            </div>
        )
    }
}

const mapStateToProps = ({ message }) => ({
    message
}) 

export default connect(mapStateToProps)(MessagePage);