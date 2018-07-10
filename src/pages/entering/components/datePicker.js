import React from 'react';
import images from '../../../constants/Images';
import styles from './datePicker.less';

class MyPicker extends React.PureComponent {
 
    render() {
        const { extra, onClick, children, defaultValue, value } = this.props;
        return (
            <div className={styles.select} onClick={onClick} >
                {children}
                <div className={styles.rightContent}>
                    <div><span className={styles.extra}>{defaultValue || value || extra}</span></div>
                    <div><img src={images.ICON_SEL} alt="select" /></div>
                </div>
            </div>
        )
    }
}

export default MyPicker;