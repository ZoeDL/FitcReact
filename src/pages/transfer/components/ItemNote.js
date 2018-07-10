/*
 * 票据清单 Item
 * @Author: Honye 
 * @Date: 2018-03-30 09:23:05 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-05-17 08:33:21
 */
import React from 'react';
import PropTypes from 'prop-types';
import convertUtil from '../../../utils/convertUtil';
import calckitUtils from '../../../utils/calckitUtils';
import styles from './ItemNote.less';

class ItemNote extends React.PureComponent {

    static propTypes = {
        data: PropTypes.object.isRequired,
        onInputChange: PropTypes.func
    }

    onInputChange = (e) => {
        const { onInputChange } = this.props;
        onInputChange && onInputChange(e);
    }

    render() {
        const { data } = this.props;
        const { paymentFullname, ticketPrice, restDays, issueDay, expireDay, bankType } = data;
        return (
            <div className={styles.dealWrap}>
                <div className={styles.top}>
                    <div className={ styles.tag } type={ bankType } >
                        <span>{ convertUtil.paymentTypeConvert(bankType) }</span>
                    </div>
                    <div>{ paymentFullname }</div>
                </div>
                <div className={styles.middle}>
                    <div>{ calckitUtils.formatTicketPrice(ticketPrice||0)}万</div>
                    <div>{ restDays }天到期</div>
                    <div className={ styles.yearRate }>
                        <input type="number" onChange={ this.onInputChange } />
                        <span>%</span>
                    </div>
                </div>
                <div className={styles.bottom}>
                    <div>出票日：{ issueDay }</div>
                    <div>到期日：{ expireDay }</div>
                </div>
            </div>
        )
    }
}

export default ItemNote;