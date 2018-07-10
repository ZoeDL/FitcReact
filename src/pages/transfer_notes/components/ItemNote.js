/*
 * 出票清单-票据清单 Item
 * @Author: Honye 
 * @Date: 2018-04-16 17:33:22 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-04-16 19:18:06
 */
'use strict';

import React from 'react';
import calckitUtils from '../../../utils/calckitUtils';
import PropTypes from 'prop-types';
import styles from './ItemNote.less';

class ItemNote extends React.PureComponent {

    render() {
        const { data } = this.props;
        return (
            <div className={ styles.wrapper }>
                <div className={ styles.top }>
                    <div>
                        <span className={ styles.tag }>{ data.payBankTypeCname }</span>
                    </div>
                    <div>{ data.payBankName }</div>
                </div>
                <div className={ styles.middle }>
                    <div className={ styles.numberWrap }>
                        <div>票面金额(万)</div>
                        <div>{ calckitUtils.formatTicketPrice(data.ticketAmount || 0) }</div>
                    </div>
                    <div className={ styles.numberWrap }>
                        <div>剩余天数</div>
                        <div>{ data.liveDate }</div>
                    </div>
                    <div className={ styles.numberWrap }>
                        <div>目标价(%)</div>
                        <div>{ data.targetRate }</div>
                    </div>
                </div>
                <div className={ styles.bottom }>
                    <div>
                        <span>出票日：</span>
                        <span>{ data.issueDate }</span>
                    </div>
                    <div>
                        <span>到期日：</span>
                        <span>{ data.expireDay }</span>
                    </div>
                </div>
            </div>
        )
    }
}

ItemNote.propTypes = {
    data: PropTypes.object.isRequired
}

export default ItemNote;