/*
 * @Author: Zoe 
 * @Date: 2018-03-24 11:32:08 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-04-20 09:05:52
 */
'use strict';

import React from 'react';
import Carousels from './components/carousel';
import Header from './components/header';
import NoteInfo from './components/note';
import Item from './components/item';
import { Toast, NavBar } from 'antd-mobile';
import images from '../../constants/Images.js';
import router from 'umi/router';
import styles from './index.less';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import Event from '../../socket/Event';
import { PositionMsgName } from '../../constants/TopicName';
import dataFormat from '../../utils/calckitUtils';
import convertUtil from '../../utils/convertUtil';

class Details extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editable: false,
            message: ''
        }
    }
    static contextTypes = {
        socket: PropTypes.object.isRequired,
    }

    static defaultProps = {
        isHisQuery: 0,
        version: 1
    }

    itemClick = () => {
        router.goBack();
    };

    //进入修改界面
    editPage = () => {
        const { data } = this.props.details;
        if (data.inventStatus.substring(0, 3) === 'A02') Toast.info('票据已被锁定', 2);
        else if (data.checkStatus === '02') Toast.info('发生交易过的票据不能被修改', 2);
        else if (this.state.editable) {
            const { dispatch } = this.props;
            const { socket } = this.context;
            //编辑时加锁
            dispatch({
                type: 'editing/lockReq',
                payload: {
                    socket: socket,
                    params: {
                        inventId: data.inventId,
                        isLock: true
                    }
                }
            })
            router.push('/editing');
        } else Toast.info(this.state.message, 1.5);
    }



    componentDidMount() {
        this.setState({
            editable: false,
        });
        const { socket } = this.context;
        const { dispatch, location, isHisQuery, version } = this.props;
        Toast.loading('加载中', 0);
        dispatch({
            type: 'pos_details/reqDetails',
            payload: {
                socket: socket,
                params: { inventoryId: location.query.id, isHisQuery, version }
            }
        });
    }



    handleRes = (res) => {
        const { dispatch } = this.props;
        const { socket } = this.context;
        if (res.messageName === PositionMsgName.INVENT_DETAIL) {
            dispatch({
                type: 'pos_details/resDetails',
                payload: { res }
            })
            dispatch({
                type: 'position/reqAuth',
                payload: {
                    socket: socket
                }
            });
        }
        //权限检查
        if (res.messageName === PositionMsgName.IVENT_AUTHCHECK) {
            if (res.state === 1) { //state=1则说明有权限
                const { details } = this.props;
                //检查票据可否编辑
                dispatch({
                    type: 'editing/isEditable',
                    payload: {
                        socket: socket,
                        params: {
                            inventId: details.data.inventId,
                            version: 1
                        }
                    }
                })
            } else this.setState({ message: res.message });
        }
        if (res.messageName === PositionMsgName.INVENT_EDITABLE)
            res.state === 1 ? this.setState({ editable: true }) : this.setState({ message: res.message });
    }




    render() {
        const backIcon = <img src={images.ICON_BACK} alt="goback" className={styles.goback} />
        const editIcon = this.props.location.query.from === "current" && <img src={images.ICON_EDIT} alt="edit" onClick={this.editPage} />
        const { data } = this.props.details;
        const drawer = <div className={styles.container}>
            <Item title={'收款人名称'} content={data.receiptPerson} />
            <Item title={'收款人账号'} content={data.receiptAccount} />
            <Item title={'收款人开户行'} content={data.receiptBank} />
        </div>
        const payee = <div className={styles.container}>
            <Item title={'出票人名称'} content={data.issuePerson} />
            <Item title={'出票人账号'} content={data.issueAccount} />
            <Item title={'出票人开户行'} content={data.issueBank} />
        </div>


        return (
            <div>
                <NavBar icon={backIcon} onLeftClick={this.itemClick} rightContent={editIcon}>
                    票据详情
                </NavBar>
                <Carousels imgurl={data.ticketImgURL} status={data.inventStatus && data.inventStatus.substring(0, 3)} />
                <Header paymentFullname={data.paymentFullname} bankType={data.displayBankType} type={this.props.location.query.type} />
                <NoteInfo ticketNo={convertUtil.format(data.ticketNo)} issueDate={data.issueDate} expireDate={data.expireDate}
                    restDays={data.restDays} platformMark={data.platformMark} price={dataFormat.formatTicketPrice(data.ticketPrice || 0)} />
                <div className={styles.container}>
                    <Item title={'买入成本(万)'} content={data.costPrice ? dataFormat.formatTicketPrice(data.costPrice) : null} />
                </div>
                {drawer}
                {payee}
                <div className={styles.container}>
                    <Item title={'担保公司'} content={data.assureName} />
                </div>
                <Event event="svevent" handler={this.handleRes} />
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        details: state.pos_details,
        // editing: state.editing
    }
}

export default connect(mapStateToProps)(Details);