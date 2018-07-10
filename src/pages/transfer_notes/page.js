/*
 * 出票清单
 * @Author: Honye 
 * @Date: 2018-04-16 16:50:57 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-04-16 19:11:19
 */
'use strict';

import React from 'react';
import { NavBar, Icon } from 'antd-mobile';
import ItemNote from './components/ItemNote';
import router from 'umi/router';
import images from "../../constants/Images";
import { connect } from "dva";
import calckitUtils from '../../utils/calckitUtils';
import styles from './page.less';

class TransferNotes extends React.PureComponent {

    render() {
        const { details } = this.props;
        return (
            <div className="page-container">
                <NavBar
                    icon={<Icon type="left" />}
                    onLeftClick={router.goBack}
                >出票清单</NavBar>
                <div>
                    <div className={styles.header}>
                        <div className={styles.person}>
                            <img className={styles.icon} alt="icon" src={images.IC_SILVER} />
                            <div>
                                <span className={styles.tagsPaymentType}>{ details.paymentType }</span>
                                <span className={styles.tagsPaymentType}>转让</span>
                                <span>{ `${details.deliveryMode}(${details.deliveryDate})` }</span>
                            </div>
                        </div>
                        <div className={styles.number}>
                            <div>
                                <span>出票总金额(万)</span>
                                <span>{ calckitUtils.formatTicketPrice(details.amount||0) }</span>
                            </div>
                            <div>
                                <span>出票总数(张)</span>
                                <span>{ details.count }</span>
                            </div>
                            <div>
                                <span>加权年利率(%)</span>
                                <span>{ details.rate }</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={ styles.subtitle }>票据清单</div>
                        <div>
                        {
                            details.list.map((item, index) => (
                                <ItemNote key={ item.inventId } data={ item } />
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
    details: transferSender.details
})

export default connect(mapStateToProps)(TransferNotes);