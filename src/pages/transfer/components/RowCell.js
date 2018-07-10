/*
 * @Author: Honye 
 * @Date: 2018-03-30 09:28:48 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-04-10 14:38:46
 */
'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import images from '../../../constants/Images';
import styles from './RowCell.less';

export default class RowCell extends React.PureComponent {

    static propTypes = {
        title: PropTypes.string.isRequired,
        extra: PropTypes.string,
        disabled: PropTypes.bool,
    }

    handleClick = (e) => {
        const { disabled, onClick } = this.props;
        !disabled && onClick && onClick(e)
    }

    render() {
        const { title, extra, disabled } = this.props;
        return (
            <div data-disabled={disabled} className={styles.rowCell} onClick={ this.handleClick }>
                <label>{ title }</label>
                <div>
                    <span>{ extra }</span>
                    <img alt="arrow" className={styles.arrow} src={images.ICON_SEL} />
                </div>
            </div>
        )
    }
}