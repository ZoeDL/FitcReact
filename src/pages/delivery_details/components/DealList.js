/*
 * 交割详情-票据清单
 * @Author: Honye 
 * @Date: 2018-04-02 19:03:58 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-05-14 11:21:45
 */
'use strict';

import React from 'react';
import ItemDeal from './ItemDeal';
import Event from "../../../socket/Event";
import PropTypes from "prop-types";
import { connect } from 'dva';
import { DeliveryName } from "../../../constants/TopicName";
import router from 'umi/router';
import styles from './DealList.less';

class DealList extends React.Component {

    static propTypes = {
        data: PropTypes.array.isRequired
    }

    static contextTypes = {
        socket: PropTypes.object.isRequired
    }

    static defaultProps = {
        data: []
    }

    componentDidMount() {
        const { dispatch, tradeId, reportId, isReceiver } = this.props;
        const { socket } = this.context;
        dispatch({
            type: 'deliveryDetails/reqNoteList',
            payload: {
                socket,
                params: {
                    tradeId,
                    reportId,
                    isReceiver,
                    version: 1
                }
            }
        })
    }

    handleItemClick = (item) => () => {
        router.push({
            pathname: '/details',
            query: {
                id: item.inventId,
                type: '0',  // 银商票区分
            },
        })
    }

    handleResponse = (response) => {
        const { dispatch } = this.props;
        switch(response.messageName) {
            case DeliveryName.NOTE_LIST:  // 票据详情-票据清单
                dispatch({
                    type: 'deliveryDetails/resNoteList',
                    payload: { response }
                })
                break;
            default:
                break;
        }
    }

    render() {
        const { list } = this.props;
        return (
            <div className={ styles.wrapper }>
            {
                list.map((item, index) => (
                    <ItemDeal className={ styles.item }
                        key={ index } 
                        data={ item }
                        onClick={ this.handleItemClick(item) }
                    />
                ))
            }
                <Event event='svevent' handler={ this.handleResponse } />
            </div>
        )
    }
}

const mapStateToProps = ({ deliveryDetails }) => ({
    list: deliveryDetails.noteList
})

export default connect(mapStateToProps)(DealList);