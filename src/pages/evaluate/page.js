/*
 * @Author: Honye 
 * @Date: 2018-04-25 19:08:17 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-04-27 14:59:45
 */
'use strict';

import React from 'react';
import { NavBar, Icon, Button } from "antd-mobile";
import Rating from "./components/Rating";
import Event from '../../socket/Event';
import router from 'umi/router';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import styles from './page.less';

class EvaluatePage extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            stars: 5,
            content: ''
        }
    }

    handleRateChange = (value) => {
        this.setState({
            stars: value
        })
    }

    handleInputChange = (e) => {
        this.setState({
            content: e.target.value
        })
    }

    handleCommit = () => {
        const { dispatch } = this.props;
        const { socket } = this.context;
        const { stars, content } = this.state;
        const { tradeId } = this.props.location.query;
        dispatch({
            type: 'deliveryDetails/reqTimelineEvent',
            payload: {
                socket,
                params: {
                    tradeId,
                    eventName: 'submitComment',
                    eventParameter: {
                        SELECTEDRADIO: stars,
                        COMMENT: content
                    },
                    version: 1
                }
            }
        })
    }

    handleResponse = (response) => {
        
    }

    render() {
        const { hasComment } = this.props.location.query;
        const { comment } = this.props;
        return (
            <div className="page-container">
                <NavBar
                    icon={<Icon type="left" />}
                    onLeftClick={ router.goBack }
                >评价</NavBar>
                {
                    hasComment ? (
                        <div className={ styles.commentWrap }>
                            <div className={ styles.rating}>
                                <span>评价：</span>
                                <Rating stars={ comment.rateClass } disabled />
                            </div>
                            <div>{ comment.comment }</div>
                        </div>
                    ) : (
                        <div>
                            <div className={ styles.rating}>
                                <span>评价：</span>
                                <Rating onChange={ this.handleRateChange }/>
                            </div>
                            <div className={ styles.textarea }>
                                <textarea
                                    placeholder="请在此输入您的评价内容" 
                                    onChange={ this.handleInputChange }
                                />
                            </div>
                            <Button className={ styles.button } onClick={ this.handleCommit }>提交</Button>
                        </div>
                    )
                }
                <Event event="svevent" handler={ this.handleResponse } />
            </div>
        )
    }
}

EvaluatePage.contextTypes = {
    socket: PropTypes.object.isRequired,
}

const mapStateToProps = ({ deliveryDetails }) => ({
    comment: deliveryDetails.timeline.commentData || {}
})

export default connect(mapStateToProps)(EvaluatePage);