import axios from  'axios';

function toType (obj) {
    return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}


function urlCode(data) {
    var str = '';
    if (!data) {
        return null;
    }
    for (var key in data) {
        if (typeof data[key] == 'string') {
            data[key] = data[key].trim()
        }

        str += key + '=' + encodeURIComponent(data[key]) + '&';
    }

    return str.substring(0, str.length - 1);
}


function apiAxios (method, url, params) {
    if (!(params instanceof FormData)) {
        params = urlCode(params)
    }
    return axios({
        method: method,
        url: url,
        data: method === 'POST' || method === 'PUT' ? params : null,
        params: method === 'GET' || method === 'DELETE' ? params : null,
        baseURL: 'http://139.224.11.44:3000/',/*http://localhost:3000*/
        withCredentials: false,
        headers: {'content-Type': 'application/x-www-form-urlencoded'}
    }).then((res) => {
        return res.data
    })
}

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