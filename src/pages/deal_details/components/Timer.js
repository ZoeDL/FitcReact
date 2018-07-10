/*
 * 计时器
 * @Author: Honye 
 * @Date: 2018-04-16 16:04:40 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-05-17 10:01:51
 */
'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import styles from './Timer.less';

class Timer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            h: '-',  // 时
            m: '-',  // 分
            s: '-',  // 秒
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.ms !== this.props.ms) {
            this.start(nextProps.ms)
        }
    }

    componentDidMount() {
        const { ms } = this.props;
        this.start(ms)
    }

    start = (ss) => {
        let { increase, maxValue, minValue } = this.props;
        let ms = ss;
        this.timer && clearInterval(this.timer)
        this.timer = setInterval(() => {
            if ((minValue !== 0 || ms>=minValue) && (maxValue !== 0 || ms<=maxValue) ) {
                this.setState({
                    h: getHMS(ms)[0],
                    m: getHMS(ms)[1],
                    s: getHMS(ms)[2]
                })
                ms = increase ? ms+1000 : ms-1000;
            } else {
                this.timer && clearInterval(this.timer)
                this.setState({
                    h: '-',
                    m: '-',
                    s: '-'
                })
            }
        }, 1000)
    }

    componentWillUnmount() {
        this.timer && clearInterval(this.timer)
    }

    render() {
        const { h, m, s } = this.state;
        return (
            <span className={styles.timer}>
                <span className={styles.timeDot}>{h}</span>&nbsp;:&nbsp;
                <span className={styles.timeDot}>{m}</span>&nbsp;:&nbsp;
                <span className={styles.timeDot}>{s}</span>
            </span>
        )
    }
}

/**
 * 获取时分秒
 * @param {Number} ss 毫秒
 * @return {Array} [h,m,s]
 */
function getHMS(SS) {
    const ls = parseInt(SS/1000, 10);  // 剩余总秒
    const s = b0(ls%60);     // 剩余秒
    const lm = parseInt(ls/60, 10);    // 剩余总分
    const m = b0(lm%60);     // 剩余分
    const h = b0(parseInt(lm/60, 10));     // 剩余总时
    return [h, m, s];
}

/**
 * 小于10补0
 * @param {Number} number 数
 */
function b0(number) {
    if (number < 10 && number >= 0) {
        return '0' + number;
    }
    return number + ''
}

Timer.propTypes = {
    ms: PropTypes.number,        // 毫秒数
    increase: PropTypes.bool,    // 正计时
    maxValue: PropTypes.number,  // 最大值
    minValue: PropTypes.number,  // 最小值
}

Timer.defaultProps = {
    minValue: 0,
    maxValue: null
}

export default Timer;