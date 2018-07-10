/**
 * 历史持仓
 */
import React from 'react';
import { Icon } from 'antd-mobile';
import TabBar from '../position_tab/components/TabBar';
import Eticket from '../history/page';
import Ticket from '../history_ticket/page';
import { Tabs } from 'antd-mobile';
import { connect } from 'dva';
import withLogin from '../../components/withLogin';
import router from 'umi/router';
import styles from './page.less';

class Tab extends React.Component {

    renderTabBar = (props) => (
        <TabBar 
            tabBarProps={props} 
            icon={<Icon type="left" />}
            onLeftClick={router.goBack}
        />
    )

    render() {
        const tabs = [{ title: '电银' }, { title: '电商' }];
        return (
            <div className={styles.page}>
                <Tabs tabs={tabs}
                    initalPage={0}
                    swipeable={false}
                    renderTabBar={this.renderTabBar}
                >
                    <Eticket />
                    <Ticket />
                </Tabs>
            </div>
        )
    }
}

const withLoginComponent = withLogin()(Tab);

const mapStateToProps = ({ login }) => ({
    isLogined: login.isLogined,
})

export default connect(mapStateToProps)(withLoginComponent); 