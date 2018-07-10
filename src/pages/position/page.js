/*
 * 持仓-电银
 * @Author: zexi 
 * @Date: 2018-03-21 15:30 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-06-01 15:26:08
 */
import React from 'react';
import InfoList from './components/InfoList';
import PropTypes from 'prop-types'; 
import { connect } from 'dva';
import withLogin from "../../components/withLogin";

class QuotationPage extends React.Component {

    render() {
        const {position} = this.props;
        return (
            <div>
                <InfoList data={position.inventList.list} type="0" from="current"/>
            </div>
        )
    }
}

QuotationPage.contextTypes = {
    socket: PropTypes.object.isRequired,
}

const withLoginComponent = withLogin()(QuotationPage);

const mapStateToProps = ({ position, login }) => ({
    position,
    isLogined: login.isLogined,
})

export default connect(mapStateToProps)(withLoginComponent);