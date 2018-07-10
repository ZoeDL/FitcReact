/*
 * 交易动态列表
 * @Author: Honye 
 * @Date: 2018-04-02 09:03:21 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-04-04 10:56:17
 */
'use strict';

import React from 'react';
import ItemDynamic from './ItemDynamic';

class TradeDynamic extends React.Component {

    static defaultProps = {
        data: []
    }

    render() {
        const { data } = this.props;
        return (
            <div>
            {
                data.map((item, index) => (
                    <ItemDynamic key={item.tradeId} data={ item } />
                ))
            }
            </div>
        )
    }
}

export default TradeDynamic;