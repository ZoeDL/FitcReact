import React from 'react';
import { Upload } from 'antd';
import images from '../../../constants/Images';
import * as styles from './ImageUploader.less';
import {getImage} from '../../../constants/Config';

class ImageUploader extends React.Component {

    render() {

        const { action, accept, business, onBeforeUpload, onStart, onSuccess, onError  } = this.props;
        return (
            <div className={styles.photo}>
                <Upload
                    accept={accept}
                    action={action}
                    beforeUpload={onBeforeUpload}
                    onStart={onStart}
                    onSuccess={onSuccess}
                    onError={onError}
                >
                    <img src={ business ? getImage(business) : images.COMPANY_UPLOAD} alt="营业执照" />
                </Upload>
            </div>
        );
    }
}

export default ImageUploader;