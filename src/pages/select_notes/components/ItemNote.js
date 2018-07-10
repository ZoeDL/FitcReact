/*
 * @Author: Honye 
 * @Date: 2018-05-07 15:32:07 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-05-17 11:35:43
 */
import React from 'react';
import PropTypes from 'prop-types';
import convertUtil from '../../../utils/convertUtil';
import calckitUtil from '../../../utils/calckitUtils';
import images from '../../../constants/Images';
import styles from './ItemNote.less';

class ItemNote extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            checked: true,
            value: '--'
        }
    }

    onEndorseInfoClick = () => {
        const { data, onEndorseInfoClick } = this.props;
        onEndorseInfoClick && onEndorseInfoClick(data.endorseStatus);
    }

    onSelectChange = () => {
        const { data, onCheckChange } = this.props;
        if(data.endorseStatus==='01' && data.isSelected) {
            const { checked } = this.state;
            this.setState({
                checked: !checked,
                value: !checked ? '--' : ''
            }, () => {
                onCheckChange && onCheckChange(!checked)
            })
        }
    }

    onInputChange = (e) => {
        const { onInputChange } = this.props;
        const { value } = e.target;
        this.setState({
            value
        }, () => {
            onInputChange && onInputChange(value)
        })
    }

    render() {
        const { data } = this.props;
        const { checked, value } = this.state;
        return (
            <div className={ styles.wrapper }>
                <div onClick={ this.onSelectChange }>
                    <img alt="icon" src={
                        data.isSelected ?
                            data.endorseStatus==='01' ? 
                                checked ? images.IC_CHECKED_GREEN : images.IC_UNCHECKED_BIG
                            : data.endorseStatus==='03' ? images.IC_LOADING
                            : data.endorseStatus==='04' ? images.IC_WRONG : images.IC_WRONG
                        : images.IC_DISABLED
                    } />
                </div>
                <div className={ styles.content }>
                    <div>
                        <div>
                            <span className={ styles.paymentType }>{ convertUtil.paymentTypeConvert(data.payBankType)}</span>
                            <span>{ data.payBankName }</span>
                        </div>
                        <span className={ styles.tag } onClick={ this.onEndorseInfoClick }>背书信息</span>
                    </div>
                    <div>
                        <span className={ styles.type }>{ convertUtil.ticketTypeConvert(data.ticketType) }</span>
                        <span>{ calckitUtil.formatTicketPrice(data.ticketAmount || 0) }万元</span>
                        <span>{ data.liveDate }天到期</span>
                    </div>
                    <div>
                        <span>出票日：{ data.sellTicketDate }</span>
                        <span>到期日：{ data.expireDate }</span>
                    </div>
                    <div>
                        <span>备注：</span>
                        <input className={ styles.reason } 
                            placeholder="请告知拒收票据的理由"
                            value={ value }
                            onChange={ this.onInputChange }
                            disabled={ checked }
                        />
                    </div>
                </div>
            </div>
        )
    }
}

ItemNote.propTypes = {
    data: PropTypes.object.isRequired,
    onEndorseInfoClick: PropTypes.func,  // 背书信息按钮事件
    onCheckChange: PropTypes.func,
    onInputChange: PropTypes.func,
}

ItemNote.defaultProps = {
    data: {}
}

export default ItemNote;