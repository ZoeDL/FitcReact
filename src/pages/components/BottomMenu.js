/*
 * 交易底部菜单
 * @Author: Honye 
 * @Date: 2018-03-29 11:56:26 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-04-11 09:26:06
 */
'use strict';

import React from 'react';
import { Modal } from 'antd-mobile';
import images from '../../constants/Images';
import router from 'umi/router';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import styles from './BottomMenu.less';

class BottomMenu extends React.PureComponent {

    static propTypes = {
        visible: PropTypes.any.isRequired
    }

    onHidden = () => {
        const { onCancel } = this.props;
        onCancel && onCancel()
    }

    pushPage = routerName => () => {
        const { hasLogined } = this.props;
        hasLogined ? router.push(routerName) : router.push('/login')
    }

    render() {
        const { visible } = this.props;
        return (
            <Modal
                className={ styles.wrapper }
                popup
                visible={ visible }
                onClose={ this.onHidden }
                animationType="slide-up"
            >
                <div>
                    <div className={styles.actions}>
                        <div className={styles.btnWrap} onClick={ this.pushPage('/transfer?type=1') }>
                            <img alt="button" className={styles.btnIcon} src={images.ICON_COMSELL} />
                            <div>票据转让</div>
                        </div>
                        <div className={styles.btnWrap} onClick={ this.pushPage('/transfer?type=2') }>
                            <img alt="button" className={styles.btnIcon} src={images.ICON_COMPBUY} />
                            <div>票据买入</div>
                        </div>
                    </div>
                    <div className={styles.cancelWrap} onClick={ this.onHidden }>
                        <img alt="icon" src={ images.ICON_CANCEL } />
                    </div>
                </div>
            </Modal>
        )
    }
}

const mapStateToProps = ({ login }) => ({
    hasLogined: login.isLogined
})

export default connect(mapStateToProps)(BottomMenu);