/*
 * @Author: Honye 
 * @Date: 2018-03-31 11:18:52 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-03-31 15:10:35
 */
'use strict';

import React from 'react';
import images from '../../../constants/Images';
import PropTypes from 'prop-types';
import styles from './Accordion.less';

class Accordion extends React.Component {

    static propTypes = {
        header: PropTypes.string.isRequired,  // 分组头
    }

    constructor(props) {
        super(props);
        this.state = {
            showContent: false
        }
    }

    toggleShow = () => {
        const { showContent } = this.state;
        this.setState({ showContent: !showContent })
    }

    render() {
        const { header, children } = this.props,
              { showContent } = this.state;

        return (
            <div className={`${styles.accordionItem} ${showContent&&styles.active}`}>
                <div className={styles.accordionHeader} onClick={ this.toggleShow } >
                    <img className={showContent?styles.active:""} alt="icon" src={ images.IC_TRIANGLE_RIGHT }/>
                    <span>{ header || header()}</span>
                </div>
                <div className={`${styles.accordionContent} ${showContent&&styles.active}`}>
                    { children }
                </div>
            </div>
        )
    }
}

export default Accordion;