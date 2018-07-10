/*
 * 买入票据清单 Item
 * @Author: Honye 
 * @Date: 2018-04-17 13:04:43 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-04-17 13:25:13
 */
'use strict';

import React from 'react';
import PropTypes from "prop-types";
import styles from './ItemNote.less';

class ItemNote extends React.PureComponent {

    render() {
        const { data } = this.props;
        return (
            <div className={ styles.wrapper }>
                <div>
                    <div>承兑人类型</div>
                    <div>剩余天数区间</div>
                    <div>买入年利率</div>
                </div>
                <div>
                    <div>{ data.bankTypeName }</div>
                    <div>{`${data.minDateRange}<~<=${data.maxDateRange}`}</div>
                    <div>{ data.rate }%</div>
                </div>
            </div>
        )
    }
}

ItemNote.propTypes = {
    data: PropTypes.object.isRequired
}
ItemNote.defaultProps = {
    data: {}
}

export default ItemNote;