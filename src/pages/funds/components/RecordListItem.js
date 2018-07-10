import React from 'react';
import styles from './RecordListItem.less';
import { List } from 'antd-mobile';
import router from 'umi/router';

const Item = List.Item;

class RecordListItem extends React.Component {
    onItemClick = (item) => {
        router.push({
            pathname: '/funds_details',
            query:{item}
        })
    }
    render() {
        const {item} = this.props;
        return(
            <Item className="row-cell" onClick={() => this.onItemClick(item)} >
                <div className={styles.itemContainer}>
                    <div className={styles.flexbox}>
                        <div>{item.tradeTypeDesc}</div>
                        <div className={styles.annotation}>{item.content}</div>
                    </div>
                    <div className={styles.flexbox}>
                        <div>{item.amountChangeStr}</div>
                        <div className={styles.annotation}>{item.createDate}</div>
                    </div>
                </div>
            </Item>
        )
    }
}

export default RecordListItem;