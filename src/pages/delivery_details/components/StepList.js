/*
 * 交割详情-交割
 * @Author: Honye 
 * @Date: 2018-04-02 19:45:42 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-05-16 14:51:28
 */
import React from 'react';
import { Steps, Modal } from 'antd-mobile';
import MyStep from './Step';
import Event from '../../../socket/Event';
import PropTypes from 'prop-types';
import { connect } from "dva";
import { MVCType, DeliveryName } from "../../../constants/TopicName";
import router from 'umi/router';
import styles from './StepList.less';

const Step = Steps.Step;
const Description = MyStep.Description;

class StepList extends React.Component {

    constructor(props) {
        super(props);
        this.params = {  // 时间轴参数
            payMode: "01",  // 在线支付
        }
        this.state = {
            showPwdModal: false
        }
    }

    renderStepIcon = (index) => {
        return (
            <span className={styles.stepIcon} >{index || 0}</span>
        )
    }

    componentDidMount() {
        const { dispatch, tradeId } = this.props;
        const { socket } = this.context;
        dispatch({
            type: 'deliveryDetails/reqTimeLine',
            payload: {
                socket,
                params: { tradeId }
            }
        })
    }

    /** 检测是否上锁了 */
    checkIsLock = () => {
        const { details } = this.props;
        if(details.isLocked === '0') {
            Modal.alert('',
                `该交易已被交易员(${details.lockedName})操作,您当前只能查看，不能操作！`,
                [ { text: '确定' } ]
            )
        }
        return details.isLocked === '0';
    }

    /**
     * 时间轴上按钮事件
     * @param {String} eventName 事件名
     * @param {Object} params 参数对象
     */
    handleTimelineClick = (item, index) => (eventName, params) => {
        const { tradeId } = this.props;
        if(this.checkIsLock()) return;
        if(eventName === 'ENSURETRANFER' ) {
            router.push({
                pathname: '/logistics',
                query: {
                    tradeId,
                    eventName,
                    isCurrent: index===0
                }
            })
        } else if(eventName === 'CNTRPARTYENSURE') {  // 挑选票据清单
            router.push({
                pathname: '/select_notes',
                query: {
                    tradeId,
                    eventName
                }
            })
        } else if(eventName === 'TRANSFERMONEYDIRECT') {  // 付款
            console.log('用户信息--', this.props.userInfo);
            this.params.bankAccountId = item.bankAccountId;
            if(!this.props.userInfo.isAdmin) {
                this.setState({
                    showPwdModal: true
                })
                return;
            }
            this.payMoney(eventName);
           
        } else {
            this.sendAction(eventName, params);
        }
    }

    sendAction = (eventName, params) => {
        const { dispatch, tradeId } = this.props;
        const { socket } = this.context;
        dispatch({
            type: 'deliveryDetails/reqTimelineEvent',
            payload: { 
                socket,
                params: {
                    tradeId,
                    eventName,
                    eventParameter: params,
                    version: 1
                }
            }
        })
    }

    hiddenModal = () => {
        this.setState({
            showPwdModal: false
        })
    }

    confirmPwd = () => {
        this.hiddenModal();
        this.payMoney('TRANSFERMONEYDIRECT');
    }

    /**
     * 付款
     * @param {String} eventName 事件名
     */
    payMoney = (eventName) => {
        Modal.alert('',
            '确认付款？',
            [ 
                { text: '取消' },
                { 
                    text: '确定', 
                    onPress: () => {
                        this.sendAction(eventName, {
                            PAYMODE: this.params.payMode,
                            BANKACCOUNT: this.params.bankAccountId,
                            USERNAME: this.params.username,
                            PASSWORD: this.params.password
                        })
                    }
                }
            ]
        )
    }
    
    /**
     * 其他交易员用户名及密码
     */
    handlePwdChange = (key) => (e) => {
        this.params[key] = e.target.value.trim();
    }

    handleResponse = (response) => {
        const { dispatch } = this.props;
        const conditionRegister = response.messageName===MVCType.REGISTER && response.data && response.data.MVCID===DeliveryName.MVC_TIMELINE;
        const conditionUpdate = response.messageName===MVCType.GMMUpdate && response.messageContent && response.messageContent.MVCID===DeliveryName.MVC_TIMELINE;
        if(conditionRegister) {  // 注册
            dispatch({
                type: 'deliveryDetails/resTimeline',
                payload: { response }
            })
        } else if(conditionUpdate) {  // 更新
            dispatch({
                type: 'deliveryDetails/updateTimeline',
                payload: { response }
            })
        }
    }

    render() {
        const { timeline: details } = this.props;
        let list = details.list || [];
        let nodeNames = {};
        let timeline = [];
        list.forEach(el => {
            if(!nodeNames[el.nodeName]) {
                timeline.unshift(el);
                nodeNames[el.nodeName] = true;
            }
        });
        if(details.tradeStatus===2) {
            timeline.unshift({
                strTitle: '交易成功', startTime: timeline[0].startTime, strDiscribe: '交易成功'
            })
        }
        return (
            <div>
                <Steps>
                {
                    timeline.map((item, index) => {
                        return (
                            <Step className={ styles.stepItem }
                                key={`step-${item.nodeName}`}
                                title={`${item.startTime.split(' ')[1]} ${item.strTitle}`}
                                status={details.tradeStatus===1&&index===0?'error':'wait'}
                                description={
                                    <Description 
                                        index={ index }
                                        data={ item } 
                                        lasted={ index===0 }
                                        onBtnClick={ this.handleTimelineClick(item, index) }
                                    />
                                }
                                icon={ this.renderStepIcon(timeline.length-index) }
                            />
                        )
                    })
                }
                </Steps>
                <Modal className={styles.modal}
                    visible={this.state.showPwdModal}
                    transparent
                    title="请输入其他交易员的用户名和密码"
                    footer={[
                        { text: '取消', onPress: this.hiddenModal },
                        { text: '确定', onPress: this.confirmPwd }
                    ]}
                >
                    <div className={ styles.modalContent }>
                        <input type='text' placeholder='请输入用户名' onChange={ this.handlePwdChange('username') } />
                        <input type='password' placeholder='请输入密码' onChange={ this.handlePwdChange('password') } />
                    </div>
                </Modal>
                <Event event="svevent" handler={ this.handleResponse } />
            </div>
        )
    }
}

StepList.contextTypes = {
    socket: PropTypes.object.isRequired
}

const mapStateToProps = ({ deliveryDetails, login }) => ({
    timeline: deliveryDetails.timeline,
    details: deliveryDetails.details,
    userInfo: login.user
})

export default connect(mapStateToProps)(StepList);