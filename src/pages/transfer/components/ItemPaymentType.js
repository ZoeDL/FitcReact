/*
 * 承兑人类型
 * @Author: Honye 
 * @Date: 2018-03-30 10:29:42 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-05-17 19:57:11
 */
import React from 'react';
import { Modal } from 'antd-mobile';
import PropTypes from 'prop-types';
import styles from './ItemPaymentType.less';

export default class ItemPaymentType extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            minDay: props.data.restBeginDays || 3,
            maxDay: props.data.restEndDays || 366,
            temDays: {
                minDay: props.data.restBeginDays || 3,
                maxDay: props.data.restEndDays || 366
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
                    <div>承兑人类型</div>
                    <div>剩余天数区间</div>
                    <div>买入年利率</div>
                </div>
                <div className={styles.bottom}>
                    <div>{ data.label }</div>
                    <div onClick={ this.handleModalVisible }>{`${minDay}<~<=${maxDay}`}</div>
                    <div>
                        <input type="number" maxLength={5} onChange={ this.onInputChange } />
                        <span>%</span>
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

ItemPaymentType.propTypes = {
    data: PropTypes.object.isRequired,
    onRateChange: PropTypes.func,
    onDaysChange: PropTypes.func
}