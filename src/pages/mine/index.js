/*
 * 
 * @Author: Honye 
 * @Date: 2018-03-15 17:22:35 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-04-04 08:40:42
 */
'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import styles from './index.css';
import router from 'umi/router';
import { List, Toast, ActionSheet, Modal } from 'antd-mobile';
import { connect } from 'dva';
import images from '../../constants/Images';
import { getImage } from '../../constants/Config';
import NativeShare from 'nativeshare';

const Item = List.Item;

const dataList = [
    { url: images.WEIXIN, title: '微信朋友圈' },
    { url: images.WEIXIN_FRIEND, title: '微信好友' },
].map(item => ({
    icon: <img src={item.url} alt={item.title} style={{ width: 36 }} />,
    title: item.title,
}))

const nativeShare = new NativeShare()

class MinePage extends React.Component {

    state = {
        visible: false,
        title: '',
        desc: '',
        index: 0
    }

    /**
     * @param {String} pathname 路径
     */
    onItemPress = (pathname) => () => {
        router.push(pathname)
    }

    /**
     * 头像点击事件
     */
    onHeaderPress = () => {
        const { hasLogined } = this.props;
        router.push(hasLogined ? '/userinfo' : '/login')
    }

    //银行账户管理
    toBankCard = () => {
        const { hasLogined } = this.props;
        router.push(hasLogined ? '/bank_account' : '/login')
    }
    //跳转资金管理
    goFunds = () => {
        const { hasLogined } = this.props;
        router.push(hasLogined ? '/funds' : '/login')
    }

    /** 跳转出票记录 */
    goTicketRecord = () => {
        const { hasLogined } = this.props;
        router.push(hasLogined ? '/ticket_record' : '/login')
    }

    //跳转公司资料认证
    goCompany = () => {
        const { hasLogined } = this.props;
        router.push(hasLogined ? '/company' : '/login')
    }

    onAvatarError = () => {
        ReactDOM.findDOMNode(this.avatar).src = images.DEFAULT_AVATAR;
    }

    //联系客服
    onKeFuClick = () => {
        const { dispatch } = this.props;
        dispatch({
            type: "mine/reqKeFuPhone"
        })
    }

    showShareActionSheet = () => {
        ActionSheet.showShareActionSheetWithOptions({
            options: dataList,
        },
            (buttonIndex) => {
                if (buttonIndex >= 0) {
                    // this.shareTo(dataList[buttonIndex].title)
                    this.setState({
                        index: buttonIndex
                    })
                    this.showModel();
                } else {
                    return
                }
            });
    }

    showModel = () => {
        this.setState({
            visible: true,
        })
    }

    onCloseModal = () => {
        this.setState({
            visible: false
        })
    }

    onChange = key => (e) => {
        this.setState({
            [key]: e.target.value
        })
    }

    shareTo = () => {
        this.onCloseModal();
        nativeShare.setShareData({
            icon: images.APP_ICON,
            link: window.location.href,
            title: this.state.title,
            desc: this.state.desc,
        })
        let title = dataList[this.state.index].title;
        let command = '';
        if (title === '微信朋友圈') {
            command = 'wechatTimeline'
        } else if (title === '微信好友') {
            command = 'wechatFriend'
        } else {
            return
        }
        try {
            nativeShare.call(command)
        } catch (error) {
            Toast.info('请使用浏览器分享')
        }


    }

    render() {
        const { hasLogined, userinfo } = this.props;
        const avatar = getImage(userinfo.avatar);
        return (
            <div className="page-container">
                <div className={styles.avatarWrap} onClick={this.onHeaderPress}>
                    <div className={styles.avatarContainer}>
                        <img className={styles.avatar} src={avatar} alt="avatar" ref={el => this.avatar = el} onError={this.onAvatarError} />
                        <div className={styles.company}>{userinfo.companyName || '未登录'}</div>
                        {hasLogined && <div>—— {userinfo.name} ——</div>}
                    </div>
                </div>
                <List className={styles.list}>
                    <Item className="row-cell" arrow="horizontal" onClick={this.goFunds}>资金管理</Item>
                    <Item className="row-cell" arrow="horizontal" onClick={this.toBankCard}>银行账户管理</Item>
                </List>
                <List className={styles.list}>
                    <Item className="row-cell" arrow="horizontal" onClick={this.goTicketRecord}>出票记录</Item>
                    <Item className="row-cell" arrow="horizontal" onClick={this.goCompany}>公司资料认证</Item>
                </List>
                <List className={styles.list}>
                    <Item className="row-cell" arrow="horizontal" onClick={this.onKeFuClick} >联系客服</Item>
                    <Item className="row-cell" onClick={this.onItemPress('setting')} arrow="horizontal">系统设置</Item>
                </List>
                <List className={styles.list}>
                    <Item className="row-cell" arrow="horizontal" onClick={this.showShareActionSheet} >
                        分享
                    </Item>
                </List>
                <div ref={el => this.share = el} ></div>
                <Modal
                    visible={this.state.visible}
                    transparent
                    onClose={this.onCloseModal}
                    footer={[{ text: '取消', onPress: () => { this.onCloseModal() } }, { text: '确认', onPress: () => { this.shareTo() } }]}
                >
                    <div className={styles.shareWrap}>
                        <div className={styles.shareTitle}>
                            <input type="text" placeholder="请在此输入分享标题" onChange={this.onChange('title')} />
                        </div>
                        <div className={styles.shareDesc}>
                            <textarea placeholder="请在此输入分享描述" onChange={this.onChange('desc')} ></textarea>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = ({ login, mine }) => ({
    hasLogined: login.isLogined,
    userinfo: login.user,
    token: login.token,
    mine
})

export default connect(mapStateToProps)(MinePage);