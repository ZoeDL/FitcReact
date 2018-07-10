import React from 'react';
import { NavBar, Icon, ListView } from 'antd-mobile';
import router from 'umi/router';
import images from '../../constants/Images';
import styles from './page.less';
import DropDownMenu from './components/DropDownMenu';
import TicketRow from './components/TicketRow';
import { connect } from 'dva';
import Event from '../../socket/Event';
import PropTypes from 'prop-types';
import { TicketMsgName } from '../../constants/TopicName';
import mergeTicketListOptions from './entity/ticketlist';
import RefreshListView, { RefreshState } from '../../components/RefreshListView';

let pageNumber = 0;
let loadMoreTime = 0;

const listData = [
    {
        code: 0,
        label: '票面金额'
    },
    {
        code: 1,
        label: '剩余天数'
    },
    {
        code: 2,
        label: '审核状态'
    },
];

const data = [
    [
        {
            value: ['', ''],
            label: '不限',
        }, {
            value: [10000000, ''],
            label: '1000万以上',
        },
        {
            value: [5000000, 10000000],
            label: '500 - 1000万',
        },
        {
            value: [3000000, 5000000],
            label: '300 - 500万',
        },
        {
            value: [1000000, 3000000],
            label: '100 - 300万',
        },
        {
            value: ['', 1000000],
            label: '小于100万',
        },
    ],
    [
        {
            value: ['', ''],
            label: '不限',
        }, {
            value: [180, ''],
            label: '6个月以上',
        },
        {
            value: [90, 180],
            label: '3 - 6个月',
        },
        {
            value: [30, 90],
            label: '1 - 3个月',
        },
        {
            value: ['', 30],
            label: '小于30天',
        },
    ],
    [
        {
            value: '',
            label: '不限',
        }, {
            value: 0,
            label: '未审核',
        },
        {
            value: 1,
            label: '审核中',
        },
        {
            value: 2,
            label: '审核失败',
        },
        {
            value: 3,
            label: '审核通过',
        },
    ]
];

