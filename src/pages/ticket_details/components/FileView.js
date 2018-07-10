import React from 'react';
import styles from './FileView.less';
import images from '../../../constants/Images';

class Upload extends React.Component{

    render(){
        const {delshow, onDelClick, toFile} = this.props;
        const delIcon = <span className={styles.del} onClick={onDelClick} ><img src={images.IC_NO} alt="delete" /></span>;
        return(
            <div className={styles.upload}>
                <div className={styles.container} onClick={toFile}>
                    <img src={images.PDF_UPLOAD}
                        alt="upload contract"
                        style={{ backgroundColor: 'white', width: '2em', height: '2em', display: 'block', margin: '15px auto' }} />
                    <div style={{ color: 'black', textAlign: 'center' }}>合同附件</div>
                    { delshow ? delIcon : null}
                </div>
            </div> 
        )
    }
}

export default Upload;