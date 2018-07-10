/*
 * 个人信息
 * @Author: Honye 
 * @Date: 2018-03-24 14:43:37 
 * @Last Modified by: zhangyuhao
 * @Last Modified time: 2018-04-24 09:59:24
 */
'use strict';

import React from 'react';
import { NavBar, Icon, List, Toast } from 'antd-mobile';
import { Upload } from 'antd';
import router from 'umi/router';
import styles from './page.less';
import { connect } from 'dva';
import images from '../../constants/Images';
import { getImage, config } from '../../constants/Config';
import { ImageUpload } from '../../constants/TopicName';
// import Upload from 'rc-upload';

const Item = List.Item;


class UserinfoPage extends React.Component {
    constructor(props) {
        super(props)
        const { login, dispatch } = props;
        const { user, token } = login;
        const { userId, name, phoneNumber, phoneNumber2 } = user;
        this.uploadProps = {
            action: `${config.webUrl}/${ImageUpload.uerImage}`,
            multiple: true,
            data: { token: token, userId: userId },
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
                    dispatch({
                        type: 'userInfo/modifyAvatar',
                        payload: {
                            userId,
                            token,
                            name,
                            phoneNumber,
                            phoneNumber2,
                            avatar: ret.data
                        }
                    })
                } else {
                    Toast.fail('上传失败！')
                }
            },
            onError(err) {
                Toast.hide();
                Toast.fail('上传失败！')
            },
            beforeUpload(file, fileList) {
                Toast.loading('正在上传，请稍后', 0)
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(file);
                    }, 3000);
                });
            },
        }
    }

    goBack = () => {
        router.goBack()
    }

    goName = () => {
        router.push('./userinfo_modify_name')
    }
    goPhone = () => {
        router.push('./userinfo_modify_phone')
    }

    onImgError = () => {
        const avatar = this.refs.avatar;
        avatar.src = images.DEFAULT_AVATAR;
    }

    handleChange = ({ fileList, file }) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'userInfo/handleChange',
            payload: {
                fileList,
            }
        })
    }

    render() {
        const { login } = this.props;
        const { user } = login;
        const avatar = user.avatar ? getImage(user.avatar) : images.DEFAULT_AVATAR;
        return (
            <div className="page-container">
                <NavBar
                    icon={<Icon type="left" />}
                    onLeftClick={this.goBack}
                >个人信息</NavBar>
                <List>
                    <Item className={`row-cell ${styles.firstItem}`}>
                        <div className={styles.item}>
                            <div className={styles.itemLeft}>头像</div>
                            <div className={styles.itemRight}>
                                <Upload {...this.uploadProps}>
                                    <img className={styles.avatar} src={avatar} alt="avatar" onError={this.onImgError} ref="avatar" />
                                </Upload>
                            </div>
                        </div>
                    </Item>
                    <Item className="row-cell">
                        <div className={styles.item}>
                            <div className={styles.itemLeft}>公司名称</div>
                            <div className={styles.itemRight}>{user.companyName}</div>
                        </div>
                    </Item>
                    <Item className="row-cell" arrow="horizontal" onClick={this.goName}>
                        <div className={styles.item}>
                            <div className={styles.itemLeft}>称谓</div>
                            <div className={styles.itemRight}>{user.name}</div>
                        </div>
                    </Item>
                    <Item className="row-cell" >
                        <div className={styles.item}>
                            <div className={styles.itemLeft}>常用联系电话</div>
                            <div className={styles.itemRight}>{user.phoneNumber}</div>
                        </div>
                    </Item>
                    <Item className="row-cell" arrow="horizontal" onClick={this.goPhone}>
                        <div className={styles.item}>
                            <div className={styles.itemLeft}>备用联系电话</div>
                            <div className={styles.itemRight}>{user.phoneNumber2}</div>
                        </div>
                    </Item>
                    <Item className="row-cell">
                        <div className={styles.item}>
                            <div className={styles.itemLeft}>登录用户名</div>
                            <div className={styles.itemRight}>{user.loginName}</div>
                        </div>
                    </Item>
                </List>

            </div>
        )
    }
}

const mapStateToProps = ({ login, userInfo }) => ({
    login,
    userInfo,
})

export default connect(mapStateToProps)(UserinfoPage);