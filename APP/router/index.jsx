import React from 'react';
import { Route, BrowserRouter, Switch} from 'react-router-dom';
import Header from '../common/header';
import Search from '../common/search';
import Prompt from '../common/prompt';
import Side from '../common/side';
import home from '../pages/home';
import SearchPage from '../pages/search';
import SignUp from '../pages/signup';
import SignIn from '../pages/signin';
import postDetail from '../pages/postDetail';

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
        path: '/postDetail',
        component: postDetail,
        exact: false
    }
];


const router = (
    <BrowserRouter>
        <div className={'wrap'}>
            {true && <Header />}
            {true && <Search />}
            {true && <Side/>}
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