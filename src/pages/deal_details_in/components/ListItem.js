'use strict';

import React from 'react';
import styles from './ListItem.less';

export default class ListItem extends React.PureComponent {
    render() {
        const { item } = this.props;
        return (
            <div className={styles.head}>
                <div >
                    {/* <div>承兑人类型</div> */}
                    <div>{item.payBankTypeCname}</div>
                </div>
                <div >
                    {/* <div>剩余天数区间</div> */}
                    <div>{this.displayRestDay()}</div>
                </div>
                <div >
                    {/* <div>买入利率（%）</div> */}
                    <div>{item.rate.toFixed(2)}</div>
                </div>
            </div>
        )
    }
    displayRestDay(){
        const {item} =this.props;
        if(item.startDay!==item.endDay){
            return `${item.startDay}~${item.endDay}`
        }else{
            return item.startDay
        }

    }
}

// className={styles.headCenter}