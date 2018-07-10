/*
 * @Author: Honye 
 * @Date: 2018-03-20 14:43:19 
 * @Last Modified by: zhangyuhao
 * @Last Modified time: 2018-03-26 14:23:17
 */
'use strict';

import React from 'react';
import  styles from './TopItem.less';
import convertUtil from '../../../utils/convertUtil';

class TopItem extends React.PureComponent {
   
    render() {
        const {item, onClick}=this.props;
        return (
            <div className={styles.itemWrapper} onClick={onClick}>
                <div className={styles.name}>{convertUtil.shiborConvert(item.bankType)}{convertUtil.tradeTypeConvert(item.tradeType)}</div>
                <div className={this.displayPriceStyle(item.updown,item.updownRate)}>{item.price.toFixed(2)}</div>
                <div className={this.displayBottomStyle(item.updown,item.updownRate)}>
                    <span className="num-small">{item.updown}BP</span>
                    <span className="num-small">-{item.updownRate.toFixed(2)}%</span>
                </div>
            </div>
        )
    }

    displayPriceStyle(updown ,updownRate ){
          if(updown === 0 || updownRate === 0){
            return styles.grayBig
          }else if(updown < 0 || updownRate < 0){
              return styles.greenBig;
          }else{
            return styles.redBig;
          }
    }
    displayBottomStyle(updown ,updownRate){
        if(updown === 0 || updownRate === 0){
            return styles.grayBottom
          }else if(updown < 0 || updownRate < 0){
              return styles.greenBottom;
          }else{
            return styles.redBottom;
          }
    }

}

export default TopItem;