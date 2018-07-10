/*
 * 添加票据-票据单元
 * @Author: Honye 
 * @Date: 2018-03-30 14:15:52 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-05-17 08:32:37
 */
import React from 'react';
import images from '../../../constants/Images';
import PropTypes from 'prop-types';
import convertUtil from '../../../utils/convertUtil';
import calckitUtil from '../../../utils/calckitUtils';
import styles from './ItemDeal.less';

class ItemDeal extends React.PureComponent {

    static propTypes = {
        onClick: PropTypes.func,  // 点击回调
        checked: PropTypes.any,  // 默认选中状态
    }

    static defaultProps = {
        checked: false
    }

    onItemClick = () => {
        const { onClick } = this.props;
        onClick && onClick()
    }

    render() {
        const { data, checked } = this.props;
        const { bankType, paymentFullname, ticketType, ticketPrice } = data;
        return (
            <div className={ styles.wrapper } onClick={ this.onItemClick }>
                <div className={ styles.checkbox }>
                    <img alt="icon" src={ checked?images.ICON_CHECKED:images.ICON_UNCHECKED } />
                </div>
                <div className={ styles.content }>
                    <div className={ styles.top }>
                        <span data-type={ bankType } >{ convertUtil.paymentTypeConvert(bankType) }</span>
                        <span className={styles.name}>{ paymentFullname }</span>
                    </div>
                    <div className={ styles.middle }>
                        <span className={ styles.ticketType } data-type={ ticketType } >{ convertUtil.ticketTypeConvert(ticketType) }</span>
                        <span>{ calckitUtil.formatTicketPrice(ticketPrice) + '万元'}</span>
                        <span>{ data.restDays }天到期</span>
                    </div>
                    <div className={ styles.bottom }>
                        <span>出票日：{ data.issueDay }</span>
                        <span>到期日：{ data.expireDay }</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default ItemDeal;