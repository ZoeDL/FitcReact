import React from "react";
import styles from './page.less';
import {NavBar, DatePicker, Toast, Icon } from 'antd-mobile';
import router from 'umi/router';
import Unit from '../entering/components/unit';
import MyPicker from '../entering/components/datePicker';
import ScreenShot from '../entering/components/screenShot';
import Item from '../details/components/item';
import { connect } from 'dva';
import dateUtil from '../../utils/dateUtil';
import PropTypes from 'prop-types';
import checkInput from './util//validate';
import {config} from '../../constants/Config';
import { ImageUpload } from '../../constants/TopicName';

class addReceipt extends React.Component{
    static contextTypes = {
        socket: PropTypes.object.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
           drawDate: '',
           disabled: false
        }
    }
    
    componentDidMount(){
        const { dispatch, userInfo, location, details,} = this.props;
        if (location.query.fromEditing){
            if(!location.query.voiceList[0]){
                //从修改票据进入且无发票信息
                dispatch({
                    type: 'addRecpt/rcptOnChange',
                    payload: {
                        invoiceOutParty: userInfo.companyName,
                        invoiceOutPartyId: userInfo.companyId,
                        inventID: details.inventId,
                    }
                })
            }else{
                dispatch({   //从修改票据进入但有发票信息
                    type: 'addRecpt/rcptOnChange',
                    payload: details.voiceList && details.voiceList[0]
                })
                this.setState({
                    disabled: true
                })
            }
            
            
        }else { //从录入页面进入
            dispatch({
                type: 'addRecpt/rcptOnChange',
                payload: {
                    invoiceOutParty: userInfo.companyName,
                    invoiceOutPartyId: userInfo.companyId,
                }
            });
        }
    }

    goBack = () => {
        router.goBack();
    }
     
    //录入用户输入内容待发送到服务器
    inputChange = (key) => (event) => {
        const {dispatch} = this.props;
        dispatch({
            type: 'addRecpt/rcptOnChange',
            payload: {
                [key]: event.target.value
            }
        })
    }

    //录入日期待发送到服务器
    selectDate = (date) => {
        this.setState({ drawDate: date })
        const { dispatch} = this.props;
        dispatch({
            type: 'addRecpt/rcptOnChange',
            payload: {
                invoiceDate: dateUtil.format(date, 'yyyy-MM-dd')
            }
        })
    }

    //录入发票照片
    handleChange = (info) => {
        if (info.file.status === "done") {
            if (info.file.response.state === 1) {
                const { dispatch } = this.props;
                var url = info.file.response.data;
                dispatch({
                    type: 'addRecpt/rcptOnChange',
                    payload: {
                        invoiceUrl: url
                    }
                })
            } else Toast.info(info.file.response.message, 2);
        }
    }
    
    //保存
    clickSave = () => {
        const { dispatch, location, addRecpt } = this.props;
        const {socket} = this.context;  
        if (checkInput(addRecpt)){
            if (location.query.fromEditing) {  //若从修改页面进入则直接发送请求
                addRecpt["operatorTag"] = 1;
                dispatch({
                    type: 'addRecpt/sendReq',
                    payload: {
                        socket: socket,
                        params: addRecpt
                    }
                })
                dispatch({
                    type: 'pos_details/updateInvoive',
                    payload: addRecpt
                })
            } else {//从录入页面进入则将数据从addRecpt存入entering
                dispatch({
                    type: 'entering/rcptOnChange',
                    payload: addRecpt
                })
                dispatch({
                    type: 'addRecpt/clearData',
                    payload: {
                        invoiceDate: null,
                        invoiceCode: null,
                        invoiceAcceptParty: null,
                        invoiceSum: null,
                        invoiceNo: null,
                        invoiceUrl: null
                    }
                })
            }
            router.goBack();
        }
       
    }   

    //删除
    clickDelete = () => {
        const {dispatch, addRecpt, location} = this.props;
        const {fromEditing} = location.query;
        if(fromEditing){
            addRecpt["operatorTag"] = 4;
            const { socket } = this.context;
            dispatch({
                type: 'addRecpt/sendReq',
                payload: {
                    socket: socket,
                    params: addRecpt
                }
            })
            dispatch({
                type: 'pos_details/clearInvoice',
            })
        }else{
            dispatch({
                type: 'entering/clearInvoiceData',
            })
        }
        

        router.goBack();
    }

    render(){
        const {voiceList} = this.props.location.query;  //编辑界面的发票
        const {invoiceList} = this.props.entering.inventJson.instrument; //录入界面的发票
        const data = voiceList && voiceList[0] || invoiceList && invoiceList[0]; 
        const onPreview = this.props.addRecpt.invoiceUrl;

        const receipt = <div className={styles.container}>
                            <Unit title="发票代码" onChange={this.inputChange('invoiceCode')} value={data && data.invoiceCode} />
                            <Unit title="发票号码" onChange={this.inputChange('invoiceNo')} value={data && data.invoiceNo}/>
                        </div>
        
        const middle = <div className={styles.container}>
                            <Unit title="金额(元)" onChange={this.inputChange('invoiceSum')} value={data && data.invoiceSum}/>
                            <DatePicker mode="date"
                                extra="请选择开票日期"
                                value={this.state.drawDate}
                                onChange={this.selectDate}
                                disabled={this.state.disabled}
                            >
                            <MyPicker value={data && data.invoiceDate && data.invoiceDate.substring(0, 10)}>出票日</MyPicker>
                            </DatePicker>
                            <Item title="开票单位" content={this.props.userInfo.companyName} />
                            <Unit title="受票单位" onChange={this.inputChange('invoiceAcceptParty')} value={data && data.invoiceAcceptParty}/>
                       </div>
        const submit =  data ? 
                <button className={styles.save} onClick={this.clickDelete}>删除</button>:
                <button className={styles.save} onClick={this.clickSave}>保存</button>
        return(
            <div>
                <NavBar className={styles.navbar}
                    icon={ <Icon type="left" /> }
                    onLeftClick={ this.goBack }
                >新增发票信息</NavBar>
                {receipt}
                {middle}
                <ScreenShot text="发票截图" 
                            action={`${config.webUrl}/${ImageUpload.commonImage}`}
                            handleChange={this.handleChange}
                            onPreview={onPreview}/>
                {submit}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        entering: state.entering,
        userInfo: state.login.user,
        details: state.pos_details.data,
        editing: state.editing,
        addRecpt: state.addRecpt
    }
}

export default connect(mapStateToProps)(addReceipt);