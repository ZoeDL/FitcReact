/*
 * 日期选择器
 * @Author: Honye 
 * @Date: 2018-04-08 11:10:00 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-04-08 11:39:56
 */
'use strict';

import React from 'react';
import { DatePicker } from 'antd-mobile';
import dateUtils from '../../../utils/dateUtil';

const DateChildren = ({ extra, onClick, children }) => (
    <div onClick={onClick}>
        <span>{extra}</span>
    </div>
)

class MyDatePicker extends React.PureComponent {

    render() {
        const { title, value, onChange } = this.props;
        return (
            <DatePicker
                mode="date"
                title={ title }
                extra="请选择"
                format={(date) => dateUtils.format(date, 'yyyy/MM/dd')}
                value={ value }
                onChange={ onChange }
            >
                <DateChildren />
            </DatePicker>
        )
    }
}

export default MyDatePicker;