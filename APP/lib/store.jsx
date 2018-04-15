import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'

function posts(posts = [], action) {
    switch (action.type) {
        case 'postAdd':
            return posts
        case 'postInit':
            return posts
        default:
            return posts
    }
}

function pageState(search = 0, action) {
    switch (action.type) {
        case 'search':
            return 1;
        case 'signUpPage':
            return 3;
        case 'back':
            return 0;
        default:
            return search
    }
}

function user(user = {}, action) {
    switch (action.type) {
        case 'userCreate':
            return action.user;
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
            return action;
        case 'removePrompt':
            return {status: 1};
        default:
            return prompt
    }
}

const store = createStore(combineReducers({posts, pageState, user, prompt}), applyMiddleware(thunk));

export default store