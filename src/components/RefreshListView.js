import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom'
import { ListView, PullToRefresh } from 'antd-mobile';
import Config from '../constants/Config';
import LoadingView, { LoadingState } from './LoadingView';
export const RefreshState = {
    Idle: 0,
    HeaderRefreshing: 1,
    FooterRefreshing: 2,
    NoMoreData: 3,
    Failure: 4,
    Empty: 5,
}

const DEBUG = false
const log = (text) => { DEBUG && console.log(text) }

class RefreshListView extends PureComponent {

    static defaultProps = {
        footerRefreshingText: '玩命加载中…',
        footerFailureText: '点击重新加载',
        footerNoMoreDataText: '--我是有底线的--',
        pullTopRefreshEnable:true//默认开启下拉刷新
    }
    state = {
        listHeight: document.documentElement.clientHeight * 3 / 4,
    }
    componentDidMount() {
        // const hei = document.documentElement.clientHeight-45;//-ReactDOM.findDOMNode(this.lv).offsetTop;
        const lvdom=ReactDOM.findDOMNode(this);
        // const lvdom=document.getElementById("lv")
        const hei = document.documentElement.clientHeight-lvdom.offsetTop;
        
        this.setState({
            listHeight: hei,
        });
    }
    componentWillReceiveProps(nextProps) {
        log('[RefreshListView]  RefreshListView componentWillReceiveProps ' + nextProps.refreshState)
    }

    componentDidUpdate(prevProps, prevState) {
        log('[RefreshListView]  RefreshListView componentDidUpdate ' + prevProps.refreshState)
    }

    onHeaderRefresh = (obj) => {
        log('[RefreshListView]  onHeaderRefresh')

        if (this.shouldStartHeaderRefreshing()) {
            log('[RefreshListView]  onHeaderRefresh')
            this.props.onHeaderRefresh(obj, RefreshState.HeaderRefreshing)
        }
    }

    onEndReached = (obj, info) => {
        if (this.shouldStartFooterRefreshing()) {
            log('[RefreshListView]  onFooterRefresh')
            this.props.onFooterRefresh && this.props.onFooterRefresh(obj, RefreshState.FooterRefreshing)
        }
    }

    shouldStartHeaderRefreshing = () => {
        log('[RefreshListView]  shouldStartHeaderRefreshing')

        if (this.props.refreshState === RefreshState.HeaderRefreshing ||
            this.props.refreshState === RefreshState.FooterRefreshing) {
            return false
        }
        return true
    }

    shouldStartFooterRefreshing = () => {
        log('[RefreshListView]  shouldStartFooterRefreshing')

        let { refreshState, data } = this.props
        if (data&&data.length < Config.pageSize) {
            return false
        }

        return (refreshState === RefreshState.Idle)
    }
    // 滚动到顶部
    scrollToTop(){
        this.scrollTo(0,0);
    }
    //滚动到指定位置
    scrollTo(x,y){
        this.lv.scrollTo(x,y);
    }
    render() {
        log('[RefreshListView]  render')

        let { refreshState, isWrap, emptyText,pullTopRefreshEnable, ...rest } = this.props

        if (refreshState === RefreshState.Empty) {
            return (<LoadingView refreshState={LoadingState.Empty} />)
        }
        if(pullTopRefreshEnable){
            return (
                <ListView
                    ref={el => this.lv = el}
                    renderFooter={this.renderFooter}
                    // style={{
                    //     height: this.state.listHeight,
                    //     overflow: 'auto',
                    // }}
                    useBodyScroll={this.props.useBodyScroll}
                    style={this.props.useBodyScroll ? {} : {
                        height: this.state.listHeight,
                        // border: '1px solid #ddd',
                        margin: '5px 0',
                      }}
                    pullToRefresh={<PullToRefresh
                        refreshing={this.props.refreshState === RefreshState.HeaderRefreshing}
                        onRefresh={this.onHeaderRefresh}
                    />}
                    pageSize={Config.pageSize}
                    scrollRenderAheadDistance={500}
                    onEndReached={this.onEndReached}
                    onEndReachedThreshold={10}
                    {...rest}
                />
            );
        }else{
            return (
                <ListView
                    ref={el => this.lv = el}
                    renderFooter={this.renderFooter}
                    // style={{
                    //     height: this.state.listHeight,
                    //     overflow: 'auto',
                    // }}
                    useBodyScroll={this.props.useBodyScroll}
                    style={this.props.useBodyScroll ? {} : {
                        height: this.state.listHeight,
                        // border: '1px solid #ddd',
                        margin: '5px 0',
                      }}
                    pageSize={Config.pageSize}
                    scrollRenderAheadDistance={500}
                    onEndReached={this.onEndReached}
                    onEndReachedThreshold={10}
                    {...rest}
                />
            );
        }
       
    }

    renderFooter = () => {
        let footer = null

        // let footerContainerStyle = [styles.footerContainer, this.props.footerContainerStyle]
        // let footerTextStyle = [styles.footerText, this.props.footerTextStyle]
        let { footerRefreshingText, footerFailureText, footerNoMoreDataText, obj } = this.props

        switch (this.props.refreshState) {
            case RefreshState.Idle:
                footer = (<div style={{ padding: 30, textAlign: 'center' }}>
                    {footerRefreshingText}
                </div>)
                break
            case RefreshState.Failure: {
                footer = (<div style={{ padding: 30, textAlign: 'center' }}
                    onClick={() => {
                        this.props.onFooterRefresh && this.props.onFooterRefresh(obj, RefreshState.FooterRefreshing)
                    }}>
                    {footerFailureText}
                </div>)
                break
            }
            case RefreshState.FooterRefreshing: {
                footer = (<div style={{ padding: 30, textAlign: 'center' }}>
                    {footerRefreshingText}
                </div>)
               
                break
            }
            case RefreshState.NoMoreData: {
                footer = (<div style={{ padding: 30, textAlign: 'center' }}>
                    {footerNoMoreDataText}
                </div>)
             
                break
            }
            default:
                break;
        }

        return footer
    }
}



export default RefreshListView