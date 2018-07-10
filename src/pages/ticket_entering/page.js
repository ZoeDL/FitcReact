import React from 'react';
import { NavBar, Icon, List, DatePicker, ActionSheet, Button, Toast } from 'antd-mobile';
import router from 'umi/router';
import styles from './page.less';
import dateUtils from '../../utils/dateUtil';
import { connect } from 'dva';
import Event from '../../socket/Event';
import PropTypes from 'prop-types';
import ticketUtil from '../../utils/ticketUtils';
import UploadPDF from './components/UploadPDF';
import config from '../../constants/Config';
import {PDFUpload} from '../../constants/TopicName';
import checkInput from './util/validate';
import { TicketMsgName } from '../../constants/TopicName';
import calckitUtil from '../../utils/calckitUtils';
import FileView from '../ticket_details/components/FileView';

const Item = List.Item;

class EntryTicketRecordPage extends React.Component {

    static contextTypes = {
        socket: PropTypes.object.isRequired,
    }

    constructor(props) {
        super(props);
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
                    _this.onStorageInfo('contractUrl', ret.data.shortUrl);
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
        const {enterTicket} = this.props;
        const {ticket} = enterTicket;
        router.push({
            pathname: '/pdf',
            query: {url: ticket.contractUrl}
        })
    }

    /** delPDF */
    onDelFile = (e) => {
        e.stopPropagation();
        const {dispatch} = this.props;
        dispatch({
            type: 'enterTicket/storageInfo',
            payload: {contractUrl: ''}
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
                this.onStorageInfo('expireType', BUTTONS_CODE[buttonIndex]);
            });
    }

    componentDidMount() {
        const {login} = this.props;
        const {user} = login;
        this.onStorageInfo('paymentBankFullName', user.companyName);
    }

    /** 存储用户输入信息 */
    onInputChange = key => (e) => {
        const {dispatch} = this.props;
        let value = e.target.value;
        if (key === 'ticketsPrice') {
            value = calckitUtil.mul(value, 10000);
        }
        dispatch({
            type: 'enterTicket/storageInfo',
            payload: {
                [key]: value
            }
        })
    }

    /** 存储用户选择信息 */
    onStorageInfo = (key, value) => {
        const {dispatch} = this.props;
        dispatch({
            type: 'enterTicket/storageInfo',
            payload: {
                [key]: value
            }
        })
    }

    /** 存储日期 */
    onDateChange = key => (date) => {
        let newDate = dateUtils.format(new Date(date) ,'yyyy-MM-dd');
        const { dispatch } = this.props;
        dispatch({
            type: 'enterTicket/storageInfo',
            payload: { [key]: newDate }
        })
    }

    /** 录入票据 */
    onTicketEntry = () => {
        const {enterTicket, dispatch} = this.props;
        const {ticket} = enterTicket;
        const { socket } = this.context;
        const result = checkInput(ticket);
        if(result) {
            dispatch({
                type: 'enterTicket/reqEnterTicket',
                payload: {
                    socket, params: {
                        ...ticket
                    }
                }
            })
        }
    }

    /** 拿到 socket 服务结果 */
    handleResponse = (response) => {
        const { dispatch } = this.props;
        if (response.messageName === TicketMsgName.TicketAdd) { //录入票据
            dispatch({
                type: 'enterTicket/resEnterTicket',
                payload: { response }
            })
        }
    }

    render() {
        const {enterTicket, login} = this.props;
        const {ticket} = enterTicket;
        const {user} = login;
        return (
            <div className="page-container">
                <Event event="svevent" handler={this.handleResponse} />
                <NavBar
                    icon={<Icon type="left" />}
                    onLeftClick={this.goBack}
                >录入出票记录</NavBar>
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
                            <div className={styles.itemRight} >{user.companyName}</div>
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
                                    maxLength={30}
                                    pattern="[0-9]*"
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
                                />
                            </div>
                        </div>
                    </Item>
                    <DatePicker
                        mode="date"
                        extra="请选择出票日"
                        format={(date) => dateUtils.format(date, 'yyyy/MM/dd')}
                        value={ticket.outTicketDate ? (new Date(ticket.outTicketDate)) : null}
                        onChange={this.onDateChange('outTicketDate')}
                    >
                        <Item className="row-cell" arrow="horizontal" >
                            <span className={styles.labelColor}>出票日</span>
                        </Item>
                    </DatePicker>
                    <DatePicker
                        mode="date"
                        extra="请选择到期日"
                        format={(date) => dateUtils.format(date, 'yyyy/MM/dd')}
                        value={ticket.expireDate ? (new Date(ticket.expireDate)) : null}
                        onChange={this.onDateChange('expireDate')}
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
                                />
                            </div>
                        </div>
                    </Item>
                    <Item className="row-cell">
                        {ticket.contractUrl ?  <FileView delshow={true} onDelClick={this.onDelFile} toFile={this.goPDF} /> : <UploadPDF defaultProps={this.uploadProps} /> } 
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
                                />
                            </div>
                        </div>
                    </Item>
                </List>
                <Button
                    className={styles.button}
                    activeClassName={styles.buttonActive}
                    onClick={this.onTicketEntry}
                >保存</Button>
            </div>
        )
    }
}

const mapStateToProps = ({ enterTicket, login }) => ({
    enterTicket,
    login
})

export default connect(mapStateToProps)(EntryTicketRecordPage);
