/*
 * 买入清单
 * @Author: Honye 
 * @Date: 2018-04-17 11:41:49 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-04-17 13:27:23
 */
'use strict';

import React from 'react';
import { NavBar, Icon } from "antd-mobile";
import ItemNote from './components/ItemNote';
import router from "umi/router";
import { connect } from "dva";
import calckitUtils from '../../utils/calckitUtils';
import styles from './page.less';

class BuyNotes extends React.PureComponent {

    render() {
        const { details, list } = this.props;
        return (
            <div className="page-container">
                <NavBar
                    icon={<Icon type="left" />}
                    onLeftClick={ router.goBack }
                >买入清单</NavBar>
                <div>
                    <div className={ styles.header }>
                        <div>买入总金额(万)</div>
                        <div>{ calckitUtils.formatTicketPrice(details.amount) }</div>
                    </div>
                    <div>
                        <div className={ styles.subtitle }>买入清单</div>
                        <div>
                        {
                            list.map((item, index) => (
                                <ItemNote key={ index } data={ item } />
                            ))
                        }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ transferSender }) => ({
    details: transferSender.details,
    list: transferSender.details.targetList
})

export default connect(mapStateToProps)(BuyNotes);