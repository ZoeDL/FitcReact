/*
 * 持仓
 * @Author: Zoe 
 * @Date: 2018-06-01 15:56:22 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-06-01 15:56:42
 */
import React from 'react';
import TabBar from './components/TabBar';
import Eticket from '../position/page';
import Ticket from '../position_ticket/page';
import { Tabs, Icon } from 'antd-mobile';
import images from '../../constants/Images';
import router from 'umi/router';
import { connect } from 'dva';
import convertUtil from '../../utils/convertUtil';

class Tab extends React.Component {

    state = {
        ticketType: 'ETICKET',
    }

    //录入 
    enterInfo = () => {
        const { dispatch } = this.props;
        let promise = new Promise((resolve) => {
            //清空录入列表信息
            dispatch({
                type: 'entering/clearOriginalData',
            })
            //清空发票信息
            dispatch({
                type: 'entering/clearInvoiceData'
            })
            resolve();
        })
        promise.then(() => {
            dispatch({
                type: 'entering/ticketTypeChange',
                payload: {
                    ticketType: this.state.ticketType,
                }
            })
        })
        router.push('/entering');
    }

    toHistory = () => router.push('/history_tab')

    renderTabBar = (props) => {
        return (
            <TabBar
                tabBarProps={props}
                icon={<img alt="icon" src={images.IC_HISTORY} />}
                onLeftClick={this.toHistory}
                rightContent={[
                    <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
                    <img key="1" src={images.ICON_ADD} alt="add" onClick={this.enterInfo} />
                ]}
            />
        )
    }

    //tab变化
    onTabsChange = (tab, index) => {
        this.setState({
            ticketType: convertUtil.ticketTypeTextConvert(tab.title)
        })
    }

    render() {
        const tabs = [{ title: '电银' }, { title: '电商' }];
        return (
            <div className={`page-container`}>
                <Tabs tabs={tabs}
                    initalPage={0}
                    swipeable={false}
                    renderTabBar={this.renderTabBar}
                    onChange={this.onTabsChange}
                >
                    <Eticket />
                    <Ticket />
                </Tabs>
            </div>
        )
    }
}

const mapStateToProps = ({ position, login }) => ({
    position,
    isLogined: login.isLogined,
})

export default connect(mapStateToProps)(Tab); 