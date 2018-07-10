import React from 'react';
import { NavBar, Button, DatePicker, Toast } from 'antd-mobile';
import Upload from '../details/components/upload';
import ScreenShot from '../entering/components/screenShot';
import Unit from '../entering/components/unit';
import Select from '../entering/components/select';
import MyPicker from '../entering/components/datePicker';
import styles from '../entering/page.less';
import router from 'umi/router';
import images from '../../constants/Images';
import { connect } from 'dva';
import dateUtil from '../../utils/dateUtil';
import PropTypes from 'prop-types';
import Event from '../../socket/Event'; 
import { PositionMsgName, ImageUpload } from '../../constants/TopicName';
import { config } from '../../constants/Config';
import checkInput from '../entering/util/validate';
import convertUtil from '../../utils/convertUtil';
import format from '../../utils/calckitUtils';


class Editing extends React.Component{
    static contextTypes = {
        socket: PropTypes.object.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            hide: 'none',
            text: '输入更多信息',
            deg: '180',
        }
    }

  
    //当数据从上个界面传过来时，把传过来的数据写在这个界面的didmount，这样会引起子组件重新render
    componentDidMount(){
       const {dispatch, details} = this.props;
        dispatch({
            type: 'editing/onInputChange',
            payload: details
        })
    }

    toggleShow = () => {
        this.state.hide === 'none' ?
            this.setState({ hide: 'initial', text: '收起更多信息', deg: '0' }) : this.setState({ hide: 'none', text: '输入更多信息', deg: '180' })
    }

    //不做票据修改时需要手动解锁
    itemClick = () => {
        const { dispatch, details, editing } = this.props;
        const { socket } = this.context;
        //清空editing state
        dispatch({
            type: 'editing/clearData',
        })
        if (editing.locked)
            dispatch({
                type: 'editing/unlockReq',
                payload: {
                    socket: socket,
                    params: {
                        inventId: details.inventId,
                        isLock: false
                    }
                }
            })
        router.goBack();
    };

    //进入新增发票信息页面
    enterReceipt = () => {
        const {editing, dispatch} = this.props;
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
        router.push({
            pathname: '/addReceipt',
            query: {
                fromEditing: true,
                voiceList: editing.inventJson.voiceList
            }
        });
    }


    //录入信息待发送到服务器
    inputChange = (key, preProcess) => (event) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'editing/onInputChange',
            payload: {
                [key]: preProcess? preProcess(event.target.value) : event.target.value
            }
        })
        dispatch({
            type: 'pos_details/updateData',
            payload: {
                [key]: preProcess? preProcess(event.target.value) : event.target.value
            }
        })
    }

    //录入日期选择信息待发送到服务器
    selectChange = (key) => (date) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'editing/onInputChange',
            payload: {
                [key]: dateUtil.format(date, 'yyyy-MM-dd')
            }
        })
        dispatch({
            type: 'pos_details/updateData',
            payload: {
                [key]: dateUtil.format(date, 'yyyy-MM-dd')
            }
        })
    }

    //查找兑换人全称
    clickToSelect = () => {
        const { editing } = this.props;
        const {inventJson} = editing;
        if (inventJson.ticketType === "TETICKET") {
            router.push({
                pathname: '/search_company',
                query: {
                    fromEditing: true
                }
            });
        } else {
            router.push({
                pathname: '/search_bank',
                query: {
                    fromEditing: true
                }
            });
        }
    }

    //上传票面截图
    handleChange = (num) => (info) =>{
        if (info.file.status === "done") {
            if(info.file.response.state === 1 ){
                const {dispatch, editing} = this.props;
                const {ticketImgURL} = editing.inventJson;
                let urls = ticketImgURL.split(";");
                urls[num] = info.file.response.data;
                dispatch({
                    type: 'editing/onInputChange',
                    payload: {
                        ticketImgURL: urls.join(";")
                    }
                })
                dispatch({
                    type: 'pos_details/updateData',
                    payload: {
                        ticketImgURL: urls.join(";")
                    }
                })
            }else Toast.info('info.file.response.message', 1.5);
        }
    }

    //预处理票面金额
    ticketPriceProcessing = (price) => {
        return format.mul(price || 0, 10000);
    }


    //提交所有数据到服务器
    //TODO
    clickSubmit = () => {
        const {editing, dispatch} = this.props;
        if (checkInput(editing.inventJson)) {
            const { socket } = this.context;
            dispatch({
                type: 'editing/sendReq',
                payload: {
                    socket: socket,
                    params: editing
                }
            })
            
           
        }
    }

   //处理修改发票返回来的消息
    handleRes = (res) => {
        if (res.messageName === PositionMsgName.IVENT_ADD_RECEIPT){
            const { invoiceList, existList } = res.data.JFInventoryResult.resultParam;
            if (res.data && res.data.JFInventoryResult.outCode === 1) { //操作成功
                const { dispatch } = this.props;
                //判断是增加还是删除发票
                invoiceList[0].operatorTag === 4?
                dispatch({
                    type: 'editing/clearInvoice',
                    payload: {}
                }):dispatch({
                    type: 'editing/updateRcpt',
                    payload: invoiceList[0]
                });
                Toast.info(res.message, 2);
            }else{ 
                existList.length > 0 ?
                    Toast.info("存在重复发票", 2) : Toast.info(res.data.JFInventoryResult.outMsg, 2);
            }
        }
        if (res.messageName === PositionMsgName.INVENT_MODIFY){
            if(res.state === 1){
                router.goBack();
            }else Toast.info(res.message, 1.5);
        }
    }
  

    render() {
        const editing  = this.props.editing.inventJson;
        const onPreview = editing.ticketImgURL.split(";");
        const onPreview1 = onPreview[0]; const onPreview2 = onPreview[1];
        
        const backIcon = <img src={images.ICON_BACK} alt="back icon"
            style={{ width: '2em', height: '1.4em' }} />;

        const header = <div className={styles.container}>
            <div className={styles.head}>
                <div>票据类型</div>
                <div className={styles.adjustHead}>
                    <div className={styles.highlight}>{convertUtil.ticketTypeConvert(editing.ticketType)}</div>
                    <div><img src={images.ICON_SEL} alt="select" /></div>
                </div>
            </div>
            <Unit title={'票号'} value={convertUtil.format(editing.ticketNo)} disabled/>    
        </div>

        const exchange = <div className={styles.container}>

            <Select name={'兑换人全称'} onClick={this.clickToSelect}
                    content={editing.paymentFullname} />

            <Unit title={'票面金额(万)'} onChange={this.inputChange('ticketPrice', this.ticketPriceProcessing)} 
                value={editing.ticketPrice/10000} />
            <DatePicker mode="date"
                extra="请选择出票日"
                value={dateUtil.formatToDate(editing.issueDate)}
                onChange={this.selectChange('issueDate')} >
                <MyPicker>出票日</MyPicker>
            </DatePicker>
            <DatePicker mode="date"
                extra="请选择到期日"
                value={dateUtil.formatToDate(editing.expireDate)}
                onChange={this.selectChange('expireDate')} >
                <MyPicker>到期日</MyPicker>
            </DatePicker>

        </div>

        const buyIn = <div className={styles.container}>
            <Unit title={'买入成本(万)'} onChange={this.inputChange('costPrice', this.ticketPriceProcessing)} 
                  value={editing.costPrice? editing.costPrice/10000 : ""} />
        </div>

        const issuer = <div className={styles.container}>
            <Unit title={'出票人名称'} onChange={this.inputChange('issuePerson')} value={editing.issuePerson} />
            <Unit title={'出票人账号'} onChange={this.inputChange('issueAccount')} value={editing.issueAccount} />
            <Unit title={'出票人开户行'} onChange={this.inputChange('issueBank')} value={editing.issueBank} />
        </div>

        const payee = <div className={styles.container}>
            <Unit title={'收款人名称'} onChange={this.inputChange('receiptPerson')} value={editing.receiptPerson} />
            <Unit title={'收款人账号'} onChange={this.inputChange('receiptAccount')} value={editing.receiptAccount} />
            <Unit title={'收款人开户行'} onChange={this.inputChange('receiptBank')} value={editing.receiptBank} />
        </div>

        const addReceipt = <div className={styles.container}>
            <div className={styles.text}>发票信息</div>
            <div><Button className={styles.btn} onClick={this.enterReceipt}>新增发票信息</Button></div>
        </div>

        const receiptInfo = editing.voiceList[0] && 
                            <div className={styles.container}>
                                <Unit title={"发票信息"} />
                                <Select name={editing.voiceList[0].invoiceCode} onClick={this.enterReceipt} content={" "} />  
                            </div>
        const receipt = editing.voiceList[0] == null? addReceipt : receiptInfo;
        return (
            <div className={ styles.page }>
                <NavBar icon={backIcon} onLeftClick={this.itemClick}>
                   修改票据
                </NavBar>
                {header}
                {exchange}
                <ScreenShot text={'票据截图(正面)'} action={`${config.webUrl}/${ImageUpload.commonImage}`}
                            handleChange={this.handleChange(0)} onPreview={onPreview1}/>
                <div style={{ display: this.state.hide }}>
                    <ScreenShot text={'票据截图(反面)'} action={`${config.webUrl}/${ImageUpload.commonImage}`}
                                handleChange={this.handleChange(1)} onPreview={onPreview2}/>
                    {buyIn}
                    {issuer}
                    {payee}
                    {receipt}
                    <Upload />
                </div>
                <button onClick={this.toggleShow}>
                    {this.state.text}
                    <img src={images.ICON_UP} alt="arrow" style={{ transform: `rotate(${this.state.deg}deg)` }} />
                </button>
                <button className={styles.submit} onClick={this.clickSubmit}>提交</button>
                <Event event="svevent" handler={this.handleRes} />
               
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        entering: state.entering,
        details: state.pos_details.data,
        editing: state.editing,
    }
}

export default connect(mapStateToProps)(Editing);