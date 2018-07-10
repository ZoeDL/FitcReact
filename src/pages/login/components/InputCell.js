/*
 * 输入框
 * @Author: Honye 
 * @Date: 2018-03-19 09:58:06 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-06-01 14:38:13
 */
import React from 'react';
import styles from './InputCell.css';

class InputCell extends React.PureComponent {

    render() {
        const { labelIcon, placeholder, type, maxLength, onChange } = this.props;
        return (
            <div className={styles.inputCell}>
                <div className={styles.labelIcon} style={{ backgroundImage: `url(${ labelIcon })` }} />
                <input className={styles.input} placeholder={ placeholder } 
                    maxLength={maxLength || 16}
                    type={ type || 'text' }
                    onChange={ onChange && onChange }
                    autoComplete="on"
                />
            </div>
        )
    }
}

export default InputCell;