import React from 'react';
import ReactDOM from 'react-dom';
import { Icon, Toast } from 'antd-mobile';
import styles from './page.less';
import TabsControl from './components/TabsControl';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import Event from '../../socket/Event';
import { MarketChartMsgName, MarketChartMVCID } from '../../constants/TopicName';
import forehead, {gains, XData, showTime, calculateMA, showLegend} from './entity/chart';
import convertUtil from '../../utils/convertUtil';
import router from 'umi/router';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/candlestick';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/dataZoom';

const tabs = [
    { title: '1天', value: '04', data_type: 'O-' },
    { title: '1周', value: '05', data_type: 'F-' },
    { title: '1月', value: '06', data_type: 'T-' },
    { title: '3月', value: '01', data_type: 'S-' },
    { title: '6月', value: '02', data_type: 'L-' },
    { title: '1年', value: '03', data_type: 'D-' },
    { title: '全部', value: '', data_type: 'D-' },
];

class MarketChartPage extends React.Component {
    static contextTypes = {
        socket: PropTypes.object.isRequired,
    }

    constructor(props) {
        super(props)
        const {item} = props.location.query;
        this.state = {
            requestOptions: {
                averageType: '5',//间隔时间
                bankType: item.bankType,//GG-国股，CS-城商，SN-三农
                dataType: 'O-',//时间类型 1分：O-,5分：F-,10分：T-,15分：E-，30分：S- 60分：L-,日：D-,周：W-,月：M-
                lineType: '折线',//折线,K线
                period: '04',//时间区间段 一天：04，一周：05，一月：06，三月：01，六月：02，一年：03。该值不传则加载所有
                ticketType: item.ticketType,//电银-ETICKET
                tradeType: item.tradeType,//交易类型 直贴/贴现：01，转让：03
                version: 1,
            },
            currentIndex: 0,
            title: convertUtil.shiborConvert(item.bankType) + convertUtil.tradeTypeConvert(item.tradeType),
            lineSelector:['折线', 'K线'],
            dateSelector:[
                {text:'1分', value: 'O-'},
                {text:'5分', value: 'F-'},
                {text:'10分', value: 'T-'},
            ],
        }
    }

    goBack = () => {
        window.onresize = null;
        router.goBack()
    }

    /** 折线/K线切换 */
    handleLineTypeChange = (e) => {
        this.setState({
            requestOptions: {
                ...this.state.requestOptions,
                lineType: e.target.value
            }
        }, () => this.fetchPosts())
        const Echart = echarts.init(this.refs.chart);
        Echart.dispatchAction({
            type: 'hideTip',
            
        })
    }

    /** 时间类型切换 */
    handleDateTypeChange = (e) => {
        this.setState({
            requestOptions: {
                ...this.state.requestOptions,
                dataType: e.target.value
            }
        }, () => this.fetchPosts())
        const Echart = echarts.init(this.refs.chart);
        Echart.dispatchAction({
            type: 'hideTip',
            
        })
    }

    /** 时间区间onClick方法 */
    onTimeTabsClick = (index, item) => {
        let time = [];
        let line = ['折线', 'K线'];
        let {lineType} = this.state.requestOptions;
        if (index === 0) {
            time = [
                {text:'1分', value: 'O-'},
                {text:'5分', value: 'F-'},
                {text:'10分', value: 'T-'},
            ];
        }else if (index === 1) {
            time = [
                {text:'5分', value: 'F-'},
                {text:'15分', value: 'E-'},
                {text:'30分', value: 'S-'},
            ];
        }else if (index === 2) {
            time = [
                {text:'10分', value: 'T-'},
                {text:'30分', value: 'S-'},
                {text:'60分', value: 'L-'},
            ];
        }else if (index === 3) {
            time = [
                {text:'30分', value: 'S-'},
                {text:'60分', value: 'L-'},
                {text:'日', value: 'D-'},
            ];
        }else if (index === 4) {
            time = [
                {text:'60分', value: 'L-'},
                {text:'日', value: 'D-'},
            ];
        }else if (index === 5) {
            time = [
                {text:'日', value: 'D-'},
                {text:'周', value: 'W-'},
            ];
        }else if (index === 6) {
            time = [
                {text:'日', value: 'D-'},
                {text:'周', value: 'W-'},
                {text:'月', value: 'M-'},
            ];
            line = ['K线'];
            lineType = 'K线'
        }
        this.setState({
            currentIndex: index,
            requestOptions: {
                ...this.state.requestOptions,
                period: item.value,
                dataType: item.data_type,
                lineType,
            },
            dateSelector: time,
            lineSelector: line,
        }, () => this.fetchPosts())
        const Echart = echarts.init(this.refs.chart);
        Echart.dispatchAction({
            type: 'hideTip',
            
        })
    }

