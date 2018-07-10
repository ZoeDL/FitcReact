/*
 * 承兑人类型选择单元
 * @Author: Honye 
 * @Date: 2018-03-30 11:41:00 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-04-10 16:45:55
 */
'use strict';

import React from 'react';
import images from '../../../constants/Images';
import PropTypes from 'prop-types';
import styles from './ItemCheck.less';

class ItemCheck extends React.Component {

    static propTypes = {
        checked: PropTypes.bool,
        title: PropTypes.string.isRequired
    }

    static defaultProps = {
        checked: false
    }

    handleClick = (e) => {
        const { onClick } = this.props;
        onClick && onClick(e)
    }

    render() {
        const { checked, title } = this.props;
        return (
            <div className={ styles.wrapper } onClick={ this.handleClick }>
                <span>{ title }</span>
                { checked && <img alt="icon" src={ images.ICON_SELECTED } /> }
            </div>
        )
    }
}

export default ItemCheck;