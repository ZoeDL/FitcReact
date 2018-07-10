/*
 * 投诉
 * @Author: Honye 
 * @Date: 2018-04-25 18:59:16 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-04-28 17:22:13
 */
'use strict';

import React from 'react';
import { NavBar, Icon, Button, ActionSheet } from 'antd-mobile';
import { Upload, message, Modal  } from 'antd';
import Event from '../../socket/Event';
import PropTypes from 'prop-types';
import router from 'umi/router';
import { connect } from 'dva';
import { config } from '../../constants/Config';
import { ImageUpload, DeliveryName } from "../../constants/TopicName";
import styles from './page.less';

class ReportPage extends React.PureComponent {

    constructor(props) {
        super(props);
        this.buttons = ['交易投诉', '交易仲裁', '交割违约', '其他类型', '取消']
        this.state = {
            person: '',
            phone: '',
            content: '',
            messageType: 1,
            uploadPicUrl: '',
            fileList: [],
            previewVisible: false,
            previewImage: '',
        }
    }

    handleCommit = () => {
        const { dispatch } = this.props;
        const { socket } = this.context;
        const { person, phone, content, messageType, fileList } = this.state;
        const { tradeId } = this.props.location.query;
        dispatch({
            type: 'report/reqReport',
            payload: {
                socket,
                params: {
                    tradeId, person, phone,
                    content, messageType,
                    uploadPicUrl: fileList.map((item) => item.response.data).join(',')
                }
            }
        })
    }

    showActionSheet = () => {
        ActionSheet.showActionSheetWithOptions({
            options: this.buttons,
            cancelButtonIndex: this.buttons.length-1,
            maskCloseable: true,
        }, (buttonIndex) => {
            if(buttonIndex<4 && buttonIndex>=0) {
                this.setState({
                    messageType: buttonIndex + 1
                })
            }
        })
    }

    onInputChange = (key) => (e) => {
        this.setState({
            [key]: e.target.value
        })
    }

    handleChange = ({ file, fileList }) => {
        this.setState({ fileList })
    }

    handleCancel = () => this.setState({ previewVisible: false })

    handlePreview = (file) => {
        this.setState({
          previewImage: file.url || file.thumbUrl,
          previewVisible: true,
        });
    }

    handleResponse = (response) => {
        const { dispatch } = this.props;
        switch(response.messageName) {
            case DeliveryName.REPORT:
                dispatch({
                    type: 'report/resReport',
                    payload: { response }
                })
                break;
            default:
                break;
        }
    }

    render() {
        const { messageType } = this.state;
        const { previewVisible, previewImage, fileList } = this.state;
        const { tradeNo } = this.props.location.query;

        const uploadButton = (
            <div>
              <Icon type={this.state.loading ? 'loading' : 'plus'} />
              <div className="ant-upload-text">图片上传</div>
            </div>
        );

        return (
            <div>
                <NavBar
                    icon={<Icon type="left" />}
                    onLeftClick={ router.goBack }
                >投诉</NavBar>
                <div>
                    <div>
                        <div className={ styles.rowcell } onClick={ this.showActionSheet }>
                            <span>类型：</span>
                            <span>
                                <span>{ this.buttons[messageType-1] }</span>
                                <Icon type="right" />
                            </span>
                        </div>
                        <div className={ styles.rowcell }>
                            <span>交易编号：</span>
                            <span>
                                <span>{ tradeNo }</span>
                            </span>
                        </div>
                        <div className={ styles.rowcell }>
                            <span>联系人：</span>
                            <input placeholder="请输入联系人姓名" onChange={ this.onInputChange('person') } />
                        </div>
                        <div className={ styles.rowcell }>
                            <span>联系电话：</span>
                            <input placeholder="请输入联系人电话" onChange={ this.onInputChange('phone') } />
                        </div>
                    </div>
                    <div className={ styles.comment }>
                        <div>
                            <textarea placeholder="请简要描述您遇到的麻烦/建议，我们会在第一时间处理" 
                                onChange={ this.onInputChange('content') }
                            />
                        </div>
                        <Upload className={styles.uploader}
                            accept="image/*"
                            listType="picture-card"
                            action={`${config.webUrl}/${ImageUpload.commonImage}`}
                            beforeUpload={ beforeUpload }
                            onChange={ this.handleChange }
                            onPreview={ this.handlePreview }
                        >
                            { fileList.length >= 3 ? null : uploadButton }
                        </Upload>
                        <div style={{clear:'both'}}></div>
                    </div>
                    <Button onClick={ this.handleCommit } className={ styles.button } >提交</Button>
                </div>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="preview" style={{ width: '100%' }} src={previewImage} />
                </Modal>
                <Event event="svevent" handler={ this.handleResponse } />
            </div>
        )
    }
}

function beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
      message.error('You can only upload JPG file!');
    }
    return isJPG;
}

ReportPage.contextTypes = {
    socket: PropTypes.object.isRequired,
}

export default connect()(ReportPage);