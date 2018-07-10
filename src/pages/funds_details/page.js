import React from 'react';
import { List, NavBar, Icon } from 'antd-mobile';
import router from 'umi/router';
import styles from './page.less';
import {connect} from 'dva';

const Item = List.Item;

class FundsDetailsPage extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            item:this.props.location.query.item
        }
    }
    componentDidMount(){

    }
    goBack = () => {
        router.goBack();
    }
    render() {
        const {item} = this.state;
        const {fundsIn} = this.props;
        const {defaultaccount} = fundsIn;
        return (
            <div>
                <NavBar
                    icon={<Icon type="left" />}
                    onLeftClick={this.goBack}
                >资金明细</NavBar>
                <List>
                    <Item className="row-cell">
                        <div className={styles.item}>
                            <div className={styles.itemLeft}>
                                <div>{item.tradeTypeDesc}</div>
                                <div className={styles.em}>{item.content}</div>
                            </div>
                            <div className={`${styles.itemLeft} ${styles.alignRight}`}>
                                <div>{item.amountChangeStr}</div>
                                <div className={styles.em}>{item.createDate}</div>
                            </div>
                        </div>
                    </Item>
                    <Item className="row-cell">
                        <div className={styles.item}>
                            <div className={styles.itemLeft}>交易编号</div>
                            <div className={styles.itemRight}>{item.tradeNo}</div>
                        </div>
                    </Item>
                    <Item className="row-cell">
                        <div className={styles.item}>
                            <div className={styles.itemLeft}>开户行名称</div>
                            <div className={styles.itemRight}>{defaultaccount.openAccountFullName}</div>
                        </div>
                    </Item>
                    <Item className="row-cell">
                        <div className={styles.item}>
                            <div className={styles.itemLeft}>账户</div>
                            <div className={styles.itemRight}>{defaultaccount.accountNum}</div>
                        </div>
                    </Item>
                </List>
                <div>
                    <Item className={styles.noteLabel}>
                        <span className={styles.noteTip}>备注</span>
                    </Item>
                </div>
                <div>
                    <Item className="row-cell">
                        <div className={styles.noteContent}>{item.mark}</div>
                    </Item>
                </div>
            </div>         
        );
    }
} 
const mapStateToProps = ({login, funds,fundsIn}) => ({
    login,
    funds,
    fundsIn
})
export default connect(mapStateToProps)(FundsDetailsPage);