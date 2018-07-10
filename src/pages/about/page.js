/*
 * @Author: Honye 
 * @Date: 2018-03-16 16:47:05 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-03-16 16:57:39
 */
'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { NavBar, Icon } from 'antd-mobile';
import router from 'umi/router';
import {about} from '../../constants/Config';

class AboutPage extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            height: document.documentElement.clientHeight
        }
    }

    goBack = () => {
        router.goBack()
    }

    componentDidMount() {
        const hei = this.state.height - ReactDOM.findDOMNode(this.ifr).offsetTop;
        this.setState({
            height: hei
        })
    }


    render() {
        return (
            <div className="page-container">
                <NavBar
                    icon={<Icon type="left" />}
                    onLeftClick={this.goBack}
                >关于我们</NavBar>
                <div>
                    <iframe 
                        ref={el => this.ifr = el}
                        title="关于我们"
                        src={about.aboutUs} 
                        frameborder="0"
                        style={{
                            height: this.state.height,
                            overflow: 'auto',
                            width: "100%" 
                        }} 
                    ></iframe>
                </div>
            </div>
        )
    }
}

export default AboutPage;