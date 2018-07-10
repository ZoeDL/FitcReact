import React from 'react';
import { Upload } from 'antd';
import {getImage} from '../../../constants/Config';
import styles from './screenShot.less';
import images from '../../../constants/Images';
import Image from '../../../components/Image';


class ScreenShot extends React.PureComponent{
    state = {
        imageUrl: "" 
    };
    
    componentWillReceiveProps(nextProps){
        this.setState({
            imageUrl: nextProps.onPreview? getImage(nextProps.onPreview) : images.NOTE_UPLOAD   
        })
    }

 

    render() {
        const {action, handleChange, onPreview} = this.props; 
        return (
            <div className={styles.container}>
                <div className={styles.text}>{this.props.text}</div>
                <Upload
                    listType="picture-card"
                    showUploadList={false}
                    action={action}
                    onChange={handleChange}
                    onPreview={onPreview}
                    className={styles.upload}
                >
                    <Image type="contain" url={this.state.imageUrl} rate={2}/>
                    {/* <img className={ styles.image } src={this.state.imageUrl} alt="票面截图" />  */}
                </Upload>
            </div>
        );
    }
}


export default ScreenShot;

