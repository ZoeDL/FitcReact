/*
 * 录入票据
 * @Author: Zoe 
 * @Date: 2018-05-15 15:50:57 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-05-15 15:52:38
 */
import React from 'react';
import { NavBar, Button, DatePicker, Toast, ActionSheet } from 'antd-mobile';
import Upload from '../details/components/upload';
import ScreenShot from './components/screenShot';
import Unit from './components/unit';
import Select from './components/select';
import MyPicker from './components/datePicker';
import router from 'umi/router';
import images from '../../constants/Images';
import {connect} from 'dva';
import dateUtil from '../../utils/dateUtil';
import PropTypes from 'prop-types';
import { config } from '../../constants/Config';
import {ImageUpload} from '../../constants/TopicName';
import checkInput from './util/validate';
import convertUtil from '../../utils/convertUtil';
import withLogin from '../../components/withLogin';
import styles from './page.less';

const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let wrapProps;
if (isIPhone) {
    wrapProps = {
        onTouchStart: e => e.preventDefault(),
    };
}

class Entering extends React.Component{
    static contextTypes = {
        socket: PropTypes.object.isRequired,
    }

    constructor(props){
        super(props);
        this.state = {
            hide: 'none',
            text: '输入更多信息',
            deg: '180',  
            dateOut: '',
            dateDue: '',
            urls: ["", ""],
            type: '电银',
            code: 0

        }
    }

    componentDidMount(){
        const { dispatch, userInfo } = this.props;
        dispatch({
            type: 'entering/fixedParams',
            payload: {
                creatCompanyID: userInfo.companyId,
                operatorId: userInfo.userId,
                creatUserID: userInfo.userId
            }
        })
    }

    toggleShow = () => {
        this.state.hide === 'none' ?
            this.setState({ hide: 'initial', text: '收起更多信息', deg: '0' }) : this.setState({ hide: 'none', text: '输入更多信息', deg: '180' })
    }

    itemClick = () => {
        router.goBack();
    };

    //选择票据类型
    showTypeSheet = () => {
        const {dispatch} = this.props;
        const options = ['电银', '电商', '取消'];
        ActionSheet.showActionSheetWithOptions({
            options: options,
            cancelButtonIndex: 2,
            maskClosable: true,
            wrapProps,
        },
            (buttonIndex) => {
                if(buttonIndex === 0)
                    dispatch({
                        type: 'entering/onInputChange',
                        payload: {
                            ticketType: 'ETICKET'
                        }
                    })
                else if(buttonIndex === 1)
                    dispatch({
                        type: 'entering/onInputChange',
                        payload: {
                            ticketType: 'TETICKET'
                        }
                    })
            }
        );
    }

    //进入新增发票信息页面
    addReceipt = () => {
        const {dispatch} = this.props;
        dispatch({
            type: 'addRecpt/clearData',
            payload: {
                invoiceDate: null,
                invoiceCode: null,
                invoiceAcceptParty: null,
                invoiceNo: null,
                invoiceSum: null,
                invoiceUrl: null
            }
        })
        router.push('/addReceipt');
    }

    //录入信息待发送到服务器
    inputChange = (key, preProcess) => (event) => {
        const {dispatch} = this.props;
        dispatch({
            type: 'entering/onInputChange',
            payload: { 
                [key]: preProcess ? preProcess(event.target.value) : event.target.value
            }
        })
    }

    //录入日期选择信息待发送到服务器
    selectChange = (key) => (date) =>{
        key === 'issueDate' ? this.setState({ dateOut: date }) : this.setState({dateDue: date})
        const {dispatch} = this.props;
        dispatch({
            type: 'entering/onInputChange',
            payload: {
                [key]: dateUtil.format(date, 'yyyy-MM-dd')
            }
        })
    }

    //录入图片后改变的状态

    strToArr = () => {
        const urls = this.props.entering.inventJson.instrument.ticketImgURL;
        const onPreview = urls.split(";");
        return onPreview;
    }