    /** 设置chart容器宽高 */
    setContainer = () => {
        const chart = this.refs.chart;
        chart.style.width = document.documentElement.clientWidth + 'px';
        chart.style.height = (document.documentElement.clientHeight - ReactDOM.findDOMNode(chart).offsetTop) + 'px';
    }

    /** 请求获取Echart数据 */
    fetchPosts = () => {
        const { dispatch } = this.props;
        const { socket } = this.context;
        const { requestOptions } = this.state;
        dispatch({
            type: 'charts/reqChartData',
            payload: {
                socket, params: {
                    ...requestOptions,
                }
            }
        })
    }

    componentDidMount() {
        this.fetchPosts();
        this.renderEchart();
    }

    componentWillReceiveProps(nextProps) {
        const { charts } = nextProps;
        this.setEchartOptions(charts)
    }

    /** 拿到 socket 服务结果 */
    handleResponse = (response) => {
        const { dispatch } = this.props;
        const {dataType} = this.state.requestOptions;
        if (response.messageName === MarketChartMsgName.QUERY_X) {
            dispatch({
                type: 'charts/resX',
                payload: { response }
            })
        }
        if (response.messageName === MarketChartMsgName.QUERY_DATA) {
            dispatch({
                type: 'charts/resChartData',
                payload: { response }
            })
        }
        if (response.messageName === MarketChartMsgName.UPDATE) {
            if (response.MVCID === MarketChartMVCID.O_UPDATE) { //1分钟图
                if (dataType === 'O-') {
                    this.fetchPosts()
                }
            }
            if (response.MVCID === MarketChartMVCID.F_UPDATE) { //5分钟图
                if (dataType === 'F-') {
                    this.fetchPosts()
                }
            }
            if (response.MVCID === MarketChartMVCID.T_UPDATE) { //10分钟图
                if (dataType === 'T-') {
                    this.fetchPosts()
                }
            }
            if (response.MVCID === MarketChartMVCID.E_UPDATE) { //15分钟图
                if (dataType === 'E-') {
                    this.fetchPosts()
                }
            }
            if (response.MVCID === MarketChartMVCID.S_UPDATE) { //30分钟图
                if (dataType === 'S-') {
                    this.fetchPosts()
                }
            }
            if (response.MVCID === MarketChartMVCID.L_UPDATE) { //60分钟图
                if (dataType === 'L-') {
                    this.fetchPosts()
                }
            }
        }
        
    }

    render() {
        const { currentIndex, dateSelector, lineSelector } = this.state;
        return (
            <div className='page-container'>
                <Event event="svevent" handler={this.handleResponse} />
                <div className={styles.header}>
                    <div className={styles.title}>{this.state.title}</div>&nbsp;&nbsp;|&nbsp;&nbsp;
                    <div>图表：</div>
                    <div>
                        <select className={styles.selectBox} onChange={(e) => this.handleLineTypeChange(e)} >
                            {
                                lineSelector.map((item, index) => {
                                    if (item === this.state.requestOptions.lineType) {
                                        return <option key={index} value={item} selected='selected'>{item}</option>
                                    } else {
                                        return <option key={index} value={item}>{item}</option>
                                    }
                                })
                            }
                        </select>
                        <select className={styles.selectBox} onChange={(e) => this.handleDateTypeChange(e)}>
                            {
                                dateSelector.map((item, index) => {
                                    if (item.value === this.state.requestOptions.dataType) {
                                        return <option key={index} value={item.value} selected='selected'>{item.text}</option>
                                    } else {
                                        return <option key={index} value={item.value}>{item.text}</option>
                                    }
                                })
                            }
                        </select>
                    </div>
                    <div className={styles.iconBox} ><Icon type='cross-circle' color='#FFF' size='xs' onClick={this.goBack} /></div>
                </div>
                <div className={styles.navbar}>
                    <div className={styles.subnavbar}>
                        <TabsControl tabs={tabs} onClick={this.onTimeTabsClick} currentIndex={currentIndex} />
                    </div>
                    <div className={styles.subnavbar1}>
                        
                    </div>
                </div>
                <div ref="chart"></div>
            </div>
        )
    }

