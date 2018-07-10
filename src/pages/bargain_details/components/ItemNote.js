/*
 * 票据清单 Item
 * @Author: Honye 
 * @Date: 2018-04-14 15:49:25 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-05-17 14:42:16
 */
import React from 'react';
import images from '../../../constants/Images';
import PropTypes from 'prop-types';
import calckitUtils from '../../../utils/calckitUtils';
import styles from './ItemNote.less';

class ItemNote extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            checked: props.checked || false
        }
    }

    onInputChange = (e) => {
        const { onRateChange } = this.props;
        onRateChange && onRateChange(e.target.value)
    }

    componentWillReceiveProps(nextProps) {
        if(!nextProps.editing) {
            this.input.value = nextProps.data.senderRate;
        }
        if(nextProps.checked !== this.props.checked) {
            this.setState({
                checked: nextProps.checked
            })
        }
    }

    changeCheck = () => {
        const { checked } = this.state;
        const { editing, disableCheck, onCheckChange } = this.props;
        if(!editing || disableCheck) {
            return;
        }
        this.setState(({ checked }) => ({
            checked: !checked
        }))
        onCheckChange && onCheckChange(!checked)
    }

    render() {
        const { data, editing } = this.props;
        const { checked } = this.state;
        return (
            <div className={ styles.wrapper }>
                <div className={ styles.top }>
                    <div>
                        <div>
                            <span className={ styles.tag }>{ data.payBankTypeCname }</span>
                        </div>
                        <span>{ data.payBankName }</span>
                    </div>
                    <img alt="icon"
                        src={ checked ? images.IC_CHECKED_GREEN : images.ICON_UNCHECKED } 
                        onClick={ this.changeCheck }
                    />
                </div>
                <div className={ styles.middle }>
                    <div>
                        <div className={ styles.subtitle }>票面总额(万)</div>
                        <div>{ calckitUtils.formatTicketPrice(data.ticketAmount||0) }</div>
                    </div>
                    <div>
                        <div className={ styles.subtitle }>对方报价(%)</div>
                        <div className={ styles.rate }>{ data.receiveRate }</div>
                    </div>
                    <div>
                        <div className={ styles.subtitle }>本方报价(%)</div>
                        <input 
                            ref={ (input) => this.input=input }
                            className={ styles.input } 
                            disabled={ !editing } 
                            defaultValue={ data.senderRate || '--' } 
                            onChange={ this.onInputChange }
                        />
                    </div>
                </div>
                <div className={ styles.bottom }>
                    <div>剩余天数：{ data.lixiDayNum }天</div>
                    <div>到期日：{ data.expireDay }</div>
                </div>
            </div>
        )
    }
}

ItemNote.propTypes = {
    data: PropTypes.object.isRequired,
    editing: PropTypes.bool,
    checked: PropTypes.bool,
    disableCheck: PropTypes.bool,  // 是否禁用 Check
    onRateChange: PropTypes.func,
    onCheckChange: PropTypes.func
}

ItemNote.defaultProps = {
    editing: false,  // 是否编辑状态
    checked: false,  // 是否选中
    disableCheck: false, 
}

export default ItemNote;