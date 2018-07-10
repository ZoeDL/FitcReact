/*
 * 买入分类列表 Item
 * @Author: Honye 
 * @Date: 2018-04-18 19:16:12 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-04-19 14:22:07
 */
'use strict';

import React from 'react';
import ItemNote from './ItemNote';
import PropTypes from 'prop-types';
import images from '../../../constants/Images';
import styles from './ItemType.less';

class ItemType extends React.PureComponent {

    onInputChange = (item) => (e) => {
        const { onRateChange } = this.props;
        onRateChange && onRateChange(item.inventId, e.target.value)
    }

    render() {
        const { data, notes } = this.props;
        return (
            <div className={ styles.wrapper}>
                <div className={ styles.typeItem }>
                    <div className={ styles.bankType }>
                        <img alt="icon" src={ images.IC_TRIANGLE_DOWN } />
                        <span>{ data.bankTypeName }</span>
                    </div>
                    <div className={ styles.numbers }>
                        <div>
                            <div>剩余天数</div>
                            <div>{`${data.minDateRange}<~<=${data.maxDateRange}`}</div>
                        </div>
                        <div>
                            <div>对方报价(%)</div>
                            <div className={ styles.price }>{ data.rate }</div>
                        </div>
                        <div>
                            <div>本方报价(%)</div>
                            <div>--</div>
                        </div>
                    </div>
                </div>
                <div>
                {
                    notes.map((item, index) => (
                        <ItemNote key={ item.inventId } 
                            data={ item } 
                            otherRate={ data.rate }
                            onInputChange={ this.onInputChange(item) }
                        />
                    ))
                }
                </div>
            </div>
        )
    }
}

ItemType.propTypes = {
    data: PropTypes.object.isRequired,
    notes: PropTypes.array,
    onRateChange: PropTypes.func
}
ItemType.defaultProps = {
    notes: []
}

export default ItemType;