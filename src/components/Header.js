/*
 * 头部标题组件
 * @Author: Honye 
 * @Date: 2018-03-15 16:18:34 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-03-15 17:03:55
 */
'use strict';

import React from 'react';
import styles from './Header.css';

class Header extends React.PureComponent {

    render() {
        const { renderLeft, renderCenter, renderRight, title } = this.props;

        const left = renderLeft ? 
            typeof renderLeft === 'function' ? 
                renderLeft() 
                : renderLeft
            : <div>返回</div>;

        const center = renderCenter ? 
            typeof renderCenter === 'function' ? 
                renderCenter()
                : renderCenter
            : <div>{ title }</div>;

        const right = renderRight ?
            typeof renderRight === 'function' ?
                renderRight()
                : renderRight
            : <div>右侧</div>

        return (
            <div className={styles.navBarWrap}>
                <div className={styles.navBar}>
                    <div className={styles.left}>
                        { left }
                    </div>
                    <div className={styles.center}>
                        { center }
                    </div>
                    <div className={styles.right}>
                        { right }
                    </div>
                </div>
            </div>
        )
    }
}

export default Header;