import React, {Component} from 'react';
import {connect} from 'react-redux';
import style from '../public/css/side.scss';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Side extends Component{
    constructor (props) {
        super(props)
    }
    render () {
        let {path, changePage, user} = this.props;
        const {pathname} = this.context.router.history.location;
        path[pathname] = path[pathname] || path.init;
        const show = path[pathname].side.show;
        return (
            show && <div>
                <div  ref={(sideDiv) => this.sideDiv = sideDiv } className={style.side}>
                    <User {...user}/>
                    <NavList changePage={changePage} path={path} />
                    <SignOut />
                </div>
                <div  className={style.mask} onClick={this.sideDisappear.bind(this)}></div>
            </div>
        )
    }
    sideDisappear () {
        const {changePage, path} = this.props;
        const {pathname} = this.context.router.history.location;
        path[pathname].side.show = false;
        this.sideDiv.classList.add(style.disAppear)
        setTimeout(() => {
            changePage(path)
        },500)
    }
}
Side.contextTypes = {
    router: PropTypes.object.isRequired
};

class User extends Component{
    render () {
        const {avatar, Email, gender, bio} = this.props;
        return (
            <div className={style.user}>
                <div className={style.avatar}>
                    <img src={require(`../public/img/avatar/${avatar}`)} />
                </div>
                <div className={style.userMsg}>
                    <div className={style.nikename}>
                        <span>{Email}</span>
                        <span>{gender==='m' ? '男' : '女'}</span>
                    </div>
                    <div className={style.bio}>
                        <span>个人介绍: </span>
                        {bio}
                    </div>
                </div>
            </div>
        )
    }
}

class NavList extends  Component{
    render () {
        return (
            <ul>
                <li className={style.active} onClick={this.navigateTo.bind(this, '/')}>
                    <img src={require('../public/img/home_icon.png')}/>
                    <span>主页</span>
                </li>
                <li>
                    <img src={require('../public/img/my_icon.png')}/>
                    <span>个人主页</span>
                </li>
                <li>
                    <img src={require('../public/img/post_icon.png')}/>
                    <span>我的文章</span>
                </li>
                <li>
                    <img src={require('../public/img/message_icon.png')}/>
                    <span>我的消息</span>
                </li>
            </ul>
        )
    }
    navigateTo (url) {
        const {changePage, path} = this.props;
        const {push, location:{pathname}} = this.context.router.history;
        if (pathname === url) {
            path[pathname].side.show = false;
            changePage(path);
        } else {
            push(url)
        }
    }
}
NavList.contextTypes = {
    router: PropTypes.object.isRequired
};

class SignOut extends Component{
    render () {
        return (
            <div className={style.signOut}>
                <button>退出登录</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    path: state.path,
    user: state.user
});

function mapDispatchToProps (dispatch) {
    return {
        changePage (data) {
            dispatch({
                type: 'changePage',
                path: data
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Side)