    handleChange = (info) => {
        if (info.file.status === "done") {
            if(info.file.response.state === 1){
                const { entering, dispatch } = this.props;
                const { ticketImgURL } = entering.inventJson.instrument;
                var urls = ticketImgURL.split(';');
                urls[0] = info.file.response.data;
                dispatch({
                    type: 'entering/onInputChange',
                    payload: {
                        ticketImgURL: urls.join(';')
                    }
                })
            } else Toast.info(info.file.response.message, 1.5);
         }
    }

    handleChange2 = (info) => {
        if(info.file.status === 'done'){
            if (info.file.response.state === 1){
                const { entering, dispatch } = this.props;
                const { ticketImgURL } = entering.inventJson.instrument;
                var urls = ticketImgURL.split(';');
                urls[1] = info.file.response.data;
                dispatch({
                    type: 'entering/onInputChange',
                    payload: {
                        ticketImgURL: urls.join(';')
                    }
                })
            } else Toast.info(info.file.response.message, 1.5);
        }
        
    }



    //查找兑换人全称
    clickToSelect = () => {
        const { dispatch,entering } = this.props;
        const {inventJson} = entering;
        const {instrument} = inventJson;
        const isTETICKET = instrument.ticketType === 'TETICKET' ? true : false;
        //清空历史搜索列表
        dispatch({
            type: 'searchbank/searchSuccessed',
            payload: { bankList: [] }
        })
        if (isTETICKET) {
            router.push({
                pathname: '/search_company',
                query: {
                    fromEntering: true
                }
            });
            return;
        }
        router.push({
            pathname: '/search_bank',
            query: {
                fromEntering: true
            }
        });
    }

    //录入买入成本待发送到服务器
    costChange = (event) => {
        const {dispatch} = this.props;
        dispatch({
            type: 'entering/costChange',
            payload: {
                costPrice: event.target.value * 10000
            }
        })
    }

    //预处理票面金额
    ticketPriceProcessing = (price) => {
        return price * 10000
    }

    ticketNoProcessing = (s) => {
        return s.replace(/ /g, '');
    }


    //提交所有数据到服务器
    clickSubmit = () => {
        if (checkInput(this.props.entering.inventJson.instrument)){
            const { dispatch, entering } = this.props;
            const {socket} = this.context;
            dispatch({
                type: 'entering/sendingForm',
                payload: {
                    socket: socket,
                    params: entering
                }
            })
            dispatch({
                type: 'entering/clearInvoiceData'
            })
            router.goBack();
        }
    }

