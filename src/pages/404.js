/*
 * 公用 404 页面
 * @Author: Honye 
 * @Date: 2018-03-15 10:42:50 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-03-15 15:14:32
 */
'use strict';
import styles from './index.css';

export default () => {
    return (
        <div className={styles.normal}>
            <h1 className={styles.title}>Not Found!</h1>
            <div className={styles.welcome} />
        </div>
    )
}