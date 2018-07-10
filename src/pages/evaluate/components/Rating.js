/*
 * 评价五星
 * @Author: Honye 
 * @Date: 2018-04-27 10:27:28 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-04-27 14:57:19
 */
'use strict';

import React from 'react';
import images from '../../../constants/Images';
import PropTypes from 'prop-types';
import styles from './Rating.less';

class Rating extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            stars: props.stars,
            current: null
        }
    }

    handleClick = (value) => () => {
        const { onChange, max, canHalf, disabled } = this.props;
        if(disabled) return;
        const { current } = this.state;
        const newStar = current===value && canHalf ? value*(max/5)-(max/5/2) : value*(max/5)
        this.setState({
            stars: newStar,
            current: current===value && canHalf ?null:value
        })
        onChange && onChange(newStar)
    }

    render() {
        const { stars } = this.state;
        const { max } = this.props;
        return (
            <div className={ styles.wrapper }>
            {
                [1,2,3,4,5].map((value, index) => (
                    <span onClick={ this.handleClick(value) } key={ value }>
                        <span>
                            <img alt="icon" src={ images.IC_UNSTAR} />
                        </span>
                        <span
                            style={{ width:
                                stars >= (max/5)*value ? '2em'
                                : stars < (max/5)*(value-1) ? 0 
                                : (stars*10)%(max/5*10)/(max/5*10)*2 + 'em'
                            }}
                        >
                            <img alt="icon" 
                                src={ images.IC_STARED } 
                            />
                        </span>
                    </span>
                ))
            }
            </div>
        )
    }
}

Rating.propTypes = {
    stars: PropTypes.number,
    onChange: PropTypes.func,
}

Rating.defaultProps = {
    stars: 5,
    max: 5,
    canHalf: false
}



export default Rating;