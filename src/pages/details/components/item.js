import React from 'react';
import styles from './item.less';


class Item extends React.Component{
    render(){
        let show;
        switch(this.props.title){
            case '担保公司':
                show = this.props.content || '暂无担保公司';
                break;
            default:
                show = this.props.content || '--';
        }
    // const show = this.props.title !== '担保公司' ? 
    // (<div className={styles.highlight}>{this.props.content != null ? this.props.content : '--'}</div>) 
    // : (<div className={styles.highlight}>{ this.props.content != null ? this.props.content : '暂无' + this.props.title }</div >)
        return(
            <div className={styles.container}>
                <div>{this.props.title}</div>
                <div className={styles.highlight}>{show}</div>
            </div>
        )
    }
}

export default Item;