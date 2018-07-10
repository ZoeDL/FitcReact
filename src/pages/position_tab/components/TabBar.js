/*
 * 含分段的标题栏
 * @Author: Honye 
 * @Date: 2018-06-01 09:45:29 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-06-01 14:31:26
 */
import React from 'react';
import { NavBar, SegmentedControl } from 'antd-mobile';
import styles from './TabBar.less';

class TabBar extends React.Component {

    handleChange = (e) => {
        const { tabBarProps } = this.props;
        const nextIndex = e.nativeEvent.selectedSegmentIndex;
        tabBarProps.goToTab(nextIndex);
    }

    render() {
        const { tabBarProps, ...restProps } = this.props;
        return (
            <NavBar className={styles.tabbar}
                {...restProps}
            >
                <SegmentedControl className={styles.segmented}
                    values={['电银', '电商']}
                    onChange={this.handleChange}
                />
             </NavBar>
        )
    }
}

export default TabBar;