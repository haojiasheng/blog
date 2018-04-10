import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './lib/rem';
import store from './lib/store.jsx';
import router from './router/index';
import './public/css/style.scss';

ReactDOM.render(
    <Provider store={store}>
        {router}
    </Provider>,
    document.getElementById('app')
);