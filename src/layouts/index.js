/*
 * @Author: Honye 
 * @Date: 2018-03-21 14:08:38 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-06-01 08:57:32
 */
import React from 'react';
import withRouter from 'umi/withRouter';
import Socket from '../socket/Socket';
import Config from '../constants/Config';
import styles from './index.less';

class Layout extends React.Component {

    render() {
        const { children } = this.props;
        return (
            <div className={styles.layout}>
                <Socket uri={ Config.socketUrl } options={ Config.socketOptions } >
                    { children }
                </Socket>
            </div>
        )
    }
}

export default withRouter(Layout);