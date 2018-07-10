/*
 * 交易历史动态
 * @Author: Honye 
 * @Date: 2018-04-02 14:38:48 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-05-07 10:19:02
 */
import React from 'react';
import { NavBar, Icon, Button } from 'antd-mobile';
import ItemDynamic from '../dynamic/components/ItemDynamic';
import Event from '../../socket/Event';
import DatePicker from './components/DatePicker';
import router from 'umi/router';
import images from '../../constants/Images';
import { DynamicMVC } from '../../constants/TopicName';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import withLogin from '../../components/withLogin';
import styles from './page.less';

class TradeHistoryPage extends React.Component {

    static contextTypes = {
        socket: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
        }
    }

    goBack = () => {
        router.goBack()
    }

    componentDidMount() {
        this.queryHistory()
    }

    /** 查询历史动态 */
    queryHistory = () => {
        const { dispatch, startDate, endDate } = this.props;
        const { socket } = this.context;
        dispatch({
            type: 'tradeHistory/reqHistoryList',
            payload: {
                socket,
                params: {
                    startDate,
                    endDate,
                    pageNumber: 0,
                    pageSize: 50
                }
            }
        })
    }

    /**
     * 接收服务返回
     * @param {Object} response 服务返回
     */
    handleResponse = (response) => {
        const { dispatch } = this.props;
        switch (response.messageName) {
            case DynamicMVC.MSG_HISTORY:  // 历史动态
                dispatch({
                    type: 'tradeHistory/resHistoryList',
                    payload: { response }
                })
                break;
            default:
                break;
        }
    }

    /**
     * 改变日期
     * @param {String} key key of state
     */
    onDateChange = (key) => (date) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'tradeHistory/changeDate',
            payload: {
                key,
                date
            }
        })
    }

    render() {
        const { list, startDate, endDate } = this.props;
        return (
            <div className="page-container">
                <NavBar
                    icon={<Icon type="left" />}
                    onLeftClick={this.goBack}
                >交易历史动态</NavBar>
                <div>
                    <div className={styles.header}>
                        <div className={styles.dueDate}>
                            <div>
                                <span className={styles.tip}>开始日期</span>
                                <DatePicker
                                    title="开始日期"
                                    value={new Date(startDate)}
                                    onChange={ this.onDateChange('startDate') }
                                />
                            </div>
                            <div>
                                <img className={styles.icon} alt="icon" src={images.IC_BETWEEN} />
                            </div>
                            <div>
                                <span className={styles.tip}>结束日期</span>
                                <DatePicker
                                    title="结束日期"
                                    value={new Date(endDate)}
                                    onChange={ this.onDateChange('endDate') }
                                />
                            </div>
                        </div>
                        <div>
                            <Button className={styles.button} onClick={ this.queryHistory }>查询</Button>
                        </div>
                    </div>
                    <div>
                        {
                            list.map((item, index) => (
                                <ItemDynamic key={item.tradeId} data={item} />
                            ))
                        }
                    </div>
                </div>
                <Event event="svevent" handler={this.handleResponse} />
            </div>
        )
    }
}

const mapStateToProps = ({ tradeHistory }) => ({
    ...tradeHistory
})

const withLoginComponent = withLogin()(TradeHistoryPage);

export default connect(mapStateToProps)(withLoginComponent);