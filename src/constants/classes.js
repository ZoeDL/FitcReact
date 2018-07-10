/*
 * 数据类元（测试版）
 * @Author: Honye 
 * @Date: 2018-03-22 11:39:33 
 * @Last Modified by: Honye
 * @Last Modified time: 2018-03-23 08:40:40
 */
'use strict';

class Base {

    constructor(base) {
        Object.assign(this, base);
    }

    static parse(base) {
        let data = json2obj(base);
        
        return new Deal({
            tags: data.tags,
            status: data.status, 
            moneny: data.moneny, 
            expiried: data.expiried, 
            interest: data.interest, 
            createTime: data.createTime, 
            number: data.number
        });
    }
}

function json2obj(json) {
    if(typeof json === 'string') {
        try {
            return JSON.parse(json);
        } catch(err) {
            throw new SyntaxError("JSON 字符格式错误");
        }
    } else if( typeof json === 'function') {
        return json2obj( json() );
    } else if( typeof json === 'object') {
        return json;
    } else {
        throw new SyntaxError("无法转换为 JSON 对象")
    }
}

export class Deal extends Base {

    static parse(base) {
        return super.parse(base);
    }
};

