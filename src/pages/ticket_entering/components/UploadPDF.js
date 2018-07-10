import React from 'react';
import { Upload } from 'antd';
import styles from './UploadPDF.less';
import images from '../../../constants/Images';

class UploadPDF extends React.Component {
    
    render() {
        const {defaultProps} = this.props;
        return (
            <div className={styles.pdfIcon}>
                <Upload {...defaultProps}>
                    <img src={images.UPLOAD_PDF} alt="上传PDF" />
                </Upload>
            </div>
        )
    }
}

export default UploadPDF;