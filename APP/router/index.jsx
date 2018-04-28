import React from 'react';
import { Route, BrowserRouter, Switch, Redirect} from 'react-router-dom';
import Header from '../common/header';
import Search from '../common/search';
import Prompt from '../common/prompt';
import Side from '../common/side';
import home from '../pages/home';
import SearchPage from '../pages/search';
import SignUp from '../pages/signup';
import SignIn from '../pages/signin';
import postDetail from '../pages/postDetail';
import postEdit from '../pages/postEdit';

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
    },
    {
        path: '/signIn',
        component: SignIn,
        exact: false
    },
    {
        path: '/postDetail/:id',
        component: postDetail,
        exact: false
    },
    {
        path: '/postEdit',
        component: postEdit,
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