import React from 'react';
import PropTypes from 'prop-types';
import SocketIO from 'socket.io-client';

import { warning, debug } from '../utils/Debug'
import{toFitcJson} from '../utils/JsonUtil'

class Socket extends React.Component {
  getChildContext() {
    return { 
      // socket: this.socket 
      socket: this
    };
  }

  constructor(props, context) {
    super(props, context);
    this.socket = SocketIO(props.uri, this.mergeOptions(props.options));
    this.socket.status = 'initialized';

    this.socket.on('connect', (data) => {
      this.socket.status = 'connected';
      debug('connected');
    });

    this.socket.on('disconnect', (data) => {
      this.socket.status = 'disconnected';
      debug('disconnect');
    });

    this.socket.on('error', (err) => {
      this.socket.status = 'failed';
      warning('error', err);
    });

    this.socket.on('reconnect', (data) => {
      this.socket.status = 'connected';
      debug('reconnect', data);
    });

    this.socket.on('reconnect_attempt', (data) =>   {
      debug('reconnect_attempt');
    });

    this.socket.on('reconnecting', (data) => {
      this.socket.status = 'reconnecting';
      debug('reconnecting');
    });

    this.socket.on('reconnect_failed', (error) => {
      this.socket.status = 'failed';
      warning('reconnect_failed', error);
    });

  }

  mergeOptions(options = {}) {
    const defaultOptions = {
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1 * 1000,
      reconnectionDelayMax: 10 * 1000,
      autoConnect: true,
      transports: ['polling'],
      rejectUnauthorized: true,
      timeout:10*1000
    };
    return { ...defaultOptions, ...options };
  }

  render() {
    return React.Children.only(this.props.children);
  }

  /**
   * 向服务端发送消息
   * @param {*} messageCate 消息类型
   * @param {*} messageName 消息名称
   * @param {*} content 消息内容
   */
   sendToServer(messageCate,messageName,content){
    let body=toFitcJson(messageCate,messageName,content)
    this.socket.emit('event',body);
  }

  /** 重新创建 Socket 实例 */
  reBuild = () => {
    this.socket = null;
    this.constructor(this.props, this.context);
  }

}

Socket.propTypes = {
  options: PropTypes.object,
  uri: PropTypes.string,
  children: PropTypes.element.isRequired
};

Socket.childContextTypes = {
  socket: PropTypes.object
};

export default Socket;
