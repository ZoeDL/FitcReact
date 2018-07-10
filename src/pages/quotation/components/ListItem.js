/*
 * @Author: Honye 
 * @Date: 2018-03-20 15:34:58 
 * @Last Modified by: zhangyuhao
 * @Last Modified time: 2018-05-15 16:22:13
 */
'use strict';

import React from 'react';
import styles from './ListItem.less';
import { Button } from 'antd-mobile';
import convertUtil from '../../../utils/convertUtil';
import DateUtil from '../../../utils/dateUtil';
import calckitUtils from '../../../utils/calckitUtils';
class ListItem extends React.PureComponent {

    onItemClick = (item) => {
        const { onClick } = this.props;
        onClick && onClick(item);
    }

    render() {
        const {item} =this.props;
        return (
            <div className={styles.itemWrapper} onClick={()=> this.onItemClick(item) }>
                <div className={ styles.top }>
                    <div className={styles.smallGroup}>
                        <Button 
                            className={styles.smallButton}
                            size="small" inline
                            >{item.ticketTypeDisplay}
                        </Button>
                        <Button 
                            className={styles.smallButton}
                            size="small" inline 
                            type="ghost">{this.displayPayment(item.paymentType)}
                        </Button>
                        <Button 
                            className={styles.smallButton}
                            size="small" inline 
                            type="ghost">{item.tradeTypeDisplay}
                        </Button>
                    </div>
                    <div className={convertUtil.getTradeStatusColor(item.tradeStatus)}>{item.stateDisplay}</div>
                </div>
                <div className={styles.middle}>
                    <div>
                        <div className={styles.middleTitle}>票面总额(万)</div>
                        <div>{this.calValue(item.ticketPrice)}</div>
                    </div>
                    <div>
                        <div className={styles.middleTitle}>剩余天数</div>
                        <div>{this.displayRestDay()}</div>
                    </div>
                    <div>
                        <div className={styles.middleTitle}>报价利率(%)</div>
                        <div>{item.level.toFixed(2)}</div>
                    </div>
                </div>
                <div className={styles.bottom}>
                    <div>发起时间：{DateUtil.format(new Date(item.createDate),'hh:mm:ss')}</div>
                    <div>交易编号：{item.inquiryNo}</div>
                </div>
            </div>
        )
    }
    calValue(ticketPrice){
        return calckitUtils.formatTicketPrice(ticketPrice)
    }
    displayPayment(value){
        if(value==='--'||value===''){
            return '混合';
        }else{
            return value
        }
    }
    displayRestDay(){
        const {item} =this.props;
        if(item.endOfDay!==item.startOfRestDay){
            return `${item.startOfRestDay}~${item.endOfDay}`
        }else{
            return item.startOfRestDay
        }

    }
}

export default ListItem;