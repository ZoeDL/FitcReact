/*
 * web 存储
 * @Author: Honye 
 * @Date: 2018-04-14 17:09:53 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-04-14 17:28:22
 */
'use strict';

/**
 * 存
 * @param {String} key Key
 * @param {*} data 需存储数据
 */
export function setItem(key, data) {
    if(typeof Storage !== 'undefined') {
        const type = typeof data;
        if(type === 'object') {
            sessionStorage.setItem(key, JSON.stringify(data))
        } else if(type === 'string' || type === 'number') {
            sessionStorage.setItem(key, data+'')
        } else {
            console.error('存储错误类型！')
        }
    }
}

/**
 * 取
 * @param {String} key Key
 * @return {String} 结果
 */
export function getItem(key) {
    if(typeof Storage !== 'undefined') {
        return sessionStorage.getItem(key)
    }
    return null;
}

export default {
    setItem,
    getItem
}