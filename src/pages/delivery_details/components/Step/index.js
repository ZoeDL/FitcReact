/*
 * @Author: Honye 
 * @Date: 2018-04-13 16:38:45 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-04-13 16:41:46
 */
'use strict';

import React from 'react';

import Description from './Description';

class Step extends React.PureComponent {

    render() {
        return React.Children.only(this.props.children)
    }
}

Step.Description = Description;

export default Step;