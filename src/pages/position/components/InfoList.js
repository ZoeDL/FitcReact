/*
 * @Author: Honye 
 * @Date: 2018-03-20 14:43:19 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-03-20 15:08:44
 */
'use strict';
import React from 'react';
import SwipeItem from './InfoRow';
import styles from './InfoList.less';
import router from 'umi/router';

class InfoList extends React.Component {
    onItemClick = (id, type) =>{ 
         router.push({
            pathname: '/details',
            query: {
                id: id,
                type: type,
                from: this.props.from
            },
        })
    }

    render() {
        const {data, type} = this.props;
        return (
            <div className={styles.container}>
                {
                    data.map((item, index) => {
                        return <SwipeItem key={item.inventId} data={item} type={type}
                                       onClick={() => this.onItemClick(item.inventId, type)}/>
                    })
                }
            </div>
        )
    }
}



export default InfoList;