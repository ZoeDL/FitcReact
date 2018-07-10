import React from 'react';
import styles from './note.less';
import utils from '../../position/services/utils';


class NoteInfo extends React.Component{
    render(){
        const platformMark = this.props.platformMark === 0? (
            <div className={styles.highlight}>{'--'}</div>
        ) : (
            <div className={styles.highlight}>{utils.platformMark(this.props.platformMark)}</div>
        )
        return(
            <div className={styles.container}>
                <div className={styles.amount}>
                    <div>票面金额(万)：</div>
                    <div className={styles.highlight}>{this.props.price}</div>
                </div>
                <div className={styles.date}>
                   <div className={styles.issue}>
                        <div className={styles.subtitle}>出票日</div>
                        <div className={styles.highlight}>{this.props.issueDate}</div>
                   </div>
                   <div className={styles.due}>
                        <div className={styles.subtitle}>到期日</div>
                        <div className={styles.highlight}>{this.props.expireDate}</div>
                   </div>
                   <div className={styles.leftDays}>
                        <div className={styles.subtitle}>剩余天数</div>
                        <div className={styles.highlight}>{this.props.restDays}</div>
                   </div>
                </div>
                <div className={styles.number}>
                   <div>票号</div>
                   <div className={styles.highlight} style={{ textAlign: 'right', width: '80%', wordBreak: 'break-all'}}>
                        {this.props.ticketNo}
                   </div>
                </div>
                <div className={styles.mark}>
                        <div>平台标记</div>
                        {platformMark}
                </div>
            </div>
        )
    }
}

export default NoteInfo;