/*
 * @Author: zhangyuhao 
 * @Date: 2018-03-26 11:30:26 
 * @Last Modified by: zhangyuhao
 * @Last Modified time: 2018-03-26 14:45:08
 * 成交逐笔的item
 */

'use strict';

import React from 'react';
import styles from './ListItem.less';
import { Button } from 'antd-mobile';
import convertUtil from '../../../utils/convertUtil';
import DateUtil from '../../../utils/dateUtil';

class HistoryListItem extends React.PureComponent {

    onItemClick = () => {
        const { onClick } = this.props;
        onClick && onClick();
    }

    render() {
        const {item} =this.props;
        return (
            <div className={styles.itemWrapper} onClick={ this.onItemClick }>
                <div className={ styles.top }>
                    <div className={styles.smallGroup}>
                        <Button 
                            className={styles.smallButton}
                            size="small" inline
                            >{convertUtil.ticketTypeConvert(item.ticketType)}
                        </Button>
                        <Button 
                            className={styles.smallButton}
                            size="small" inline 
                            type="ghost">{convertUtil.paymentTypeConvert(item.bankType)}
                        </Button>
                        <Button 
                            className={styles.smallButton}
                            size="small" inline 
                            type="ghost">{convertUtil.tradeModeConvert(item.tradeMode)}
                        </Button>
                    </div>
                    <div className={convertUtil.getTradeStatusColor('4')}>交易成功</div>
                </div>
                <div className={styles.middle}>
                    <div>
                        <div className={styles.middleTitle}>票面总额(万)</div>
                        <div>{item.ticketPrice/10000}</div>
                    </div>
                    <div>
                        <div className={styles.middleTitle}>剩余天数</div>
                        <div>{this.displayRestDay()}</div>
                    </div>
                    <div>
                        <div className={styles.middleTitle}>报价利率(%)</div>
                        <div>{item.dealRate.toFixed(2)}</div>
                    </div>
                </div>
                <div className={styles.bottom}>
                    <div>发起时间：{DateUtil.format(DateUtil.formatToDate(item.transferDate),'yyyy-MM-dd')}</div>
                    <div>交易编号：{item.inquriyNo}</div>
                </div>
            </div>
        )
    }
    displayRestDay(){
        const {item} =this.props;
        if(item.maxRestDay!==item.minRestDay){
            return `${item.minRestDay}~${item.maxRestDay}`
        }else{
            return item.minRestDay
        }

    }
}

export default HistoryListItem;