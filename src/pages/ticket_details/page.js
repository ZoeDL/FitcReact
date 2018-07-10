import React from 'react';
import { NavBar, Icon, List, DatePicker, ActionSheet, Button, Toast } from 'antd-mobile';
import router from 'umi/router';
import styles from './page.less';
import dateUtils from '../../utils/dateUtil';
import FileView from './components/FileView';
import { connect } from 'dva';
import Event from '../../socket/Event';
import PropTypes from 'prop-types';
import { TicketMsgName } from '../../constants/TopicName';
import images from '../../constants/Images';
import ticketUtil from '../../utils/ticketUtils';
import calckitUtil from '../../utils/calckitUtils';
import checkInput from './util/validate';
import UploadPDF from '../ticket_entering/components/UploadPDF';
import config from '../../constants/Config';
import {PDFUpload} from '../../constants/TopicName';

const Item = List.Item;

class TicketDetailsPage extends React.Component {

    static contextTypes = {
        socket: PropTypes.object.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.location.query.id,
            ticketType: '',
            ticketDate: '',
            dueDate: '',
        }
        const {login} = this.props;
        const {user, token} = login;
        const {userId} = user;
        const _this = this;
        this.uploadProps = {
            action: `${config.webUrl}${PDFUpload.pdf}`,
            accept: 'application/pdf',
            multiple: true,
            data: { token: token, userId: userId, clientType: 1 },
            headers: {
                token: token, userId: userId,
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With,Origin, Accept',
                "Access-Control-Allow-Methods": "POST, GET"
            },
            onStart(file) {
                // Toast.loading('正在上传，请稍后', 0)
            },
            onSuccess(ret) {
                Toast.hide()
                if (ret.state === 1) {
                    Toast.success('上传成功！', 1);
                    const {dispatch} = _this.props;
                    dispatch({
                        type: 'ticketDetails/editTicket',
                        payload: {contractUrl: ret.data.shortUrl}
                    })
                } else {
                    Toast.fail('上传失败！', 1);
                }
            },
            onError(err) {
                Toast.hide();
                Toast.fail('上传失败！', 1);
            },
            beforeUpload(file, fileList) {
                Toast.loading('正在上传，请稍后', 0);
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(file);
                    }, 3000);
                });
            },
        }
    }

    goBack = () => {
        router.goBack();
    }

    goPDF = () => {
        const {ticketDetails} = this.props;
        const {ticket} = ticketDetails;
        router.push({
            pathname: '/pdf',
            query: {url: ticket.contractUrl}
        })
    }

    /** 表单输入框change事件 */
    onInputChange = (key) => (event) => {
        let  value = event.target.value;
        if (key === 'ticketsPrice') {
            value = calckitUtil.mul(value, 10000);
        }
        const { dispatch } = this.props;
        dispatch({
            type: 'ticketDetails/editTicket',
            payload: { [key]: value }
        })
    }

    /** 修改日期 */
    onDateChange = (key) => (date)  => {
        let newDate = dateUtils.format(new Date(date) ,'yyyy-MM-dd');
        const { dispatch } = this.props;
        dispatch({
            type: 'ticketDetails/editTicket',
            payload: { [key]: newDate }
        })
    }

    /** 显示出票类型选择面板 */
    showActionSheet = () => {
        const BUTTONS = ['半年期', '一年期', '取消'];
        const BUTTONS_CODE = [6, 12];
        ActionSheet.showActionSheetWithOptions({
            options: BUTTONS,
            cancelButtonIndex: BUTTONS.length - 1,
            maskClosable: true,
        },
            (buttonIndex) => {
                if (buttonIndex === BUTTONS.length - 1) {
                    return
                }
                const { dispatch } = this.props;
                dispatch({
                    type: 'ticketDetails/editTicket',
                    payload: { expireType: BUTTONS_CODE[buttonIndex] }
                })
            });
    }

    /** modifyPDF */
    onDelFile = (e) => {
        e.stopPropagation();
        const {dispatch} = this.props;
        dispatch({
            type: 'ticketDetails/editTicket',
            payload: {contractUrl: ''}
        })
    }

    componentDidMount() {
        const { dispatch } = this.props;
        const { socket } = this.context;
        let promise = new Promise((resolve, reject) => {
            resolve(dispatch({
                type: 'ticketDetails/storageId',
                payload: { id: this.state.id }
            }))
            dispatch({
                type: 'ticketDetails/hanldeEdit',
                payload: { isEdit: false }
            })
        })
        promise.then(() => {
            const { ticketDetails } = this.props;
            const { id } = ticketDetails;
            dispatch({
                type: 'ticketDetails/reqTicket',
                payload: {
                    socket, params: {
                        id,
                        version: 1
                    }
                }
            })
        })
    }

    onRightClick = (value) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'ticketDetails/hanldeEdit',
            payload: { isEdit: value }
        })
        if (!value) {
            const { ticketDetails } = this.props;
            const { socket } = this.context;
            const { id } = ticketDetails;
            dispatch({
                type: 'ticketDetails/reqTicket',
                payload: {
                    socket, params: {
                        id,
                        version: 1
                    }
                }
            })
        }
    }

    /** 修改票据详情 */
    onModifyTicket = () => {
        const {dispatch, ticketDetails} = this.props;
        const {ticket} = ticketDetails;
        const { socket } = this.context;
        const result = checkInput(ticket);
        if (result) {
            dispatch({
                type: 'ticketDetails/reqModifyTicket',
                payload:{
                    socket, params: {
                        ...ticket,
                        id: ticket.pleTrdId.id,
                        instrumentType: ticketDetails.instrumentType,
                        version: 1,
                    }
                }
            })
        }
    }

    /** 提交审核 */
    onSubmit = () => {
        const { dispatch, ticketDetails } = this.props;
        const { socket } = this.context;
        const { id } = ticketDetails;
        dispatch({
            type: 'ticketDetails/reqAudit',
            payload: {
                socket, params: {
                    id,
                    version: 1
                }
            }
        })
    }

    /** 拿到 socket 服务结果 */
    handleResponse = (response) => {
        const { dispatch } = this.props;
        if (response.messageName === TicketMsgName.TicketDetails) { //查看详情
            dispatch({
                type: 'ticketDetails/resTicket',
                payload: { response }
            })
        }
        if (response.messageName === TicketMsgName.TicketSubmit) { //提交审核
            dispatch({
                type: 'ticketDetails/resAudit',
                payload: { response }
            })
        }
        if (response.messageName === TicketMsgName.TicketEdit) { //修改票据
            dispatch({
                type: 'ticketDetails/resModifyTicket',
                payload: { response }
            })
        }
    }

    /**
     * 查看详情
     */
    renderShowTicket(ticket) {
        const {ticketDetails} = this.props;
        const {isEdit} = ticketDetails;
        const statusHtml = <List className={styles.list}>
            <Item className="row-cell">
                <div className={styles.item}>
                    <div className={styles.itemLeft}>审核状态</div>
                    <div className={styles.itemRight}>
                        <span className={ticketUtil.statusStyleConvert(ticket.assureStatus)}>
                            {ticketUtil.statusConvert(ticket.assureStatus)}
                        </span>
                    </div>
                </div>
            </Item>
        </List>;
        const button = <Button
            className={styles.button}
            activeClassName={styles.buttonActive}
            onClick={this.onSubmit}
        >提交审核</Button>;
        const footer = ticket.assureStatus ? statusHtml : button;
        return (
            <div>
                <List className={styles.list}>
                    <Item className="row-cell">
                        <div className={styles.item} >
                            <div className={styles.itemLeft} >票据类型</div>
                            <div className={styles.itemRight} >电商</div>
                        </div>
                    </Item>
                    <Item className="row-cell">
                        <div className={styles.item} >
                            <div className={styles.itemLeft}>承兑人全称</div>
                            <div className={styles.itemRight}>{ticket.paymentBankFullName}</div>
                        </div>
                    </Item>
                </List>
                <List className={styles.list}>
                    <Item className="row-cell">
                        <div className={styles.item}>
                            <div className={styles.itemLeft}>票号</div>
                            <div className={styles.itemRight}>
                                {ticket.ticketNo}
                            </div>
                        </div>
                    </Item>
                    <Item className="row-cell">
                        <div className={styles.item}>
                            <div className={styles.itemLeft}>出票类型</div>
                            <div className={styles.itemRight}>{ticketUtil.expireTypeConvert(ticket.expireType)}</div>
                        </div>
                    </Item>
                    <Item className="row-cell">
                        <div className={styles.item}>
                            <div className={styles.itemLeft}>票面金额(万)</div>
                            <div className={styles.itemRight}>
                                {ticket.ticketsPrice ? calckitUtil.div(ticket.ticketsPrice, 10000) : null}
                            </div>
                        </div>
                    </Item>
                    <Item className="row-cell">
                        <div className={styles.item}>
                            <div className={styles.itemLeft}>出票日</div>
                            <div className={styles.itemRight}>
                                {dateUtils.format(new Date(ticket.outTicketDate), 'yyyy/MM/dd')}
                            </div>
                        </div>
                    </Item>
                    <Item className="row-cell">
                        <div className={styles.item}>
                            <div className={styles.itemLeft}>到期日</div>
                            <div className={styles.itemRight}>
                                {dateUtils.format(new Date(ticket.expireDate), 'yyyy/MM/dd')}
                            </div>
                        </div>
                    </Item>
                </List>
                <List className={styles.list}>
                    <Item className="row-cell">
                        <div className={styles.item}>
                            <div className={styles.itemLeft}>出票人名称</div>
                            <div className={styles.itemRight}>
                                {ticket.ptyFullName}
                            </div>
                        </div>
                    </Item>
                    <Item className="row-cell">
                        <div className={styles.item}>
                            <div className={styles.itemLeft}>出票人账号</div>
                            <div className={styles.itemRight}>
                                {ticket.ptyAccount}
                            </div>
                        </div>
                    </Item>
                    <Item className="row-cell">
                        <div className={styles.item}>
                            <div className={styles.itemLeft}>出票人开户行</div>
                            <div className={styles.itemRight}>
                                {ticket.ptyOpenBank}
                            </div>
                        </div>
                    </Item>
                </List>
                <List className={styles.list}>
                    <Item className="row-cell">
                        <div className={styles.item}>
                            <div className={styles.itemLeft}>收款人名称</div>
                            <div className={styles.itemRight}>
                                {ticket.cnptyFullName}
                            </div>
                        </div>
                    </Item>
                    <Item className="row-cell">
                        <div className={styles.item}>
                            <div className={styles.itemLeft}>收款人账号</div>
                            <div className={styles.itemRight}>
                                {ticket.cnptyAccount}
                            </div>
                        </div>
                    </Item>
                    <Item className="row-cell">
                        <div className={styles.item}>
                            <div className={styles.itemLeft}>收款人开户行</div>
                            <div className={styles.itemRight}>
                                {ticket.cnptyOpenBank}
                            </div>
                        </div>
                    </Item>
                </List>
                <List className={styles.list}>
                    <Item className="row-cell">
                        <div className={styles.item}>
                            <div className={styles.itemLeft}>贸易合同号</div>
                            <div className={styles.itemRight}>
                                {ticket.contractNo}
                            </div>
                        </div>
                    </Item>
                    <Item className="row-cell">
                        {ticket.contractUrl ? <FileView delshow={isEdit} toFile={this.goPDF} /> : <div className={styles.pdfIcon}><img src={images.UPLOAD_PDF} alt="上传PDF" /></div>  }
                    </Item>
                </List>
                <List className={styles.list}>
                    <Item className="row-cell">
                        <div className={styles.item}>
                            <div className={styles.itemLeft}>交易员</div>
                            <div className={styles.itemRight}>
                                {ticket.trdUser}
                            </div>
                        </div>
                    </Item>
                </List>
                {footer}
            </div>
        )
    }

    /**
     * 编辑票面
     */
    renderEditTicket(ticket) {
        const {ticketDetails} = this.props;
        const {isEdit} = ticketDetails;
        return (
            <div>
                <List className={styles.list}>
                    <Item className="row-cell">
                        <div className={styles.item} >
                            <div className={styles.itemLeft} >票据类型</div>
                            <div className={styles.itemRight} >电商</div>
                        </div>
                    </Item>
                    <Item className="row-cell">
                        <div className={styles.item} >
                            <div className={styles.itemLeft} >承兑人全称</div>
                            <div className={styles.itemRight} >{ticket.paymentBankFullName}</div>
                        </div>
                    </Item>
                </List>
                <List className={styles.list}>
                    <Item className="row-cell">
                        <div className={styles.item}>
                            <div className={styles.labelColor}>票号</div>
                            <div className={styles.itemRight}>
                                <input type='text'
                                    placeholder='请输入票号'
                                    className={styles.inputItem}
                                    onChange={this.onInputChange('ticketNo')}
                                    pattern="[0-9]*"
                                    value={ticket.ticketNo}
                                />
                            </div>
                        </div>
                    </Item>
                    <Item className="row-cell" arrow="horizontal" onClick={this.showActionSheet}>
                        <div className={styles.item}>
                            <div className={styles.itemLeft}>出票类型</div>
                            <div className={styles.itemRight} placeholder='请选择出票类型'>{ticketUtil.expireTypeConvert(ticket.expireType)}</div>
                        </div>
                    </Item>
                    <Item className="row-cell">
                        <div className={styles.item}>
                            <div className={styles.itemLeft}>票面金额(万)</div>
                            <div className={styles.itemRight}>
                                <input type='text'
                                    placeholder='请输入票面金额'
                                    className={styles.inputItem}
                                    onChange={this.onInputChange('ticketsPrice')}
                                    maxLength={6}
                                    value={ticket.ticketsPrice ? calckitUtil.div(ticket.ticketsPrice, 10000) : null}
                                />
                            </div>
                        </div>
                    </Item>
                    <DatePicker
                        mode="date"
                        extra="请选择出票日"
                        format={(date) => dateUtils.format(date, 'yyyy/MM/dd')}
                        value={new Date(ticket.outTicketDate)}
                        onChange={ this.onDateChange('outTicketDate')}
                    >
                        <Item className="row-cell" arrow="horizontal" >
                            <span className={styles.labelColor}>出票日</span>
                        </Item>
                    </DatePicker>
                    <DatePicker
                        mode="date"
                        extra="请选择到期日"
                        format={(date) => dateUtils.format(date, 'yyyy/MM/dd')}
                        value={new Date(ticket.expireDate)}
                        onChange={ this.onDateChange('expireDate')}
                    >
                        <Item className="row-cell" arrow="horizontal" >
                            <span className={styles.labelColor}>到期日</span>
                        </Item>
                    </DatePicker>
                </List>
                <List className={styles.list}>
                    <Item className="row-cell">
                        <div className={styles.item}>
                            <div className={styles.itemLeft}>出票人名称</div>
                            <div className={styles.itemRight}>
                                <input type='text'
                                    placeholder='请输入出票人名称'
                                    className={styles.inputItem}
                                    onChange={this.onInputChange('ptyFullName')}
                                    value={ticket.ptyFullName}
                                />
                            </div>
                        </div>
                    </Item>
                    <Item className="row-cell">
                        <div className={styles.item}>
                            <div className={styles.itemLeft}>出票人账号</div>
                            <div className={styles.itemRight}>
                                <input type='text'
                                    placeholder='请输入出票人账号'
                                    className={styles.inputItem}
                                    onChange={this.onInputChange('ptyAccount')}
                                    value={ticket.ptyAccount}
                                />
                            </div>
                        </div>
                    </Item>
                    <Item className="row-cell">
                        <div className={styles.item}>
                            <div className={styles.itemLeft}>出票人开户行</div>
                            <div className={styles.itemRight}>
                                <input type='text'
                                    placeholder='请输入出票人开户行'
                                    className={styles.inputItem}
                                    onChange={this.onInputChange('ptyOpenBank')}
                                    value={ticket.ptyOpenBank}
                                />
                            </div>
                        </div>
                    </Item>
                </List>
                <List className={styles.list}>
                    <Item className="row-cell">
                        <div className={styles.item}>
                            <div className={styles.itemLeft}>收款人名称</div>
                            <div className={styles.itemRight}>
                                <input type='text'
                                    placeholder='请输入收款人名称'
                                    className={styles.inputItem}
                                    onChange={this.onInputChange('cnptyFullName')}
                                    value={ticket.cnptyFullName}
                                />
                            </div>
                        </div>
                    </Item>
                    <Item className="row-cell">
                        <div className={styles.item}>
                            <div className={styles.itemLeft}>收款人账号</div>
                            <div className={styles.itemRight}>
                                <input type='text'
                                    placeholder='请输入收款人账号'
                                    className={styles.inputItem}
                                    onChange={this.onInputChange('cnptyAccount')}
                                    value={ticket.cnptyAccount}
                                />
                            </div>
                        </div>
                    </Item>
                    <Item className="row-cell">
                        <div className={styles.item}>
                            <div className={styles.itemLeft}>收款人开户行</div>
                            <div className={styles.itemRight}>
                                <input type='text'
                                    placeholder='请输入收款人开户行'
                                    className={styles.inputItem}
                                    onChange={this.onInputChange('cnptyOpenBank')}
                                    value={ticket.cnptyOpenBank}
                                />
                            </div>
                        </div>
                    </Item>
                </List>
                <List className={styles.list}>
                    <Item className="row-cell">
                        <div className={styles.item}>
                            <div className={styles.itemLeft}>贸易合同号</div>
                            <div className={styles.itemRight}>
                                <input type='text'
                                    placeholder='请输入贸易合同号'
                                    className={styles.inputItem}
                                    onChange={this.onInputChange('contractNo')}
                                    value={ticket.contractNo}
                                />
                            </div>
                        </div>
                    </Item>
                    <Item className="row-cell">
                        {
                            ticket.contractUrl ? <FileView delshow={isEdit} onDelClick={this.onDelFile} toFile={this.goPDF} /> : <UploadPDF defaultProps={this.uploadProps} />
                        }
                    </Item>
                </List>
                <List className={styles.list}>
                    <Item className="row-cell">
                        <div className={styles.item}>
                            <div className={styles.itemLeft}>交易员</div>
                            <div className={styles.itemRight}>
                                <input type='text'
                                    placeholder='请输入交易员名称'
                                    className={styles.inputItem}
                                    onChange={this.onInputChange('trdUser')}
                                    value={ticket.trdUser}
                                />
                            </div>
                        </div>
                    </Item>
                </List>
                <Button
                    className={styles.button}
                    activeClassName={styles.buttonActive}
                    onClick={this.onModifyTicket}
                >保存修改</Button>
            </div>
        )
    }

    render() {
        const { ticketDetails } = this.props;
        const { ticket, isEdit } = ticketDetails;
        const title = isEdit ? '修改出票记录' : '出票记录详情';
        const rightContent1 = isEdit ? <img className={styles.icon} src={images.ICON_CANCEL} alt="取消" onClick={() => this.onRightClick(false)} /> : <img src={images.ICON_EDIT} alt="编辑" onClick={() => this.onRightClick(true)} />;
        const rightContent = ticket.assureStatus ? null : rightContent1;
        return (
            <div className="page-container">
                <Event event="svevent" handler={this.handleResponse} />
                <NavBar
                    icon={<Icon type="left" />}
                    onLeftClick={this.goBack}
                    rightContent={rightContent}
                >{title}</NavBar>
                {isEdit ? this.renderEditTicket(ticket) : this.renderShowTicket(ticket)}
            </div>
        )
    }
}

const mapStateToProps = ({ ticketDetails, login }) => ({
    ticketDetails,
    login
})

export default connect(mapStateToProps)(TicketDetailsPage);
