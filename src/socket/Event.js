import React from 'react';
import PropTypes from 'prop-types';

import { warning } from '../utils/Debug';
import { parseFitcJson } from '../utils/JsonUtil'

class Event extends React.Component {

    componentDidMount() {
        const { event } = this.props;
        const { socket } = this.context.socket;

        if (!socket) {
            warning('Socket IO connection has not been established.');
            return;
        }
        socket.on(event, this.onHander);
    }

    /**
     * 将服务器消息进行解析成对象
     */
    onHander = (response) => {
        const { handler } = this.props;
        handler && handler(parseFitcJson(response))
    }


    componentWillUnmount() {
        const { event } = this.props;
        const { socket } = this.context.socket;

        if (!socket) {
            warning('Socket IO connection has not been established.');
            return;
        }
        socket.off(event, this.onHander);
    }

    render() {
        return false;
    }
};

Event.contextTypes = {
    socket: PropTypes.object.isRequired
};

Event.propTypes = {
    event: PropTypes.string.isRequired,
    handler: PropTypes.func.isRequired
};

Event.defaultProps = {
    event: 'svevent'
}

export default Event;