class TicketRecordPage extends React.Component {
    static contextTypes = {
        socket: PropTypes.object.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            tabindex: 0,
            selected: 0,
            selected1: 0,
            selected2: 0,
            dataSource: new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 }),
        }
    }

    goBack = () => {
        router.goBack();
    }

    goEntry = () => {
        router.push('/ticket_entering');
    }

    onTitleClick = (tabindex) => {
        this.setState(prevState => ({
            show: !prevState.show,
            tabindex: tabindex
        }))
    }

    onItemClick = (index) => {
        pageNumber = 0;
        this.lv.scrollToTop();
        if (this.state.tabindex === 0) {
            this.setState({
                selected: index
            })
            let moneyOptions = data[0][index].value;
            let lastDaysOptions = data[1][this.state.selected1].value;
            let statusOptions = data[2][this.state.selected2].value;
            let TicketListOptions = mergeTicketListOptions({
                minTicketPrice: moneyOptions[0],
                maxTicketPrice: moneyOptions[1],
                minLastDays: lastDaysOptions[0],
                maxLastDays: lastDaysOptions[1],
                status: statusOptions,
                page: pageNumber
            });
            this.loadData(TicketListOptions);
        }
        if (this.state.tabindex === 1) {
            this.setState({
                selected1: index
            })
            let moneyOptions = data[0][this.state.selected].value;
            let lastDaysOptions = data[1][index].value;
            let statusOptions = data[2][this.state.selected2].value;
            let TicketListOptions = mergeTicketListOptions({
                minTicketPrice: moneyOptions[0],
                maxTicketPrice: moneyOptions[1],
                minLastDays: lastDaysOptions[0],
                maxLastDays: lastDaysOptions[1],
                status: statusOptions,
                page: pageNumber
            });
            this.loadData(TicketListOptions);
        }
        if (this.state.tabindex === 2) {
            this.setState({
                selected2: index
            })
            let moneyOptions = data[0][this.state.selected].value;
            let lastDaysOptions = data[1][this.state.selected1].value;
            let statusOptions = data[2][index].value;
            let TicketListOptions = mergeTicketListOptions({
                minTicketPrice: moneyOptions[0],
                maxTicketPrice: moneyOptions[1],
                minLastDays: lastDaysOptions[0],
                maxLastDays: lastDaysOptions[1],
                status: statusOptions,
                page: pageNumber
            });
            this.loadData(TicketListOptions);
        }
        this.setState({
            show: !this.state.show
        })
    }

    onMaskClick = () => {
        this.setState({
            show: !this.state.show
        })
    }

    componentDidMount() {
        document.body.style.overflow = 'hidden';
        let TicketListOptions = mergeTicketListOptions();
        this.loadData(TicketListOptions);
    }

    componentWillReceiveProps(newProps) {
        const { ticketlist } = newProps;
        const { TicketList, refreshState } = ticketlist;
        if (refreshState === RefreshState.NoMoreData || refreshState === RefreshState.Failure) {
            pageNumber -= 1;
        }
        if (pageNumber < 0) pageNumber = 0;

        if (TicketList && TicketList.length > 0 && TicketList !== this.props.dataSource) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows([...TicketList])
            });
        } else {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows([])
            });
        } 
    }

    loadData(params) {
        const { dispatch } = this.props;
        const { socket } = this.context;
        dispatch({
            type: 'ticketlist/reqTicketList',
            payload: { socket, params }
        })
    }

    /** 拿到 socket 服务结果 */
    handleResponse = (response) => {
        const { dispatch } = this.props;
        if (response.messageName === TicketMsgName.RecordList) {
            dispatch({
                type: 'ticketlist/resTicketList',
                payload: { response, pageNumber }
            })
        }
    }

    renderRow = (rowData, sectionID, rowID) => {
        return <TicketRow key={rowID} data={rowData} />;
    }

    onHeaderRefresh = () => {
        //下拉刷新数据
        pageNumber = 0;
        let moneyOptions = data[0][this.state.selected].value;
        let lastDaysOptions = data[1][this.state.selected1].value;
        let statusOptions = data[2][this.state.selected2].value;
        let TicketListOptions = mergeTicketListOptions({
            minTicketPrice: moneyOptions[0],
            maxTicketPrice: moneyOptions[1],
            minLastDays: lastDaysOptions[0],
            maxLastDays: lastDaysOptions[1],
            status: statusOptions,
            page: pageNumber
        });
        this.loadData(TicketListOptions);
    }

    onFooterRefresh = () => {
        //上拉加载更多数据
        const time = Date.parse(new Date()) / 1000;
        if (time - loadMoreTime > 1) {
            pageNumber += 1;
            let moneyOptions = data[0][this.state.selected].value;
            let lastDaysOptions = data[1][this.state.selected1].value;
            let statusOptions = data[2][this.state.selected2].value;
            let TicketListOptions = mergeTicketListOptions({
                minTicketPrice: moneyOptions[0],
                maxTicketPrice: moneyOptions[1],
                minLastDays: lastDaysOptions[0],
                maxLastDays: lastDaysOptions[1],
                status: statusOptions,
                page: pageNumber
            });
            this.loadData(TicketListOptions);
            loadMoreTime = Date.parse(new Date()) / 1000;
        }
    }

    render() {
        const { selected, selected1, selected2, show, tabindex } = this.state;
        const { ticketlist } = this.props;
        const { refreshState } = ticketlist;
        let selectCilcked = selected, dataClicked = data[0];
        if (tabindex === 0) {
            selectCilcked = selected;
            dataClicked = data[0]
        }
        if (tabindex === 1) {
            selectCilcked = selected1;
            dataClicked = data[1]
        }
        if (tabindex === 2) {
            selectCilcked = selected2;
            dataClicked = data[2];
        }
        return (
            <div className="page-container">
                <Event event="svevent" handler={this.handleResponse} />
                <NavBar
                    icon={<Icon type="left" />}
                    onLeftClick={this.goBack}
                    rightContent={<img src={images.ICON_ADD} alt="add" className={styles.add} onClick={this.goEntry} />}
                >出票记录</NavBar>
                <div className={styles.menuGroup}>
                    <div className={styles.menu}>
                        <div className={tabindex === 0 ? (show ? styles.active : null) : null} onClick={() => this.onTitleClick(0)} >
                            {selected ? data[0][selected].label : listData[0].label}
                            <Icon type={tabindex === 0 ? (show ? 'up' : 'down') : 'down'} size="xs" />
                        </div>
                    </div>
                    <div className={styles.menu}>
                        <div className={tabindex === 1 ? (show ? styles.active : null) : null} onClick={() => this.onTitleClick(1)} >
                            {selected1 ? data[1][selected1].label : listData[1].label}
                            <Icon type={tabindex === 1 ? (show ? 'up' : 'down') : 'down'} size="xs" />
                        </div>
                    </div>
                    <div className={styles.menu}>
                        <div className={tabindex === 2 ? (show ? styles.active : null) : null} onClick={() => this.onTitleClick(2)} >
                            {selected2 ? data[2][selected2].label : listData[2].label}
                            <Icon type={tabindex === 2 ? (show ? 'up' : 'down') : 'down'} size="xs" />
                        </div>
                    </div>
                </div>
                <DropDownMenu selected={selectCilcked} data={dataClicked} show={show} onItemClick={this.onItemClick} onMaskClick={this.onMaskClick} />
                <RefreshListView
                    ref={el => this.lv = el}
                    useBodyScroll={false}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    refreshState={refreshState}
                    onHeaderRefresh={this.onHeaderRefresh}//下拉刷新
                    onFooterRefresh={this.onFooterRefresh}//上拉加载
                    footerFailureText='我擦嘞，居然失败了，点我加载 =.=!'
                />
            </div>
        )
    }
}

const mapStateToProps = ({ ticketlist }) => ({
    ticketlist
})

export default connect(mapStateToProps)(TicketRecordPage);
