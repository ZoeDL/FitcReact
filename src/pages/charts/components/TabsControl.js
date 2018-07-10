import React from "react"
import styles from './TabsControl.less';

class TabsControl extends React.Component {
    check_title_index(index,currentIndex) {
        return index === currentIndex ? styles.subnavActive : styles.subnav
    }

    render() {
        const {tabs, onClick, currentIndex} = this.props;
        return (
            <div className={styles.nav}>
                {
                    tabs.map( (item, index) => {
                        return (
                            <div key={index} onClick={() => onClick(index,item)} className={this.check_title_index(index,currentIndex)}>{item.title}</div>
                        )
                    })
                }
            </div>
        )
    }
}

export default TabsControl;