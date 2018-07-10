import React from 'react';
import images from '../../../constants/Images';
import styles from './select.less';

class Select extends React.Component {

    render() {
        return (
            <div className={styles.unit}>
                <div>{this.props.name}</div>
                <div className={styles.adjust} onClick={this.props.onClick}>
                    <div>{this.props.content || `请选择${this.props.name}`}</div>
                    <div><img src={images.ICON_SEL} alt="select" /></div>
                </div>
            </div>
        )
    }
}

export default Select;