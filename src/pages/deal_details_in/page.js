/*
 * 交易详情（买）
 * @Author: Honye 
 * @Date: 2018-03-22 16:37:07 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-05-04 09:04:37
 */
'use strict';

import React from 'react';
import PropTypes from 'prop-types'
import { NavBar, Icon, Button } from 'antd-mobile';
import router from 'umi/router';
import styles from './page.less';
import { connect } from 'dva';
import Decimal from 'decimal.js/decimal';
import Event from '../../socket/Event';
import { MarketMsgName } from '../../constants/TopicName';
import ListItem from './components/ListItem';

class DealInDetails extends React.PureComponent {
    static contextTypes = {
        socket: PropTypes.object.isRequired,
    }
    constructor(props) {
        super(props);
        this.state = {
            item:this.props.location.query.item
        }
    }
    goBack = () => {
        router.goBack();
    }

    componentDidMount(){
        this.loadData();

    }
   
    loadData(){
        const {dispatch, login } = this.props;
        let isLogined = login.isLogined;
        let inquiryId=this.state.item.inquiryId;
        const { socket } = this.context;
        dispatch({//
            type: 'quotation/dynamicItemDetail',
            payload: { socket, isLogined, inquiryId }
        });
    }

    calValue(){
        let x=new Decimal(this.state.item.ticketPrice);
        let y=x.dividedBy(10000)
        return y+'';
    }
    displayRestDay(){
        if(this.state.item.endOfDay!==this.state.item.startOfRestDay){
            return `${this.state.item.startOfRestDay}~${this.state.item.endOfDay}`
        }else{
            return this.state.item.startOfRestDay
        }
    }
    render() {
        return (
            <div className="page-container">
             <Event event="svevent" handler={this.handleResponse}/>
                <NavBar
                    icon={ <Icon type="left" /> }
                    onLeftClick={ this.goBack }
                    >交易请求详情
                </NavBar>
                <div className={styles.head}>
                     <div className={ styles.headLeft }>
                        <div>买入总额（万）</div>
                        <div>{this.calValue()}</div>
                     </div>
                     <div className={ styles.headCenter }>
                        <div>剩余天数</div>
                        <div>{this.displayRestDay()}</div>
                     </div>
                     <div className={ styles.headRight }>
                        <div>意向利率（%）</div>
                        <div>{this.state.item.level.toFixed(2)}</div>
                     </div>
                </div>
                <div className={ styles.listTitle }>买入票据列表</div>
                <div className={styles.head}>
                    <div className={ styles.headLeft }>
                        <div>承兑人类型</div>
                        {/* <div>国股</div> */}
                    </div>
                    <div className={ styles.headCenter }>
                        <div>剩余天数区间</div>
                        {/* <div>1~366</div> */}
                    </div>
                    <div className={ styles.headRight }>
                        <div>买入利率（%）</div>
                        {/* <div>3.00</div> */}
                    </div>
                </div>
                {this.renderTicketList()}
               
            </div>
        )
    }

    //买入列表展示
    renderTicketList(){
        const{quotation}=this.props;
        if(quotation.dynamicDetailData&&quotation.dynamicDetailData.requirments){

            return <div >
                {
                    quotation.dynamicDetailData.requirments.map((item, index) => (
                        <ListItem key={index} item={item} />
                    ))
                }
                 <Button  className={ this.checkCanClick()?styles.buttonDefault:styles.buttonDisable }  activeClassName={styles.buttonFocus} disabled={!this.checkCanClick()} onClick={this.onBtnClick}>意向转让</Button>
            </div>
        }
    }

    onBtnClick=()=>{
        const { isLogined } = this.props.login;
        if(isLogined){
            // 买入接收方加票
            router.replace({
                pathname: '/bargain_add_notes',
                query: {
                    tradeId:this.state.item.inquiryId,
                    type: 'buy',
                    isReceiver: 'true'
                }
            })
        }else{
            router.push('/login')
        }
    }

    //判断是否可以点击
    checkCanClick(){
        const{quotation}=this.props;
        if(quotation.dynamicDetailData.canOperate===1&&quotation.dynamicDetailData.canInStaus===0){
            return true;
        }else if(quotation.dynamicDetailData.canOperate===0&&quotation.dynamicDetailData.canInStaus===1){
            return true;
        }else{
            return false;
        }
    }

    // 接收服务端
    handleResponse = (response) => {
        const { dispatch } = this.props;
        if (response.messageName === MarketMsgName.DYNAMIC_DETAIL) {//今日请求逐笔
            dispatch({
                type: 'quotation/dynamicDetailFinish',
                payload: response,
            })
        } 
    }
}
const mapStateToProps = ({ login, quotation }) => ({
    login,
    quotation
})

export default connect(mapStateToProps)(DealInDetails);
