import React from 'react';
import { Route, BrowserRouter, Switch, Redirect} from 'react-router-dom';
import asyncComponent from '../lib/asyncComponent';
import Header from '../common/header';
import Search from '../common/search';
import Prompt from '../common/prompt';
import Side from '../common/side';

const routes = [
    {
        path: '/',
        component: asyncComponent(() => import('../pages/home'))/*home*/,
        exact: true
    },
    {
        path: '/search',
        component: asyncComponent(() => import('../pages/search'))/*SearchPage*/,
        exact: false
    },
    {
        path: '/signUp',
        component: asyncComponent(() => import('../pages/signup'))/*SignUp*/,
        exact: false
    },
    {
        path: '/signIn',
        component: asyncComponent(() => import('../pages/signin'))/*SignIn*/,
        exact: false
    },
    {
        path: '/postDetail/:id',
        component: asyncComponent(() => import('../pages/postDetail'))/*postDetail*/,
        exact: false
    },
    {
        path: '/postEdit',
        component: asyncComponent(() => import('../pages/postEdit'))/*postEdit*/,
        exact: false
    }
];


const router = (
    <BrowserRouter>
        <div className={'wrap'} ref={wrap => (App.DOM = wrap)}>
            <Header />
            <Search />
            <Side/>
            <Prompt />
            <Switch>
                {routes.map((route, index) => (
                    <Route key={index} path={route.path} component={route.component} exact={route.exact} />
                ))}
                <Redirect from={''} to={'/'}/>
            </Switch>
        </div>
    </BrowserRouter>
);
export default router