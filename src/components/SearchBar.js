/*
 * 搜索框
 * @Author: Honye 
 * @Date: 2018-04-11 10:48:21 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-04-11 11:15:54
 */
'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import images from '../constants/Images';
import styles from './SearchBar.less';

class SearchBar extends React.PureComponent {

    static propTypes = {
        onClick: PropTypes.func,
    }

    static defaultProps = {
        placeholder: '请输入关键字',
        onClick: (e) => {}
    }

    render() {
        const { onClick, className, ...restProps } = this.props;
        return (
            <div className={`${styles.searchBar} ${className}`} onClick={ onClick }>
                <img alt="icon" src={images.ICON_SEARCH} />
                <input {...restProps} />
            </div>
        )
    }
}

export default SearchBar;