/*
 * 挑选票据清单
 * @Author: Honye 
 * @Date: 2018-05-07 15:26:34 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-05-17 11:55:04
 */
import React from 'react';
import { NavBar, Icon, Button, Modal, Toast } from 'antd-mobile';
import ItemNote from './components/ItemNote';
import Event from '../../socket/Event';
import PropTypes from 'prop-types';
import router from 'umi/router';
import withLogin from '../../components/withLogin';
import { connect } from 'dva';
import { DeliveryName } from "../../constants/TopicName";
import styles from './page.less';

class SelectNotes extends React.PureComponent {

    componentDidMount() {
        const { dispatch } = this.props;
        const { socket } = this.context;
        const { tradeId } = this.props.location.query;
        this.timer && clearInterval(this.timer);
        dispatch({
            type: 'endorseStatus/reqEndorseStatus',
            payload: {
                socket,
                params: {
                    tradeId
                }
            }
        })
        this.timer = setInterval(() => {
            dispatch({
                type: 'endorseStatus/reqEndorseStatus',
                payload: {
                    socket,
                    params: {
                        tradeId
                    }
                }
            })
        }, 10000);
    }

    componentWillUpdate(nextProps, nextState) {
        const { list } = nextProps;
        let clearTimer = true;
        list.forEach(el => {
            if(el.endorseStatus === '03' && el.isSelected) {
                clearTimer = false;
            }
        });
        if(clearTimer) {
            this.timer && clearInterval(this.timer);
        }
    }

    componentWillUnmount() {
        this.timer && clearInterval(this.timer);
    }

    handleCommit = () => {
        const { dispatch, list } = this.props;
        const { socket } = this.context;
        const { eventName, tradeId } = this.props.location.query;
        let cando = false;
        const ticketList = list.map((item, index) => {
            if(item.endorseStatus==='01' && item.checked) {
                cando = true;
            }
            return {
                legId: item.responseLegId,
                endorseStatus: item.endorseStatus,
                isSelect: item.checked,
                comment: item.comment || ''
            }
        });
        if(cando) {
            dispatch({
                type: 'deliveryDetails/reqTimelineEvent',
                payload: {
                    socket,
                    params: {
                        tradeId,
                        eventName,
                        eventParameter: { ticketList },
                        version: 1
                    }
                }
            })
        } else {
            Toast.info('至少选择一张票据!')
        }
    }

    /** 背书信息 */
    handleEndorseInfoClick = (item, index) => (endorseStatus) => {
        if(endorseStatus!=='01') {
            Modal.alert(
                '',endorseStatus==='03'?'背书信息加载中':'票据信息不一致'
            )
        } else {
            router.push({
                pathname: '/endorse_info',
                query: {
                    id: item.ticketId
                }
            })
        }
    }

    /**
     * 选中/取消选择
     * @param {Boolean} checked 是否选中
     */
    handleCheckChange = (item, index) => (checked) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'endorseStatus/changeCheck',
            payload: {
                index,
                checked
            }
        })
    }

    /**
     * 备注改变
     * @param {String} value 值
     */
    handleInputChange = (item, index) => (value) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'endorseStatus/changeComment',
            payload: {
                index,
                value
            }
        })
    }

    handleResponse = (response) => {
        const { dispatch } = this.props;
        switch(response.messageName) {
            case DeliveryName.EndorseStatus:  // 票据背书状态
                dispatch({
                    type: 'endorseStatus/resEndorseStatus',
                    payload: { response }
                })
                break;
            case DeliveryName.TIMELINE_EVENT:  // 时间轴事件
                if(response.state === 1) {
                    router.goBack()
                }
                break;
            default:
                break;
        }
    }

    render() {
        const { list } = this.props;
        return (
            <div className={`page-container ${styles.page}`}>
                <NavBar
                    icon={<Icon type="left" />}
                    onLeftClick={ router.goBack }
                >挑选票据清单</NavBar>
                <div>
                {
                    list.map((item, index) => (
                        <ItemNote key={ item.inventId } 
                            data={ item } 
                            onEndorseInfoClick={ this.handleEndorseInfoClick(item, index) }
                            onCheckChange={ this.handleCheckChange(item, index) }
                            onInputChange={ this.handleInputChange(item, index) }
                        />
                    ))
                }
                </div>
                <Button className={ styles.button } onClick={ this.handleCommit } >确定</Button>
                <Event event="svevent" handler={ this.handleResponse } />
            </div>
        )
    }
}

SelectNotes.contextTypes = {
    socket: PropTypes.object.isRequired,
}

const mapStateToProps = ({ endorseStatus }) => ({
    list: endorseStatus.list
})

const withLoginComponent = withLogin()(SelectNotes);

export default connect(mapStateToProps)(withLoginComponent);