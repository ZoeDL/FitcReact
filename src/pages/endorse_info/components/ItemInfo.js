/*
 * @Author: Honye 
 * @Date: 2018-05-08 16:31:29 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-05-08 18:12:54
 */
import React from 'react';
import PropTypes from 'prop-types';
import dateUtil from '../../../utils/dateUtil';
import styles from './ItemInfo.less';

class ItemInfo extends React.PureComponent {

    render() {
        const { data } = this.props;
        return (
            <div className={ styles.wrapper }>
                <div>
                    <span>被背书人</span>
                    <span>背书时间</span>
                </div>
                <div>
                    <span>{ data.endorseName }</span>
                    <span>{ dateUtil.format(new Date(data.endorseDate), 'yyyy-MM-dd') }</span>
                </div>
            </div>
        )
    }
}

ItemInfo.propTypes = {
    data: PropTypes.object.isRequired,
}

ItemInfo.defaultProps = {
    data: {}
}

export default ItemInfo;