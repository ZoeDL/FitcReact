import fetch from 'dva/fetch';

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * 拼接参数
 * @param {Object} params 参数对象
 */
function parseParams(params) {
    let paramArr = [];
    for(let key in params) {
        paramArr.push(`${key}=${params[key]}`);
    }
    return paramArr.join('&');
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  return fetch(url, {...defaultOptions,...options})
    .then(checkStatus)
    .then(parseJSON)
    .then(data => ({ data }))
    .catch(err => ({ err }));
}

//TODO 用户 ID 和 token 自动获取补充
const defaultOptions = {
    url: '',
    method: 'GET',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: {}
}

/**
 * 网络请求
 * @param {Object} options 参数对象
 * @param {String} options.url     请求地址
 * @param {String} options.method  请求方式
 * @param {Object} options.headers 请求头
 * @param {Object} options.body    请求参数体
 */
export function fetchReq({ url, method, headers, body } = defaultOptions) {

    let pUrl = url, 
        options = { 
            method, 
            headers: { ...defaultOptions.headers, ...headers },
            body:{ ...defaultOptions.body, ...body }
        };

    if(Object.keys(body).length > 0) {
        if(method.toUpperCase()==='POST') {
            options.body = parseParams(body)
        } else if(method.toUpperCase()==='GET') {
            pUrl = `${url}?${parseParams(body)}`
        }
    }

    return fetch(pUrl, options)
        .then(checkStatus)
        .then(parseJSON)
        .then(res => res)
        .catch(err => err)
}
