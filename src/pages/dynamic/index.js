/*
 * Tab 动态
 * @Author: Honye 
 * @Date: 2018-04-02 08:43:16 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-06-01 14:53:34
 */
import React from 'react';
import { Tabs } from 'antd-mobile';
import TabBar from './components/TabBar';
import TradeDynamicScreen from './components/TradeDynamic';
import { connect } from 'dva';
import withLogin from '../../components/withLogin';
import images from '../../constants/Images';

class DynaMicScreen extends React.Component {

    renderTabBar = (tabBarProps) => {
        return <TabBar tabBarProps={tabBarProps} icon={images.IC_HISTORY}/>
    }

    render() {
        const { todos, dynamics } = this.props;
        const tabs = [
            { title: '交易待办' , badge: todos.length },
            { title: '交易动态' },
        ];
        return (
            <div className="page-container">
                <Tabs tabs={ tabs }
                    renderTabBar={ this.renderTabBar }>
                    <TradeDynamicScreen data={ todos } />
                    <TradeDynamicScreen data={ dynamics } />
                </Tabs>
            </div>
        )
    }
}

const mapStateToProps = ({ dynamic, login }) => ({
    ...dynamic,
    isLogined: login.isLogined
})

const withLoginComponent = withLogin()(DynaMicScreen);

export default connect(mapStateToProps)(withLoginComponent);