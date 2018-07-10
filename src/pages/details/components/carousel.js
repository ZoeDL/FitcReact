/*
 * @Author: Zoe 
 * @Date: 2018-03-24 11:42:29 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-03-24 11:46:43
 */
'use strict';

import React from 'react';
import { Carousel } from 'antd-mobile';
import styles from './carousel.less';
import Images from '../../../constants/Images';
import * as config from '../../../constants/Config';
import Image from '../../../components/Image';


class Carousels extends React.Component{
    state = {
        data: [],
        slideIndex: 0,
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.imgurl){
            const urls = nextProps.imgurl;
            this.setState({
                data: urls.split(";").map(url => config.getImage(url))
            })
        }
    }
   
    render() {
        const { status } = this.props;
        const lock = status === "A02" &&
            <div className={styles.lock}>
                <img src={Images.ICON_LOCK} style={{ width: '2em', height: '2em' }} alt="lock" />
            </div>
        return (
            <div className={styles.container}>
                <Carousel autoplay={false} infinite selectedIndex={0}>
                   {  
                    this.state.data.map((val, index) => (
                        <Image url={val} alt="票据照片" key={index} rate={2} type='contain'/>
                    ))}
                </Carousel>
                {lock}
            </div>
            )
        }
}

export default Carousels;