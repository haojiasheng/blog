/*
function post(url, data) {
    return new Promise((resolve, reject) => {
        const xml = new XMLHttpRequest();
        xml.open('POST', url);
        xml.withCredentials = true;
        xml.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xml.onreadystatechange = () => {
            if (xml.readyState === 4 && xml.status === 200) {
                resolve(JSON.parse(xml.responseText))
            }
        };
        xml.send(urlCode(data))
    })
}
function urlCode(data) {
    let str = '';
    if (!data) {
        return null
    }
    for (let key in data) {
        if (typeof data[key] === 'string') {
            data[key] = data[key].trim()
        }
        str += `${key}=${encodeURIComponent(data[key])}&`
    }
    return str.slice(0, str.length-1)
}


export default post*/
import axios from  'axios';
// 自定义判断元素类型JS
function toType (obj) {
    return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}
// 参数过滤函数
function filterNull (o) {
    for (var key in o) {
        if (o[key] === null) {
            delete o[key]
        }
        if (toType(o[key]) === 'string') {
            o[key] = o[key].trim()
        } else if (toType(o[key]) === 'object') {
            o[key] = filterNull(o[key])
        } else if (toType(o[key]) === 'array') {
            o[key] = filterNull(o[key])
        }
    }
    return o
}
/*
  接口处理函数
  这个函数每个项目都是不一样的，我现在调整的是适用于
  https://cnodejs.org/api/v1 的接口，如果是其他接口
  需要根据接口的参数进行调整。参考说明文档地址：
  https://cnodejs.org/topic/5378720ed6e2d16149fa16bd
  主要是，不同的接口的成功标识和失败提示是不一致的。
  另外，不同的项目的处理方法也是不一致的，这里出错就是简单的alert
*/

function apiAxios (method, url, params) {
    if (params) {
        params = filterNull(params)
    }
    return axios({
        method: method,
        url: url,
        data: method === 'POST' || method === 'PUT' ? params : null,
        params: method === 'GET' || method === 'DELETE' ? params : null,
        withCredentials: false
    })
}

// 返回在vue模板中的调用接口
export default {
    get: function (url, params) {
        return apiAxios('GET', url, params)
    },
    post: function (url, params) {
        return apiAxios('POST', url, params)
    },
    put: function (url, params) {
        return apiAxios('PUT', url, params)
    },
    delete: function (url, params) {
        return apiAxios('DELETE', url, params)
    }
}