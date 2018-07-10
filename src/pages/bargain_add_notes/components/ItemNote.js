/*
 * 票据清单 Item
 * @Author: Honye 
 * @Date: 2018-03-30 09:23:05 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-04-19 14:15:48
 */
'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import calckitUtils from '../../../utils/calckitUtils';
import styles from './ItemNote.less';

class ItemNote extends React.PureComponent {

    static propTypes = {
        // 基本信息
        data: PropTypes.object.isRequired,
        // 对方报价
        otherRate: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ]).isRequired,
        onInputChange: PropTypes.func
    }

    onInputChange = (e) => {
        const { onInputChange } = this.props;
        onInputChange && onInputChange(e);
    }

    render() {
        const { data, otherRate } = this.props;
        const { displayBankType, paymentFullname, ticketPrice, restDays, expireDay, rate } = data;
        return (
            <div className={styles.dealWrap}>
                <div className={styles.top}>
                    <div>{ displayBankType }</div>
                    <div>{ paymentFullname }</div>
                </div>
                <div className={styles.middle}>
                    <div>
                        <div>票面金额(万)</div>
                        <div>{ calckitUtils.formatTicketPrice(ticketPrice||0)}万</div>
                    </div>
                    <div>
                        <div>对方报价(%)</div>
                        <div>{ otherRate }</div>
                    </div>
                    <div>
                        <div>本方报价(%)</div>
                        <div className={ styles.yearRate }>
                            <input type="number" 
                                defaultValue={ rate }
                                onChange={ this.onInputChange } 
                            />
                            <span>%</span>
                        </div>
                    </div>
                </div>
                <div className={styles.bottom}>
                    <div>剩余天数：{ restDays }</div>
                    <div>到期日：{ expireDay }</div>
                </div>
            </div>
        )
    }
}

export default ItemNote;