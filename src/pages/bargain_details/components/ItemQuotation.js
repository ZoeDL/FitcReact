/*
 * 报价 Item
 * @Author: Honye 
 * @Date: 2018-04-14 11:56:00 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-04-17 15:46:33
 */
'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import images from '../../../constants/Images';
import dateUtil from '../../../utils/dateUtil';
import calckitUtils from '../../../utils/calckitUtils';
import styles from "./ItemQuotation.less";

class ItemQuotation extends React.PureComponent {

    onBtnClick = () => {
        console.log('//TODO 按钮点击')
    }

    onItemClick = () => {
        const { onClick } = this.props;
        onClick && onClick()
    }

    render() {
        const { data } = this.props;
        return (
            <div className={ styles.wrapper } onClick={ this.onItemClick }>
                <div className={ styles.title }>
                    <div className={ styles.company }>
                        <img alt="icon" src={ images.IC_COMPANY } />
                        <span>{ data.bankName }</span>
                    </div>
                    <div className={ styles.time }>{ dateUtil.format(new Date(data.timestamp), 'hh:mm:ss') }</div>
                </div>
                <div className={ styles.content }>
                    <div className={ styles.topBottom }>
                        <div>加权年利率(%)</div>
                        <div>{ data.receiveRate }</div>
                    </div>
                    <div className={ styles.topBottom }>
                        <div>选中票面总额(万)</div>
                        <div>{ calckitUtils.formatTicketPrice(data.reportAmount||0) }</div>
                    </div>
                    <div className={ styles.button } onClick={ this.onBtnClick }>{ data.status }</div>
                </div>
            </div>
        )
    }
}

ItemQuotation.propTypes = {
    data: PropTypes.object.isRequired,
    onClick: PropTypes.func
}

export default ItemQuotation;