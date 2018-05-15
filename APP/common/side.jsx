import React, {Component} from 'react';
import {connect} from 'react-redux';
import style from '../public/css/side.scss';
import PropTypes from 'prop-types';
import config from '../../config/default';


class Side extends Component{
    constructor (props) {
        super(props)
    }
    render () {
        let {path, pageChange, user} = this.props;
        const {pathname} = this.context.router.history.location;
        this.path = path[pathname] || path.init;
        const show = this.path.side.show;
        return (
            show && <div>
                <div  ref={(sideDiv) => this.sideDiv = sideDiv } className={style.side}>
                    <User {...user}/>
                    <NavList pageChange={pageChange} path={this.path} />
                    <SignOut signOut={this.signOut.bind(this)} />
                </div>
                <div  className={style.mask} onClick={this.sideDisappear.bind(this)}></div>
            </div>
        )
    }
    sideDisappear () {
        const {pageChange} = this.props;
        this.path.side.show = false;
        this.sideDiv.classList.add(style.disAppear);
        setTimeout(() => {
            pageChange(path)
        },500)
    }
    signOut () {
        const {signOut, pageChange} = this.props;
        this.path.side.show = false;
        App.api.post('/user/out').then((res) => {
            if (res.code === 0) {
                App.prompt(res.msg);
                signOut();
                pageChange(this.path)
            }
        })

    }
}
Side.contextTypes = {
    router: PropTypes.object.isRequired
};

class User extends Component{
    render () {
        let {avatar, Email, gender, bio} = this.props;
        avatar = `${config.domainName}/public/img/avatar/${avatar}`
        return (
            <div className={style.user}>
                <div className={style.avatar}>
                    <img src={avatar} />
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
        const {pageChange, path} = this.props;
        const {push, location:{pathname}} = this.context.router.history;
        if (pathname === url) {
            path[pathname].side.show = false;
            pageChange(path);
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
        const {signOut} = this.props
        return (
            <div className={style.signOut}>
                <button onClick={signOut}>退出登录</button>
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
        pageChange (data) {
            dispatch({
                type: 'pageChange',
                path: data
            })
        },
        signOut () {
            dispatch({
                type: 'signOut'
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Side)