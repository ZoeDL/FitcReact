/*
 * 电商买入 Item
 * @Author: Honye 
 * @Date: 2018-05-17 15:14:04 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-05-17 18:19:06
 */
import React from 'react';
import { Icon, Modal } from 'antd-mobile';
import PropTypes from 'prop-types';
import styles from './ItemEticket.less';

class ItemEticket extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            minDay: 3,
            maxDay: 366,
            temDays: {
                minDay: 3,
                maxDay: 366
            }
        }
    }

    onInputChange = (e) => {
        const { onRateChange } = this.props;
        onRateChange && onRateChange(e.target.value)
    }

    handleModalVisible = () => {
        const { showModal } = this.state;
        this.setState({
            showModal: !showModal
        })
    }

    handleDayChange = (key) => (e) => {
        const { temDays } = this.state;
        this.setState({
            temDays: {
                ...temDays,
                [key]: e.target.value
            }
        })
    }

    handleDaySure = () => {
        const { temDays } = this.state;
        const { onDaysChange } = this.props;
        this.setState({
            minDay: temDays.minDay,
            maxDay: temDays.maxDay,
            showModal: false
        })
        onDaysChange && onDaysChange(temDays.minDay, temDays.maxDay)
    }

    render() {
        const { data } = this.props;
        const { minDay, maxDay } = this.state;
        return (
            <div className={styles.wrapper}>
                <div className={styles.top}>
                    <span>{ data.code }</span>
                    <Icon type="right" />
                </div>
                <div className={styles.bottom}>
                    <div>
                        <span>剩余天数区间</span>
                        <span>买入年利率</span>
                    </div>
                    <div>
                        <div onClick={ this.handleModalVisible }>{`${minDay}<~<=${maxDay}`}</div>
                        <div>
                            <input type="number" maxLength={5} onChange={ this.onInputChange } />
                            <span>%</span>
                        </div>
                    </div>
                </div>
                <Modal
                    visible={this.state.showModal}
                    transparent
                    title="填写剩余天数区间"
                    footer={[
                        { text: '取消', onPress: this.handleModalVisible },
                        { text: '确定', onPress: this.handleDaySure }
                    ]}
                >
                    <div className={ styles.modalContent }>
                        <input type="number" defaultValue={ minDay } 
                            onChange={ this.handleDayChange('minDay') }
                        />
                        <span>{'<至<='}</span>
                        <input type="number" defaultValue={ maxDay } 
                            onChange={ this.handleDayChange('maxDay') }
                        />
                    </div>
                </Modal>
            </div>
        )
    }
}

ItemEticket.propTypes = {
    data: PropTypes.object.isRequired,
}

export default ItemEticket;