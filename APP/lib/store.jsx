import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'

function posts(posts = [], action) {
    switch (action.type) {
        case 'postAdd':
            return posts;
        case 'postInit':
            return posts;
        default:
            return posts
    }
}

function user(user = null, action) {
    switch (action.type) {
        case 'userInit':
            return action.user;
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
            show: false
        },
        header: {
            show: false,
            content: '',
            left: {
                back: false,
                content: '',
                src: ''
            },
            right: {
                content: '',
                src: '',
                notSelect_icons: '',
                icons: ''
            }
        },
        search: {
            show: false,
            state: 0
        }
    }
}, action) {
    switch (action.type) {
        case 'changePage':
            path[action.path.path] = action.path;
            return Object.assign({}, path);
        default:
            return path
    }
}

const store = createStore(combineReducers({posts, user, prompt, path}), applyMiddleware(thunk));

export default store