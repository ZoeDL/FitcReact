import React from 'react';
import ReactDOM from 'react-dom';
import { List, NavBar, Icon } from 'antd-mobile';
import styles from './page.less';
import router from 'umi/router';
import {CompanyAuthMsgName} from '../../constants/TopicName';
import {connect} from 'dva';
import Event from '../../socket/Event';
import PropTypes from 'prop-types';
import {getImage} from '../../constants/Config';
import images from '../../constants/Images';

const Item = List.Item;
const Brief = Item.Brief;

class CompanyPage extends React.Component {
    static contextTypes = {
        socket: PropTypes.object.isRequired,
    }

    goBack = () => {
        router.goBack();
    }

    goCompanyAuth = () => {
        router.push('/company_auth')
    }

    componentDidMount(){
        const { socket } = this.context;
        const { dispatch } = this.props;
        dispatch({
            type: 'company/reqCompany',
            payload: { socket }
        })
    }

    onBindState = (code) => {
        if (code === '0') {
            return '成功'
        }else if (code === '2') {
            return '审核中'
        }else if (code ==='3') {
            return '审核失败'
        }
    }

    onImgError = () => {
        ReactDOM.findDOMNode(this.defaultImage).src = images.YAY;
    }

    /**
     * 接收服务返回
     * @param {Object} response 服务返回
     */
    handleResponse = (response) => {
        const { dispatch } = this.props;
        if (response.messageName === CompanyAuthMsgName.CompanyAuth) {
            dispatch({
                type: 'company/resCompany',
                payload: {response} 
            })
        }
    }

    render() {
        const {company} = this.props;
        const imageurl = getImage(company.businessLicurl);
        return(
            <div className='page-container' >
                <Event event="svevent" handler={this.handleResponse} />
                <NavBar
                    icon={<Icon type="left" />}
                    onLeftClick={this.goBack}
                    // rightContent={
                    //     <span onClick={this.goCompanyAuth} >填写认证信息</span>
                    // }
                >公司资料认证</NavBar>
                <List className={styles.infoList}>
                    <Item className="row-cell" >
                        <div className={styles.item}>
                            <div className={styles.itemLeft}>公司名称</div>
                            <div className={styles.itemRight}>{company.name}</div>
                        </div>
                    </Item>
                    <Item className="row-cell" >
                        <div className={styles.item}>
                            <div className={styles.itemLeft}>法人</div>
                            <div className={styles.itemRight}>{company.legalPerson}</div>
                        </div>
                    </Item>
                    <Item className="row-cell" >
                        <div className={styles.item}>
                            <div className={styles.itemLeft}>公司所在地</div>
                            <div className={styles.itemRight}>{company.province}{company.city}</div>
                        </div>
                    </Item>
                    <Item className="row-cell" >
                        <div className={styles.item}>
                            <div className={styles.itemLeft}>联系地址</div>
                            <div className={styles.itemRight}>{company.address}</div>
                        </div>
                    </Item>
                    <Item className="row-cell" >
                        <div className={styles.item}>
                            <div className={styles.itemLeft}>认证状态</div>
                            <div className={styles.itemRight}>{this.onBindState(company.statusCode)}</div>
                        </div>
                    </Item>
                </List>
                <List>
                    <Item className="row-cell" >
                        营业执照
                        <Brief>
                            <div className={styles.imgContainer} >
                                <img src={imageurl} alt="营业执照" onError={this.onImgError} ref={el => this.defaultImage = el} />
                            </div>
                        </Brief>
                    </Item>
                </List>
            </div>
        )
    }
}

const mapStateToProps = ({ company }) => ({
    company
}) 

export default connect(mapStateToProps)(CompanyPage);