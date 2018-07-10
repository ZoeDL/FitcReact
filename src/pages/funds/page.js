

import React from 'react';
import { NavBar, Icon, ListView } from 'antd-mobile';
import styles from './page.less';
import router from 'umi/router';
import images from '../../constants/Images';
import RecordListItem from './components/RecordListItem';
import { connect } from 'dva';
import Event from '../../socket/Event';
import { FundsMsgName, FundsMVCID } from '../../constants/TopicName';
import PropTypes from 'prop-types';
import RefreshListView, { RefreshState } from '../../components/RefreshListView';
import mergeFundsRecordOptions from './entity/funds';

let pageNumber = 0;
let loadMoreTime = 0;

class FundsPage extends React.Component {
    static contextTypes = {
        socket: PropTypes.object.isRequired,
    }
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 }),

        }
    }
    componentDidMount() {
        document.body.style.overflow = 'hidden';
        const { dispatch, login, funds } = this.props;
        const { companyId } = login.user;
        const { socket } = this.context;
        const { accountType, version } = funds;
        dispatch({
            type: 'funds/reqBalance',
            payload: {
                socket, params: {
                    accountType,
                    companyId,
                    version,
                }
            }
        })
    }

    componentWillReceiveProps(newProps) {
        const { funds } = newProps;
        const { recordList, refreshState } = funds;
        if (refreshState === RefreshState.NoMoreData || refreshState === RefreshState.Failure) {
            pageNumber -= 1;
        }
        if (pageNumber < 0) pageNumber = 0;

        if (recordList && recordList.length > 0 && recordList !== this.props.dataSource) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows([...recordList])
            });
        }
    }

    /** 控制余额是否加密 */
    handleEyes = () => {
        const { dispatch, funds } = this.props;
        const { isVisible } = funds;
        dispatch({
            type: 'funds/handleVisible',
            payload: { isVisible: !isVisible }
        })
    }
    goBack = () => {
        router.goBack();
    }
    /** 跳转历史纪录 */
    goHistory = () => {
        router.push('/funds_history')
    }
    /** 跳转入金 */
    goFundsIn = () => {
        const { dispatch, login, funds, fundsIn } = this.props;
        const { companyId } = login.user;
        const { socket } = this.context;
        const { account } = funds;
        const { accountType, isCCenter, isDeleted, isUsing, version } = fundsIn;
        dispatch({
            type: 'fundsIn/reqFundsIn',
            payload: {
                socket, params: {
                    accountId: account.accountId,
                    accountType,
                    companyId,
                    isCCenter,
                    isDeleted,
                    isUsing,
                    version,
                }
            }
        })
        dispatch({
            type: 'fundsIn/updateSerialNumber',
            payload: { serialNumber: '' }
        })
        router.push('/funds_in');
    }
    /** 跳转出金 */
    goFundsOut = () => {
        const { dispatch, login, fundsOut } = this.props;
        const { companyId } = login.user;
        const { socket } = this.context;
        const { isCCenter, isDeleted, isUsing, version } = fundsOut;
        dispatch({
            type: 'fundsOut/reqfundsOut',
            payload: {
                socket, params: {
                    companyId,
                    isCCenter,
                    isDeleted,
                    isUsing,
                    version,
                }
            }
        })
        dispatch({
            type: 'fundsOut/updateWithDrawAmount',
            payload: { withdrawAmount: '' }
        })
        dispatch({
            type: 'fundsOut/updateWithDrawReason',
            payload: { withdrawReason: '' }
        })
        router.push('/funds_out');
    }
    /** 拿到 socket 服务结果 */
    handleResponse = (response) => {
        const { dispatch } = this.props;
        const { socket } = this.context;
        if (response.messageName === FundsMsgName.ACCOUNT_BALANCE) {
            dispatch({
                type: 'funds/reqBalanced',
                payload: { socket, response }
            })
        }
        if (response.messageName === FundsMsgName.ACCOUNT_RECORD) {
            dispatch({
                type: 'funds/reqFundsRecorded',
                payload: { socket, response, pageNumber }
            })
        }
        if (response.messageName === FundsMsgName.FUNDS_DYNAMIC && response.MVCID === FundsMVCID.FundsUpdate) {
            pageNumber = 0;
            dispatch({
                type: 'funds/reqBalanced',
                payload: { socket, response }
            })
            dispatch({
                type: 'funds/reqFundsRecorded',
                payload: { socket, response, pageNumber }
            })
        }
    }
    loadData(fundsRecordOptions) {
        const { dispatch, funds } = this.props;
        const { socket } = this.context;
        const { accountId } = funds.account
        dispatch({
            type: 'funds/reqFundsRecord',
            payload: { socket, params: { ...fundsRecordOptions, accountId } }
        });
    }

    render() {
        const { funds } = this.props;
        const { account, isVisible } = funds;
        const imageSrc = isVisible ? images.EYES_ON : images.EYES_OFF;
        const YU_E = isVisible ? account.balanceStr : '******';
        return (
            <div className="page-container">
                <Event event="svevent" handler={this.handleResponse} />
                <div className={styles.bgTop}>
                    <NavBar
                        key='funds'
                        icon={<Icon type="left" />}
                        onLeftClick={this.goBack}
                        rightContent={[
                            <span onClick={this.goHistory} >历史纪录</span>
                        ]}
                    >资金账户</NavBar>
                    <div className={styles.balanceWrap}>
                        <div className={styles.balanceLabel}>资金余额（元）</div>
                        <div className={styles.balance}>
                            <div className={styles.balanceNo}>{YU_E}</div>
                            <div className={styles.eyes} >
                                <img src={imageSrc} onClick={this.handleEyes} alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.menubar}>
                    <div className={styles.menusub} onClick={this.goFundsIn} >
                        <div className={styles.subs} >
                            <img src={images.EYES_ON} alt="" />
                        </div>
                        <div className={styles.subs} >入金</div>
                    </div>
                    <div className={styles.menusub} onClick={this.goFundsOut} >
                        <div className={styles.subs} >
                            <img src={images.EYES_ON} alt="" />
                        </div>
                        <div className={styles.subs} >出金</div>
                    </div>
                </div>
                <div className={styles.recentTitie}>近期资金记录</div>
                <RefreshListView
                    ref={el => this.lv = el}
                    useBodyScroll={false}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    refreshState={funds.refreshState}
                    onHeaderRefresh={this.onHeaderRefresh}//下拉刷新
                    onFooterRefresh={this.onFooterRefresh}//上拉加载
                    footerFailureText='我擦嘞，居然失败了，点我加载 =.=!'
                />
            </div>
        )
    }
    renderRow = (rowData, sectionID, rowID) => {
        return <RecordListItem key={rowID} item={rowData} />;
    }
    onHeaderRefresh = () => {
        //下拉刷新数据
        pageNumber = 0;
        let fundsRecordOptions = mergeFundsRecordOptions({ pageNumber });
        this.loadData(fundsRecordOptions);
    }
    onFooterRefresh = () => {
        //上拉加载更多数据
        const time = Date.parse(new Date()) / 1000;
        if (time - loadMoreTime > 1) {
            pageNumber += 1;
            let fundsRecordOptions = mergeFundsRecordOptions({ pageNumber });        
            this.loadData(fundsRecordOptions);
            loadMoreTime = Date.parse(new Date()) / 1000;
        }
    }
}
const mapStateToProps = ({ login, funds, fundsIn, fundsOut }) => ({
    login,
    funds,
    fundsIn,
    fundsOut
})
export default connect(mapStateToProps)(FundsPage);