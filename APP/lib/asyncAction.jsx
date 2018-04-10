import api from './api'

function fetchPosts(method, url, data, type) {
    if (typeof data !== 'object') {
        type = data;
        data = '';
    }
    return (dispatch) => {
        return api[method](url, data).then((result) => {
            dispatch({
                type,
                result
            })
        })
    }
}

export default fetchPosts