    setEchartOptions = (charts) => {
        const { chartData } = charts;
        const {requestOptions} = this.state;
        const Echart = echarts.init(this.refs.chart);
        const option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type:'line',
                    label:{
                        show: true,
                    },
                    lineStyle:{
                        color:'#b87333'
                    },
                },
            },
            xAxis :{
                type : 'category',
                boundaryGap : false,
                axisLine: {
                    lineStyle:{
                        color:'#696969'
                    }
                },
                splitLine: {
                    show: false,
                    lineStyle:{
                        color:'#696969'
                    }
                }
            },
            yAxis :{
                type : 'value',
                scale: true,
                axisLine: {
                    lineStyle:{
                        color:'#696969'
                    }
                },
                axisLabel : {
                    formatter: (value, index) => {return index === 0 ? value : value.toFixed(2)},
                    textStyle: {
                        color: '#696969'
                    }
                },
                splitLine: {
                    show: false,
                    lineStyle:{
                        color:'#696969'
                    }
                }
            },
            series: [
                {
                    name:'国股',
                    type:'line',
                    symbol: "none",
                    
                },
                {
                    name:'城商',
                    type:'line',
                    symbol: "none",
                },
                {
                    name:'三农',
                    type:'line',
                    symbol: "none",
                },
            ]
        }
        if (chartData.length === 0) {
            Echart.clear()
            Toast.info('当前暂无数据')
            return
        }
        Echart.setOption(option);
        let X_data =  XData( this.state.currentIndex, chartData)
        Echart.setOption({
            xAxis:{
                show: true,
                data: X_data
            },
            yAxis:{
                show: true,
            },
            dataZoom: [{
                type: 'inside'
            }],
        });
        if (requestOptions.lineType === '折线') {
            if (requestOptions.bankType === 'GG') {
                let GG_data = chartData.map( (item) => (item.closePrice.toFixed(2)) );
                Echart.setOption({
                    tooltip: {
                        trigger: 'axis',
                        formatter: function(params) {
                            if(params[0].dataIndex === 0) {
                                return
                            }
                            let res = '时间 : ' + showTime(requestOptions.dataType, chartData[params[0].dataIndex].timeStamps);
                            res += '<br/>  当前 : ' + chartData[params[0].dataIndex].closePrice.toFixed(2) + '  涨额 : ' + forehead(chartData[params[0].dataIndex].closePrice, chartData[0].closePrice);
                            res += '<br/>  均价 : ' + chartData[params[0].dataIndex].price.toFixed(2) + '  涨幅 : ' + gains(chartData[params[0].dataIndex].closePrice, chartData[0].closePrice);
                            return res;
                        }
                    },
                    series: [
                        {
                            name: '国股',
                            data: GG_data,
                            lineStyle:{
                                color: 'orangered',
                                width: 1
                            },
                        },
                        {
                            name: 'MA5',
                            data: null,
                        }
                    ]
                })
            }
            if (requestOptions.bankType === 'CS') {
                let CS_data = chartData.map( (item) => (item.closePrice.toFixed(2)) );
                Echart.setOption({
                    tooltip: {
                        trigger: 'axis',
                        formatter: function(params) {
                            if(params[0].dataIndex === 0) {
                                return
                            }
                            let res = '时间 : ' + showTime(requestOptions.dataType, chartData[params[0].dataIndex].timeStamps);
                            res += '<br/>  当前 : ' + chartData[params[0].dataIndex].closePrice.toFixed(2) + '  涨额 : ' + forehead(chartData[params[0].dataIndex].closePrice, chartData[0].closePrice);
                            res += '<br/>  均价 : ' + chartData[params[0].dataIndex].price.toFixed(2) + '  涨幅 : ' + gains(chartData[params[0].dataIndex].closePrice, chartData[0].closePrice);
                            return res;
                        }
                    },
                    series: [
                        {
                            name: '城商',
                            data: CS_data,
                            lineStyle:{
                                color: '#0000cd',
                                width: 1
                            },
                        },
                        {
                            name: 'MA5',
                            data: null,
                        }
                    ]
                })
            }
            if (requestOptions.bankType === 'SN') {
                let SN_data = chartData.map( (item) => (item.closePrice.toFixed(2)) );
                Echart.setOption({
                    tooltip: {
                        trigger: 'axis',
                        formatter: function(params) {
                            if(params[0].dataIndex === 0) {
                                return
                            }
                            let res = '时间 : ' + showTime(requestOptions.dataType, chartData[params[0].dataIndex].timeStamps);
                            res += '<br/>  当前 : ' + chartData[params[0].dataIndex].closePrice.toFixed(2) + '  涨额 : ' + forehead(chartData[params[0].dataIndex].closePrice, chartData[0].closePrice);
                            res += '<br/>  均价 : ' + chartData[params[0].dataIndex].price.toFixed(2) + '  涨幅 : ' + gains(chartData[params[0].dataIndex].closePrice, chartData[0].closePrice);
                            return res;
                        }
                    },
                    series: [
                        {
                            name: '三农',
                            data: SN_data,
                            lineStyle:{
                                color: 'yellow',
                                width: 1
                            },
                        },
                        {
                            name: 'MA5',
                            data: null,
                        }
                    ]
                })
            }
        }
        if (requestOptions.lineType === 'K线') {
            if (requestOptions.bankType === 'GG') {
                let GG_data = chartData.map( (item) => {return  [item.openPrice.toFixed(2), item.closePrice.toFixed(2), item.minPrice.toFixed(2), item.maxPrice.toFixed(2), item.price.toFixed(2)]} );
                Echart.setOption({
                    tooltip: {
                        trigger: 'axis',
                        formatter: function(params) {
                            if(params[0].dataIndex === 0) {
                                return
                            }
                            let legends = showLegend(params);
                            let res = '时间 : ' + showTime(requestOptions.dataType, chartData[params[0].dataIndex].timeStamps);
                            res += '<br/>  开盘 : ' + chartData[params[0].dataIndex].openPrice.toFixed(2) + '  最高 : ' + chartData[params[0].dataIndex].maxPrice.toFixed(2);
                            res += '<br/>  收盘 : ' + chartData[params[0].dataIndex].closePrice.toFixed(2) + '  最低 : ' + chartData[params[0].dataIndex].minPrice.toFixed(2) ;
                            res += '<br/>  涨额 : ' + forehead(chartData[params[0].dataIndex].closePrice, chartData[params[0].dataIndex - 1].closePrice) + '  涨幅 : ' + gains(chartData[params[0].dataIndex].closePrice, chartData[params[0].dataIndex - 1].closePrice);
                            res += '<br/>' + legends.map((item, index) => {
                                    if (item[0] === 'MA5') {
                                        return `<span key={index} className=${styles.ma5} >${item[0] + ' : '} ${item[1]} </span>`
                                    }else if (item[0] === 'MA10') {
                                        return `<span key={index} className=${styles.ma10} >${item[0] + ' : '} ${item[1]} </span>`
                                    }else if (item[0] === 'MA20') {
                                        return `<span key={index} className=${styles.ma20} >${item[0] + ' : '} ${item[1]} </span>`
                                    }
                                });                            
                            return res;
                        }
                    },
                    series: [
                        {
                            name: '国股',
                            type: 'candlestick',
                            data: GG_data,
                            itemStyle: {
                                normal: {
                                    color: '#FA0000',
                                    color0: '#06B800',
                                    borderColor: null,
                                    borderColor0: null
                                }
                            },
                        },
                        {
                            name: 'MA5',
                            type: 'line',
                            data: calculateMA(5,chartData),
                            smooth: true,
                            lineStyle: {
                                normal: {
                                    color: 'blue',
                                    width: 1
                                }
                            }
                        },
                    ]
                })
            }
            if (requestOptions.bankType === 'CS') {
                let CS_data = chartData.map( (item) => {return  [item.openPrice.toFixed(2), item.closePrice.toFixed(2), item.minPrice.toFixed(2), item.maxPrice.toFixed(2), item.price.toFixed(2)]} );
                Echart.setOption({
                    tooltip: {
                        trigger: 'axis',
                        formatter: function(params) {
                            if(params[0].dataIndex === 0) {
                                return
                            }
                            let legends = showLegend(params);
                            let res = '时间 : ' + showTime(requestOptions.dataType, chartData[params[0].dataIndex].timeStamps);
                            res += '<br/>  开盘 : ' + chartData[params[0].dataIndex].openPrice.toFixed(2) + '  最高 : ' + chartData[params[0].dataIndex].maxPrice.toFixed(2) ;
                            res += '<br/>  收盘 : ' + chartData[params[0].dataIndex].closePrice.toFixed(2) + '  最低 : ' + chartData[params[0].dataIndex].minPrice.toFixed(2) ;
                            res += '<br/>  涨额 : ' + forehead(chartData[params[0].dataIndex].closePrice, chartData[params[0].dataIndex - 1].closePrice) + '  涨幅 : ' + gains(chartData[params[0].dataIndex].closePrice, chartData[params[0].dataIndex - 1].closePrice);
                            res += '<br/>' + legends.map((item, index) => {
                                if (item[0] === 'MA5') {
                                    return `<span key={index} className=${styles.ma5} >${item[0] + ' : '} ${item[1]} </span>`
                                }else if (item[0] === 'MA10') {
                                    return `<span key={index} className=${styles.ma10} >${item[0] + ' : '} ${item[1]} </span>`
                                }else if (item[0] === 'MA20') {
                                    return `<span key={index} className=${styles.ma20} >${item[0] + ' : '} ${item[1]} </span>`
                                }
                            });    
                            return res;
                        }
                    },
                    series: [
                        {
                            name: '城商',
                            type: 'candlestick',
                            data: CS_data,
                            itemStyle: {
                                normal: {
                                    color: '#FA0000',
                                    color0: '#06B800',
                                    borderColor: null,
                                    borderColor0: null
                                }
                            },
                        },
                        {
                            name: 'MA5',
                            type: 'line',
                            data: calculateMA(5,chartData),
                            smooth: true,
                            lineStyle: {
                                normal: {
                                    color: 'blue',
                                    width: 1
                                }
                            }
                        },
                    ]
                })
            }
            if (requestOptions.bankType === 'SN') {
                let SN_data = chartData.map( (item) => {return  [item.openPrice.toFixed(2), item.closePrice.toFixed(2), item.minPrice.toFixed(2), item.maxPrice.toFixed(2), item.price.toFixed(2)]} );
                Echart.setOption({
                    tooltip: {
                        trigger: 'axis',
                        formatter: function(params) {
                            if(params[0].dataIndex === 0) {
                                return
                            }
                            let legends = showLegend(params);
                            let res = '时间 : ' + showTime(requestOptions.dataType, chartData[params[0].dataIndex].timeStamps);
                            res += '<br/>  开盘 : ' + chartData[params[0].dataIndex].openPrice.toFixed(2) + '  最高 : ' + chartData[params[0].dataIndex].maxPrice.toFixed(2) ;
                            res += '<br/>  收盘 : ' + chartData[params[0].dataIndex].closePrice.toFixed(2) + '  最低 : ' + chartData[params[0].dataIndex].minPrice.toFixed(2) ;
                            res += '<br/>  涨额 : ' + forehead(chartData[params[0].dataIndex].closePrice, chartData[params[0].dataIndex - 1].closePrice) + '  涨幅 : ' + gains(chartData[params[0].dataIndex].closePrice, chartData[params[0].dataIndex - 1].closePrice);
                            res += '<br/>' + legends.map((item, index) => {
                                if (item[0] === 'MA5') {
                                    return `<span key={index} className=${styles.ma5} >${item[0] + ' : '} ${item[1]} </span>`
                                }else if (item[0] === 'MA10') {
                                    return `<span key={index} className=${styles.ma10} >${item[0] + ' : '} ${item[1]} </span>`
                                }else if (item[0] === 'MA20') {
                                    return `<span key={index} className=${styles.ma20} >${item[0] + ' : '} ${item[1]} </span>`
                                }
                            });   
                            return res;
                        }
                    },
                    series: [
                        {
                            name: '三农',
                            data: SN_data,
                            type: 'candlestick',
                            itemStyle: {
                                normal: {
                                    color: '#FA0000',
                                    color0: '#06B800',
                                    borderColor: null,
                                    borderColor0: null
                                }
                            },
                        },
                        {
                            name: 'MA5',
                            type: 'line',
                            data: calculateMA(5,chartData),
                            smooth: true,
                            lineStyle: {
                                normal: {
                                    color: 'blue',
                                    width: 1
                                }
                            }
                        },
                    ]
                })
            }
        }
        Echart.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: chartData.length - 1
        })
    }

    /** Echart渲染 */
    renderEchart() {
        this.setContainer()
        const Echart = echarts.init(this.refs.chart);
        window.onresize = () => {
            this.setContainer()
            Echart.resize()
        }
    }



}

const mapStateToProps = ({ charts }) => ({
    charts
})

export default connect(mapStateToProps)(MarketChartPage);