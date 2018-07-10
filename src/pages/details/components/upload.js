import React from 'react';
import styles from './upload.less';
import images from '../../../constants/Images';


class Upload extends React.Component{
    render(){
        return(
            <div className={styles.upload}>
                <div className={styles.container}>
                    <img src={images.PDF_UPLOAD}
                        alt="upload contract"
                        style={{ backgroundColor: 'white', width: '2em', height: '2em', display: 'block', margin: '15px auto' }} />
                    <div style={{ color: 'black', textAlign: 'center' }}>合同附件</div>
                </div>
            </div> 
        )
    }
}

export default Upload;