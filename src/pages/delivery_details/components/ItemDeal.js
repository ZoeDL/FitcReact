/*
 * 票据清单 Item
 * @Author: Honye 
 * @Date: 2018-04-02 19:09:43 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-05-14 11:20:33
 */
'use strict';

import React from 'react';
import PropTypes from "prop-types";
import images from '../../../constants/Images';
import calckitUtils from "../../../utils/calckitUtils";
import styles from './ItemDeal.less';

class ItemDeal extends React.PureComponent {

    static propTypes = {
        data: PropTypes.object.isRequired
    }

    static defaultProps = {
        data: {}
    }

    onClick = () => {
        const { onClick } = this.props;
        onClick && onClick();
    }

    render() {
        const { className, data } = this.props;
        return (
            <div className={`${styles.wrapper} ${className}`} onClick={ this.onClick }>
                <div className={styles.top}>
                    <div>
                        <span className={ styles.tags }>{ data.payBankTypeCname }</span>
                        <span>{ data.payBankName }</span>
                    </div>
                    <img className={ styles.icon } alt="icon" src={ data.isDeal ? images.IC_DONE : images.IC_NO } />
                </div>
                <div className={ styles.middle }>
                    <div>
                        <span>票面金额(万)</span>
                        <span>{ calckitUtils.formatTicketPrice(data.ticketAmount) }</span>
                    </div>
                    <div>
                        <span>成交价(万)</span>
                        <span>{ "--" === data.dealPrice ? "--" : calckitUtils.formatTicketPrice(data.dealPrice) }</span>
                    </div>
                    <div>
                        <span>成交利率(%)</span>
                        <span>{ data.dealRate }</span>
                    </div>
                </div>
                <div className={styles.bottom}>
                    <span>剩余天数：<span>{ data.liveDate }天</span></span>
                    <span>到期日：<span>{ data.expireDay }</span></span>
                </div>
            </div>
        )
    }
}

export default ItemDeal;