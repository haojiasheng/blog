import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './lib/rem';
import store from './lib/store.jsx';
import router from './router/index';
import './public/css/style.scss';
import api from './lib/api';
import checkCompetence from './lib/checkCompetence';
import getNextData from "./common/getNextData";

global.App = {
    api,
    checkCompetence,
    getNextData,
    prompt (message) {
        store.dispatch({
            type: 'prompt',
            message
        })
    }
};



ReactDOM.render(
    <Provider store={store}>
        {router}
    </Provider>,
    document.getElementById('app')
);