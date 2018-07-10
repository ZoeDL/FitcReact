import React from 'react';
import { Toast } from 'antd-mobile';
import InfoList from '../position/components/InfoList';
import Event from '../../socket/Event';
import PropTypes from 'prop-types';
import { PositionMsgName } from '../../constants/TopicName';
import { connect } from 'dva';

class HistoryPage extends React.Component {

    componentDidMount() {
        const { socket } = this.context;
        const { history, dispatch } = this.props;
        dispatch({
            type: 'history/reqList',
            payload: {
                socket: socket,
                params: history
            }
        })
    }

    handleRes = (res) => {
        const { dispatch } = this.props;
        if (res.messageName === PositionMsgName.IVENT_HISTORY) {
            if (res.data && res.data.list.length !== 0 && res.data.list[0].ticketType === "ETICKET") {
                dispatch({
                    type: 'history/resList',
                    payload: { res }
                })
            }
        } else if (res.messageName === PositionMsgName.IVENT_MOVE_TO_TODAY) {
            Toast.loading('loading...', 2, () => Toast.info(res.message, 2))
        }
    }

    render() {
        const { history } = this.props;
        return (
            <div>
                <InfoList data={history.list} type="0" from="history" />
                <Event event="svevent" handler={this.handleRes} />
            </div>
        )
    }
}

HistoryPage.contextTypes = {
    socket: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
    return {
        history: state.history
    }
}

export default connect(mapStateToProps)(HistoryPage);