    render(){
        const {inventJson} = this.props.entering;
        const {instrument} = inventJson;
        const urls = instrument.ticketImgURL.split(';')
        let onPreview1, onPreview2;
            onPreview1 = urls[0];
            onPreview2 = urls[1];

        const backIcon = <img src={images.ICON_BACK} alt="back icon"
                              style={{ width: '2em', height: '1.4em'}}/>;

        const ticketType = instrument.ticketType === 'TETICKET'? '电商' : '电银';
        const header =  <div className={styles.container}>
                            <div className={styles.head}>
                                <div>票据类型</div>
                                <div className={styles.adjustHead} onClick={this.showTypeSheet}>
                                    <div className={styles.highlight} >{ticketType}</div>
                                    <div><img src={images.ICON_SEL} alt="select"/></div>
                                </div>
                            </div>
                             <Unit title={'票号'} onChange={this.inputChange('ticketNo', this.ticketNoProcessing)} 
                                                  value={convertUtil.format(instrument.ticketNo)}/>
                        </div> 
        
        const exchange = <div className={styles.container}>
                            <Select name={'兑换人全称'} onClick={this.clickToSelect} 
                                content={instrument.paymentFullname} />
                            <Unit title={'票面金额(万)'} onChange={this.inputChange('ticketPrice', this.ticketPriceProcessing)} 
                                  defaultValue={instrument.ticketPrice ? instrument.ticketPrice/10000 : ""}/>

                            {/* 日期选择 */}
                            <DatePicker mode="date"
                                        extra="请选择出票日"
                                        value={this.state.dateOut}
                                        onChange={this.selectChange('issueDate')} >
                                <MyPicker defaultValue={instrument.issueDate}>出票日</MyPicker>
                            </DatePicker>
                            <DatePicker mode="date"
                                        extra="请选择到期日"
                                        value={this.state.dateDue}
                                        onChange={this.selectChange('expireDate')} >
                            <MyPicker defaultValue={instrument.expireDate}>到期日</MyPicker>
                            </DatePicker>
                            
                        </div> 

        const buyIn = <div className={styles.container}>
                            <Unit title={'买入成本(万)'} onChange={this.costChange} defaultValue={inventJson.costPrice? inventJson.costPrice/10000 : ""}/>
                      </div>

        const issuer = <div className={styles.container}>
                            <Unit title={'出票人名称'} onChange={this.inputChange('issuePerson')} defaultValue={instrument.issuePerson}/>
                            <Unit title={'出票人账号'} onChange={this.inputChange('issueAccount')} defaultValue={instrument.issueAccount}/>
                            <Unit title={'出票人开户行'} onChange={this.inputChange('issueBank')} defaultValue={instrument.issueBank}/>
                       </div>
        
        const payee = <div className={styles.container}>
                            <Unit title={'收款人名称'} onChange={this.inputChange('receiptPerson')} defaultValue={instrument.receiptPerson}/> 
                            <Unit title={'收款人账号'} onChange={this.inputChange('receiptAccount')} defaultValue={instrument.receiptAccount}/> 
                            <Unit title={'收款人开户行'} onChange={this.inputChange('receiptBank')} defaultValue={instrument.receiptBank}/> 
                      </div>

        const addReceipt =  <div className={styles.container}>
                                <div className={styles.text}>发票信息</div>
                                <div><Button className={styles.btn} onClick={this.addReceipt}>新增发票信息</Button></div>
                            </div>


        const receiptInfo = instrument.invoiceList[0] &&
            <div className={styles.container}>
                <Unit title={"发票信息"} />
                <Select name={instrument.invoiceList[0].invoiceCode} onClick={this.addReceipt} content={" "} />
            </div>


        const receipt = instrument.invoiceList[0] == null ? addReceipt : receiptInfo;

        return(
            <div className={`page-container ${styles.page}`}>
                <NavBar icon={backIcon} onLeftClick={this.itemClick}>
                    {this.props.location.query.title || "录入票据"} 
                </NavBar>
                {header}
                {exchange}
                <ScreenShot text="票面截图(正面)"
                            action={`${config.webUrl}/${ImageUpload.commonImage}`} 
                            handleChange={this.handleChange} 
                            onPreview={onPreview1}
                            />
                <div style={{display: this.state.hide}}>
                    <ScreenShot text="票面截图(反面)"
                                action={`${config.webUrl}/${ImageUpload.commonImage}`}
                                handleChange={this.handleChange2}
                                onPreview={onPreview2}
                                />
                    {buyIn}
                    {issuer}
                    {payee}
                    {receipt}
                    <Upload />
                </div>
                <button onClick={this.toggleShow}>
                    {this.state.text}
                    <img src={images.ICON_UP} alt="arrow" style={{ transform: `rotate(${this.state.deg}deg)`}}/>
                </button>
                <button className={styles.submit} onClick={this.clickSubmit}>提交</button>   
            </div>
        )
    }
}

const withLoginComponent = withLogin()(Entering);

const mapStateToProps = (state) => {
    return {
        entering: state.entering,
        userInfo: state.login.user, 
        details: state.pos_details.data,
    }
}

export default connect(mapStateToProps)(withLoginComponent);