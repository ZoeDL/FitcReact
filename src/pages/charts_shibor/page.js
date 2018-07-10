import React from 'react';
import ReactDOM from 'react-dom';
import styles from './page.less';
import { Icon } from 'antd-mobile';
import router from 'umi/router';
import TabsControl from '../charts/components/TabsControl';
import { connect } from 'dva';
import toFixedNum, {forehead, gains} from './entity/shibor';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/dataZoom';

const tabs = [
    { title: 'O/N', value: 'O/N',},
    { title: '1W', value: '1W',},
    { title: '2W', value: '2W',},
    { title: '1M', value: '1M',},
    { title: '3M', value: '3M',},
    { title: '6M', value: '6M',},
    { title: '9M', value: '9M', },
    { title: '1Y', value: '1Y',},
];

class ShiborEchartPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'Shibor - 3M',
            currentIndex: 4,
            params:{
                period: '3M',
                type: 'day',
            },
        }
    }

    /** 时间区间切换 */
    onTimeTabsClick = (index, item) => {
        this.setState({
            title: `Shibor - ${item.title}`,
            currentIndex: index,
            params: {
                ...this.state.params,
                period: item.value,
            }
        }, () => this.fetchReq())
        const Echart = echarts.init(this.refs.chart);
        Echart.dispatchAction({
            type: 'hideTip',
            
        })
    }

    /** 请求shibor图表数据 */
    fetchReq = () => {
        const {dispatch} = this.props;
        const {params} = this.state;
        dispatch({
            type: 'shibor/reqShiborData',
            payload: params
        })
    }

    goBack = () => {
        window.onresize = null;
        router.goBack()
    }

    /** 设置图表容器宽高 */
    setContainer = () => {
        const chart = this.refs.chart;
        chart.style.width = document.documentElement.clientWidth + 'px';
        chart.style.height = (document.documentElement.clientHeight - ReactDOM.findDOMNode(chart).offsetTop) + 'px';
    }

    /** Echarts渲染 */
    renderEchart() {
        this.setContainer()
        const Echart = echarts.init(this.refs.chart);
        window.onresize = () => {
            this.setContainer()
            Echart.resize()
        }
    }

    /** 设置Echarts图表options */
    setEchartsOptions = (shibor) => {
        const {shibor_data} = shibor;
        const Echart = echarts.init(this.refs.chart);
        if (shibor_data.length === 0) {
            Echart.clear()
            return
        }
        const X_data = shibor_data.map( (item) => item.timeStamps );
        const series_data = shibor_data.map( (item) => toFixedNum(item.price) );
        const options = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type:'cross',
                    lineStyle:{
                        color:'#b87333'
                    },
                },
                formatter: (params) => {
                    let res = '时间：' + params[0].axisValue;
                    res += '<br />当前 : ' + params[0].value + '  涨额 : ' + forehead(shibor_data[params[0].dataIndex].upAmount) + '  涨幅 : ' + gains(shibor_data[params[0].dataIndex].upRelease);
                    return res;
                }
            },
            xAxis: {
                type: 'category',
                data: X_data,
                axisLine: {
                    lineStyle: {
                        color:'#696969'
                    }
                },
                splitLine:{
                    show: true,
                    lineStyle: {
                        color:['#696969']
                    }
                },
                axisPointer: {
                    label: {
                        show: false
                    }
                },
            },
            yAxis: {
                type: 'value',
                scale: true,
                axisLine: {
                    lineStyle: {
                        color:'#696969'
                    }
                },
                splitLine:{
                    lineStyle: {
                        color:['#696969']
                    }
                },
                axisPointer: {
                    label: {
                        show: false
                    }
                },
            },
            dataZoom: {
                type: 'inside'
            },
            series: [{
                data: series_data,
                type: 'line',
                symbol: 'none',
                lineStyle: {
                    color:'#CD6409',
                    width: 1
                }
            }]
        }
        Echart.setOption(options);
        Echart.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: shibor_data.length - 1
        })
    }

    componentDidMount() {
        this.fetchReq();
        this.renderEchart();
    }

    componentWillReceiveProps(nextProps) {
        const { shibor } = nextProps;
        this.setEchartsOptions(shibor)
    }

    render() {
        const {currentIndex, title} = this.state;
        return (
            <div className='page-container'>
                <div className={styles.header}>
                    <div className={styles.title}>{title}</div>
                    <div className={styles.iconBox} ><Icon type='cross-circle' color='#FFF' size='xs' onClick={this.goBack} /></div>
                </div>
                <div className={styles.navbar}>
                    <div className={styles.subnavbar}>
                        <TabsControl tabs={tabs} onClick={this.onTimeTabsClick} currentIndex={currentIndex} />
                    </div>
                    <div className={styles.subnavbar1}></div>
                </div>
                <div ref="chart"></div>
            </div>
        )
    }
}

const mapStateToProps = ({ shibor }) => ({
    shibor
})

export default connect(mapStateToProps)(ShiborEchartPage);