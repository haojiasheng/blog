import React from 'react';
import {Router, Route, BrowserRouter, Switch} from 'react-router-dom';
import Header from '../common/header';
import Search from '../common/search';
import Prompt from '../common/prompt';
import Side from '../common/side';
import home from '../pages/home';
import SearchPage from '../pages/search';
import SignUp from '../pages/signup';

const routes = [
    {
        path: '/',
        component: home,
        exact: true
    },
    {
        path: '/search',
        component: SearchPage,
        exact: false
    },
    {
        path: '/signUp',
        component: SignUp,
        exact: false
    }
];


const router = (
    <BrowserRouter>
        <div className={'wrap'}>
            {true && <Header />}
            {true && <Search />}
            {false && <Side/>}
            {<Prompt />}
            <Switch>
                {routes.map((route, index) => (
                    <Route key={index} path={route.path} component={route.component} exact={route.exact} />
                ))}
            </Switch>
        </div>
    </BrowserRouter>
);
export default router