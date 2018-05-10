import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'

function posts(posts = [], action) {
    switch (action.type) {
        case 'createPost':
            return [action.post , ...posts];
        case 'postAdd':
            return [...posts, ...action.data];
        case 'postChange':
            return action.posts;
        default:
            return posts
    }
}

function user(user = null, action) {
    switch (action.type) {
        case 'userInit':
            return action.user || null;
        default:
            return user
    }
}

function prompt(prompt = {status: 1}, action) {
    switch (action.type) {
        case 'prompt':
            delete action.type;
            action.status = 0;
            return action;
        case 'removePrompt':
            return {status: 1};
        default:
            return prompt
    }
}

function path(path = {
    init: {
        side: {
            show: false /*是否显示导航栏*/
        },
        header: {
            show: false, /*是否显示页面头部*/
            content: '', /*头部标题*/
            left: { /*头部左边*/
                back: false, /*返回*/
                content: '', /*文字*/
                src: '' /*点击导航路径*/
            },
            right: { /*头部左边*/
                content: '', /*文字*/
                src: '', /*点击导航路径*/
                notSelect_icons: '', /*icon未选中图片*/
                icons: '', /*icon选中图片*/
                callback: null, /*点击回调函数*/
                callbackState: 0, /*控制回调函数*/
                state: false /*控制图片显示*/
            }
        },
        search: {
            show: false, /*是否显示搜索框*/
            state: 0, /*如果值为1将到搜索页面*/
            data: [], /*存放搜索的数据*/
            key: ''/*存放搜索的关键词*/
        },
        data: null /*页面数据*/
    }
}, action) {
    switch (action.type) {
        case 'pageChange':
            path[action.path.path] = action.path;
            return Object.assign({}, path);
        default:
            return path;
    }
}

const store = createStore(combineReducers({posts, user, prompt, path}), applyMiddleware(thunk));

export default store