/*
 * @Author: zhangyuhao 
 * @Date: 2018-03-24 14:48:09 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-04-08 17:39:08
 * 通用页面，用来显示 加载中，数据为空，加载失败
 */

import React from 'react';
import { ActivityIndicator } from 'antd-mobile';
import PropTypes from 'prop-types';

export const LoadingState = {
  Idle: 0,//
  Loading: 1,//加载中
  Empty: 2,//为空
  Failure: 3,//失败
}

const LoadingView = ({ refreshState, onReload }) => {
  if (refreshState) {
    if (refreshState === LoadingState.Loading) {
      return <Loading />
    } else if (refreshState === LoadingState.Empty) {
      return <Empty />
    } else if (refreshState === LoadingState.Failure) {
      return <Failure onReload={onReload} />
    } else {
      return null;
    }
  } else {
    return <Loading />
  }
};
const Loading = () => {
  return (
    <div style={styles.loadingContainer}>
      <div style={styles.align}>
        <ActivityIndicator size="large" />
        <span style={{ marginTop: 8 }}>数据正在加载...</span>
      </div>
    </div>
  )
}
const Empty = () => {
  return (
    <div style={styles.emptyContainer}>
      数据为空
    </div>
  )
}
const Failure = ({ onReload }) => {
  return (
    <div style={styles.emptyContainer}
    onClick={()=>{
      onReload && onReload()
    }}>
      加载失败，点击重试
    </div>
  )

}

LoadingView.propTypes = {
  refreshState: PropTypes.number.isRequired,  // 显示状态
  onReload: PropTypes.func,                   // 失败时点击按钮回调
}

LoadingView.Idle = 0;    //
LoadingView.Loading = 1; // 加载中
LoadingView.Empty = 2;   // 为空
LoadingView.Failure = 3; // 失败

const styles = {
  loadingContainer: {
    display: 'flex',
    paddingTop: 40,
    justifyContent: 'center',
  },
  align: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    paddingTop: 40,
    textAlign: 'center',
    color:'#595959'

  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
}

export default LoadingView;
