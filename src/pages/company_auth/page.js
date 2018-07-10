import React from 'react';
import { List, NavBar, Icon, InputItem, Picker, Button, Toast } from 'antd-mobile';
import styles from './page.less';
import router from 'umi/router';
import {CompanyAuthMsgName, ImageUpload} from '../../constants/TopicName';
import {connect} from 'dva';
import Event from '../../socket/Event';
import PropTypes from 'prop-types';
import ImageUploader from './components/ImageUploader';
import {config} from '../../constants/Config';
import cities from '../../assets/cities';

const Item = List.Item;
const Brief = Item.Brief;

class CompanyAuthPage extends React.Component {
    static contextTypes = {
        socket: PropTypes.object.isRequired,
    }

    goBack = () => {
        router.goBack();
    }

    onInputItemChange = (key,value) => {
        const {dispatch} = this.props;
        dispatch({
            type:'companyAuth/changeInputVal',
            payload:{[key]:value}
        })
    }

    /**
     * 营业执照上传前
     */
    onUploadBefore = (file) => {
        Toast.loading('正在上传，请稍后', 0);
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(file);
            }, 3000);
        });
    }

    /**
     * 营业执照上传开始
     */
    onUploadStart = () => {
        
    }

    /**
     * 营业执照上传成功
     */
    onUploadSuccess = (ret) => {
        Toast.hide()
        if (ret.state === 1) {
            const {dispatch} = this.props;
            dispatch({
                type:'companyAuth/uploadSuccessed',
                payload:{
                    business: ret.data,
                }
            })
        } else {
            Toast.fail('上传失败！')
        }
    }

    /**
     * 营业执照上传失败
     */
    onUploadFailed = (err) => {
        Toast.hide();
        Toast.fail('上传失败！')
    }

    handleChange = ({ fileList, file }) => {
        const {dispatch} = this.props;
        dispatch({
            type:'companyAuth/handleChange',
            payload:{
                fileList,
            }
        })
    }

    onSubmit = () => {
        const {dispatch, companyAuth} = this.props;
        const { socket } = this.context;
        const {name, legalPerson, province, city, address, business} = companyAuth;
        dispatch({
            type:'companyAuth/reqCompanyAuth',
            payload:{socket,params:{
                name,
                legalPerson,
                businessLicurl: business,
                province,
                city,
                address,
            }}
        })
    }

    /** 开户城市筛选 */
    onFilterCity = (v) => {
        const list = cities.list;
        const area = list.filter(item => item.value === v[0]);
        const province = area[0].label;
        const children = area[0].children;
        const city = children.filter(item => item.value === v[1])[0].label;
        const {dispatch} = this.props;
        dispatch({
            type: 'companyAuth/chooseCity',
            payload: {province: province, city: city}
        })
    }

    /**
     * 接收服务返回
     * @param {Object} response 服务返回
     */
    handleResponse = (response) => {
        const { dispatch } = this.props;
        if (response.messageName === CompanyAuthMsgName.putCompanyAuth) {
            dispatch({
                type: 'companyAuth/resCompanyAuth',
                payload: {response} 
            })
        }
    }

    render() {
        const {companyAuth} = this.props;
        const { business } = companyAuth;
        return(
            <div className='page-container' >
                <Event event="svevent" handler={this.handleResponse} />
                <NavBar
                    icon={<Icon type="left" />}
                    onLeftClick={this.goBack}
                >填写认证公司资料</NavBar>
                <List className={styles.infoList}>
                    <InputItem
                        className={`row-cell ${styles.inputItem}`}
                        placeholder="请在此输入公司名称"
                        onChange={(v) => { this.onInputItemChange('name',v) }}
                    ><span className={styles.inputItemLabel}>公司名称</span></InputItem>
                    <InputItem
                        className={`row-cell ${styles.inputItem}`}
                        placeholder="请在此输入法人名称"
                        onChange={(v) => { this.onInputItemChange('legalPerson',v) }}
                    ><span className={styles.inputItemLabel}>法人</span></InputItem>
                    <Picker
                         data={cities.list}
                         extra={<div className={styles.itemRight} placeholder='请选择公司所在地' >{companyAuth.province}{companyAuth.city}</div>}
                         title='请选择省市'
                         cols={2}
                         onChange={v => this.onFilterCity(v)}
                         onOk={v => this.onFilterCity(v)}
                    >
                        <Item arrow="horizontal" className="row-cell">
                            <div className={styles.item}>
                                <div className={styles.itemLeft}>公司所在地</div>
                            </div>
                        </Item>
                    </Picker>
                    <InputItem
                        className={`row-cell ${styles.inputItem}`}
                        placeholder="请在此输入联系地址"
                        onChange={(v) => { this.onInputItemChange('address',v) }}
                    ><span className={styles.inputItemLabel}>联系地址</span></InputItem>
                </List>
                <List>
                    <Item className="row-cell" >
                        营业执照
                        <Brief>
                            <ImageUploader 
                                action={`${config.webUrl}/${ImageUpload.commonImage}`} 
                                accept='image/*'
                                business={business}
                                onStart={this.onUploadStart}
                                onSuccess={this.onUploadSuccess}
                                onBeforeUpload={this.onUploadBefore}
                                onError={this.onUploadFailed}
                            />
                        </Brief>
                    </Item>
                </List>
                <Button 
                    className={styles.button} 
                    activeClassName={styles.buttonActive}
                    onClick={this.onSubmit}
                >提交</Button>
            </div>
        )
    }
}

const mapStateToProps = ({ companyAuth,login }) => ({
    login,
    companyAuth
}) 

export default connect(mapStateToProps)(CompanyAuthPage);
