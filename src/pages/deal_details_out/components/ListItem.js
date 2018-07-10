/*
 * @Author: zhangyuhao 
 * @Date: 2018-03-20 15:34:58 
 * @Last Modified by: zhangyuhao
 * @Last Modified time: 2018-03-29 16:17:15
 */
'use strict';

import React from 'react';
import styles from './ListItem.less';
import { Button } from 'antd-mobile';
import Decimal from 'decimal.js/decimal';
class ListItem extends React.PureComponent {

    render() {
        const {item} =this.props;
        return (
            <div className={styles.itemWrapper} >
                <div className={ styles.top }>
                    <div className={styles.smallGroup}>        
                        <Button 
                            className={styles.smallButton}
                            size="small" inline 
                            type="ghost">{item.displayBankType}
                        </Button>          
                    </div>
                    <div className={styles.title}>{item.paymentFullname}</div>
                </div>
                <div className={styles.middle}>
                    <div>
                        <div className={styles.middleTitle}>票面总额(万)</div>
                        <div>{this.calValue(item.ticketPrice)}</div>
                    </div>
                    <div>
                        <div className={styles.middleTitle}>剩余天数</div>
                        <div>{item.restDays}</div>
                    </div>
                    <div>
                        <div className={styles.middleTitle}>报价利率(%)</div>
                        <div>{item.rate.toFixed(2)}</div>
                    </div>
                </div>
                <div className={styles.bottom}>
                    <div>出票日{item.issueDay}</div>
                    <div>到期日：{item.expireDay}</div>
                </div>
            </div>
        )
    }
    calValue(ticketPrice){
        let x=new Decimal(ticketPrice);
        let y=x.dividedBy(10000)
        return y+'';
    }
    // displayRestDay(){
    //     const {item} =this.props;
    //     if(item.endOfDay!==item.startOfRestDay){
    //         return `${item.startOfRestDay}~${item.endOfDay}`
    //     }else{
    //         return item.startOfRestDay
    //     }

    // }
}

export default ListItem;