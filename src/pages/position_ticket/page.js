/*
 * 持仓-电商
 * @Author: Zoe 
 * @Date: 2018-05-16 18:50:21 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-06-01 15:25:02
 */
import React from 'react';
import InfoList from '../position/components/InfoList';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import withLogin from "../../components/withLogin";

class Ticket extends React.Component{
    
    render(){
        const { list } = this.props.ticket.inventList;
        return(
            <div>
                <InfoList data={list} type="1" from="current"/>
            </div>
        )
    }
}

Ticket.contextTypes = {
    socket: PropTypes.object.isRequired,
}

const withLoginComponent = withLogin()(Ticket);

const mapStateToProps = ({ ticket, login }) => ({
    ticket,
    isLogined: login.isLogined,
})

export default connect(mapStateToProps)(withLoginComponent);