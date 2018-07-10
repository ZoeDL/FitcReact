/*
 * 票据 Item
 * @Author: Honye 
 * @Date: 2018-04-26 16:48:54 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-04-26 18:21:20
 */
'use strict';

import React from 'react';
import convertUtil from '../../../utils/convertUtil';
import calckitUtils from '../../../utils/calckitUtils';
import styles from './ItemNote.less';

class ItemNote extends React.PureComponent {

    render() {
        const { data } = this.props;
        return (
            <div className={ styles.wrapper }>
                <div className={ styles.top }>
                    <div>
                        <span className={ styles.bankType }>{ convertUtil.paymentTypeConvert(data.payBankType) }</span>
                    </div>
                    <div>{ data.payBankName || '--' }</div>
                </div>
                <div className={ styles.bottom }>
                    <div>
                        <div>票面金额(万)</div>
                        <div>{ calckitUtils.formatTicketPrice(data.ticketAmount) }</div>
                    </div>
                    <div>
                        <div>剩余天数(天)</div>
                        <div>{ data.liveDate || '0' }</div>
                    </div>
                    <div>
                        <div>到期日</div>
                        <div>{ data.expireDate || '-' }</div>
                    </div>
                </div>
            </div>
        )
    }
}

ItemNote.defaultProps = {
    data: {}
}

export default ItemNote;