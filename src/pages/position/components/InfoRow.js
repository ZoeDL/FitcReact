/*
 * @Author: Zoe
 * @Date: 2018-03-20 14:43:19 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-04-20 09:08:36
 */

import React from 'react';
import { Button, SwipeAction, Toast, Modal } from 'antd-mobile';
import styles from './InfoRow.less';
import calckitUtil from '../../../utils/calckitUtils';
import images from '../../../constants/Images';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import router from 'umi/router';

class InfoRow extends React.PureComponent {
    onItemClick = () => {
        const {onClick} = this.props;
        onClick && onClick()
    }
    render() {
        const {data, type} = this.props;
        let platformMark;
        switch(data.platformMark){
            case 11:
                platformMark = "重复票据";
                break;
            case 12:    
                platformMark = "异议冻结";
                break; 
            case 13:    
                platformMark = "信息不完整";
                break; 
            case 14:    
                platformMark = "信息错误";
                break; 
            case 15:    
                platformMark = "图片不合格";
                break; 
            case 16:    
                platformMark = "其他";
                break; 
            case 17:    
                platformMark = "修改审核";
                break; 
            default:
                break;
        }

        let footer;
        if (data.moveDate)
          footer =  ( <div className={styles.botomItem}>
                        <div className={styles.date}>
                            移入历史时间: {data.moveDate}
                        </div>
                    </div>)

        else  footer =  (<div className={styles.botomItem}>
                            <div className={styles.date}>
                                出票日: {data.issueDay}
                            </div>
                            <div className={styles.date}>
                                到期日: {data.expireDay}
                            </div>
                        </div>)

        let ticketType; 
        let noteType; 
        let btnStyle;
        let tagStyle;
        if (type === "0"){
            ticketType = data.displayBankType || data.payBankTypeCname;
            noteType = '电银';
            btnStyle = { color: '#44F036', border: '#44F036 1px solid'}
            tagStyle = { color: '#2787B6', fontWeight: 'bold' }
        }else if(type === "1"){
            ticketType = '商票';
            noteType = '电商';
            btnStyle = { color: '#F0364F', border: '#F0364F 1px solid' };
            tagStyle = { color: '#F0364F', fontWeight: 'bold'}
        }
        
        
        return (
            <div onClick={this.onItemClick}>
                <div className={styles.topItem}>
                    <div className={styles.stock}>
                        <Button className={styles.btn1} style={btnStyle} type="ghost" size="small" inline>
                            {ticketType}
                        </Button>
                        <div className={styles.text}>{data.paymentFullname}</div>
                    </div>
                    {
                        platformMark && 
                        <Button className={styles.btn2} type="ghost" size="small" inline>
                            {platformMark}
                        </Button>
                    }
                    
                        {/* 若验证则显示验证标签 */}
                        { data.checkStatus === '02' &&
                            <div><img className={styles.status} src={images.CHECKED_STATUS} alt="已验证" /></div>
                        }
                </div>
                <div className={styles.eCash}>
                    <div className={styles.info}>
                        <div className={styles.item} style={ tagStyle }>{noteType}</div>
                        {/* 规范化 */}
                        <div className={styles.item}>{calckitUtil.formatTicketPrice(data.ticketPrice)} 万元</div>
                        <div className={styles.item}>{ data.restDays } 天到期</div>
                    </div>
                    <div className={styles.logo}>
                    {data.inventStatus && data.inventStatus.substring(0, 3) === 'A02' &&
                            <img src={images.ICON_LOCK} 
                                style={{ width: '1.4em', height: '1.4em'}} alt="lock" />
                        }
                    </div>    
                </div>
                  
                {footer}
                 
                    
              
           </div>
           
        )
    }
}

class SwipeItem extends React.Component{
    static contextTypes = {
        socket: PropTypes.object.isRequired,
    }

    enterHistPage = (id) => {
        const {position} = this.props;
        if (position.authStatus && this.props.data.inventStatus.substring(0, 3) !== "A02"){
            router.push({
                pathname: '/move_to_history',
                query: {
                    id: id
                }
            })
        }else {Toast.info('票据已锁定', 2)}
    }
    
   
    reqRetrive = () => {
        const {socket} = this.context;
        const { position, dispatch, data } = this.props;
        if (position.authStatus){
            dispatch({
                type: 'position/reqRetrive',
                payload:{
                    socket: socket,
                    params:{
                       inventId: data.inventId
                    }
                }
            })
        }
    }
   
    showAlert = () => {
        const alert = Modal.alert;
        alert(
            '您确定要恢复现有持仓？','',
            [
                { text: '取消', onPress:() => console.log('cancel') },
                { text: '确定', onPress: this.reqRetrive }
            ]
        );
    }

    render(){
        const mode = this.props.data.moveDate === undefined?
                    {  text: '删除', 
                       onPress: () => { this.enterHistPage(this.props.data.inventId) },
                       style: { width: '6em', backgroundColor: 'red', color: 'white' }
                    }:{
                       text: '恢复',
                       onPress:  this.showAlert,
                       style: { width: '6em', backgroundColor: 'steelblue', color: 'white' }
                    }
        return(
            <SwipeAction
                className={styles.container}
                autoClose
                right={[mode]}
            >
              {/* 将InfoList的传给它的参数全部传给InfoRow */}
                <InfoRow {...this.props} /> 
            </SwipeAction>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        position: state.position
    }
}

export default connect(mapStateToProps)(SwipeItem);