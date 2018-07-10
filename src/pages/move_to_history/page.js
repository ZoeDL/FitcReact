import React from "react";
import { NavBar, ActionSheet, List, TextareaItem, Toast} from 'antd-mobile';
import Item from '../details/components/item';
import images from '../../constants/Images';
import styles from './page.less';
import router from 'umi/router';
import {connect} from 'dva';
import PropTypes from 'prop-types';
import Event from '../../socket/Event';

const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let wrapProps;
if (isIPhone) {
    wrapProps = {
        onTouchStart: e => e.preventDefault(),
    };
}

class MoveToHist extends React.Component{
    static contextTypes = {
        socket: PropTypes.object.isRequired,
    }

    constructor(){
        super();
        this.state = {
            text: '票面信息有误',
            code: 0
        }
    }
    showActionSheet = () => {
        const options = ['票面信息有误', '已线下交割转让', '已托收', '移除异常票面', '其他', '取消'];
        ActionSheet.showActionSheetWithOptions({
                options: options,
                cancelButtonIndex: 5,
                maskClosable: true,
                wrapProps,
            },
            (buttonIndex) => {
                buttonIndex !== 5 && this.setState({
                    text: options[buttonIndex],
                    code: buttonIndex
                })
            }
        );
    }

    itemClick = () => {
        router.goBack();
    }

    reqMoveToHist = () =>{
        const {socket} = this.context;
        const {dispatch} = this.props;
        dispatch({
            type: 'position/reqMoveToHistory',
            payload: {
                socket: socket,
                params:{
                    historyItemJson: {
                        inventId: this.props.location.query.id,
                        reasonInfo: this.state.text,
                        status: this.state.code,
                        reasonDesc: ''
                    },
                    version: 1,
                    inventId: this.props.location.query.id
                }
            }
        });
    }

    handleRes = (res) => {
        if (res.messageCate === "MRMsgType.RPC" && res.messageName === "PhoneCompany.MoveTicketToHistory"){
            router.goBack();
            Toast.info(res.message, 3);
        }

    }

    render(){
        const user = this.props.userInfo;
        const goBack = <img className={styles.goback} src={images.ICON_BACK} alt="goBack" onClick={this.itemClick} />
        return(
            <div className={styles.page}>
                <NavBar icon={goBack}>移入历史持仓</NavBar>
                <List.Item className={styles.moveReason} extra={this.state.text} arrow="horizontal" onClick={this.showActionSheet}>移入原因</List.Item>
                <Item className={styles.item} title="交易员" content={user.name} />
                <Item className={styles.item} title="所在公司" content={user.companyName} />
                <TextareaItem
                    className={styles.inputText}
                    rows={5}
                    count={100}
                    placeholder="请填写移入历史持仓的原因"
                />
                <button className={styles.btn} onClick={this.reqMoveToHist}>提交</button>
                <Event event="svevent" handler={this.handleRes}/>
               
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userInfo: state.login.user,
    }
}
export default connect(mapStateToProps)(MoveToHist); 