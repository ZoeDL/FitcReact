import React from 'react';
import { List } from 'antd-mobile';
import styles from './DropDownMenu.less';
import images from '../../../constants/Images';

const Item = List.Item;

class DropDownMenu extends React.Component {

    render() {
        const {  data, show, selected, onItemClick, onMaskClick } = this.props;
        return (
            <div>
                <div className={show ? `${styles.menu} ${styles.menuActive}` : styles.menu}>
                    <List>
                        {
                            data.map((item, index) => (
                                <Item className="row-cell" 
                                    key={index} 
                                    onClick={() => onItemClick(index)} 
                                    extra={<img src={images.ICON_SELECTED} alt="icon" className={selected === index ? styles.iconSelected : styles.icon} />} 
                                >
                                    <span className={selected === index ? styles.selected : null} >{item.label}</span>
                                </Item>
                            ))
                        }
                    </List>
                </div>
                {show ? <div className={styles.menuMask} onClick={onMaskClick} ref={el => this.lv = el} /> : null}
            </div>
        )
    }
}

export default DropDownMenu;