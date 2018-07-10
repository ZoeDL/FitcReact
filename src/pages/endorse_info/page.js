/*
 * 背书信息
 * @Author: Honye 
 * @Date: 2018-05-08 16:08:17 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-05-08 18:15:02
 */
import React from 'react';
import { NavBar, Icon, Button } from 'antd-mobile';
import DatePicker from '../trade_history/components/DatePicker';
import ItemInfo from './components/ItemInfo';
import Event from '../../socket/Event';
import PropTypes from 'prop-types';
import router from 'umi/router';
import images from '../../constants/Images';
import { DeliveryName } from '../../constants/TopicName';
import { connect } from 'dva';
import dateUtil from '../../utils/dateUtil';
import styles from './page.less';

class EndorseInfo extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date(),
            endDate: new Date()
        }
    }

    componentDidMount() {
        this.queryEndorseInfo()
    }

    queryEndorseInfo = () => {
        const { dispatch } = this.props;
        const { socket } = this.context;
        const { id } = this.props.location.query;
        const { startDate, endDate } = this.state;
        dispatch({
            type: 'endorseInfo/reqEndorseInfo',
            payload: {
                socket,
                params: {
                    ticketId: id,
                    startDate: dateUtil.format(startDate, 'yyyy-MM-dd'),
                    endDate: dateUtil.format(dateUtil.addDay(endDate, 1), 'yyyy-MM-dd'),
                    version: 1
                }
            }
        })
    }

    onDateChange = (key) => (date) => {
        this.setState({
            [key]: date
        })
    }

    handleResponse = (response) => {
        const { dispatch } = this.props;
        switch(response.messageName) {
            case DeliveryName.EndorseInfo:  // 票据背书信息
                dispatch({
                    type: 'endorseInfo/resEndorseInfo',
                    payload: { response }
                })
                break;
            default:
                break;
        }
    }

    render() {
        const { startDate, endDate } = this.state;
        const { list } = this.props;
        return (
            <div className={`page-container ${styles.page}`}>
                <NavBar
                    icon={<Icon type="left" />}
                    onLeftClick={ router.goBack }
                >背书信息</NavBar>
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
                            <Button className={styles.button} onClick={ this.queryEndorseInfo }>查询</Button>
                        </div>
                    </div>
                    <div>
                    {
                        list.map((item, index) => (
                            <ItemInfo key={ item.endorseId } data={ item } />
                        ))
                    }
                    </div>
                </div>
                <Event event="svevent" handler={ this.handleResponse } />
            </div>
        )
    }
}

EndorseInfo.contextTypes = {
    socket: PropTypes.object.isRequired,
}

const mapStateToProps = ({ endorseInfo }) => ({
    list: endorseInfo.list
})

export default connect(mapStateToProps)(EndorseInfo);