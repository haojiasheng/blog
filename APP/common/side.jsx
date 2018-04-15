import React, {Component} from 'react';
import style from '../public/css/side.scss';

class Side extends Component{
    constructor (props) {
        super(props)
    }
    render () {
        return (
            <div className={style.screen}>
                <div className={style.side}>
                    <User />
                    <NavList />
                    <Signout />
                </div>
            </div>
        )
    }
}

class User extends Component{
    render () {
        return (
            <div className={style.user}>
                <div className={style.avatar}>
                    <img  src={require('../public/img/avatar/avatar.jpg')} />
                </div>
                <div className={style.userMsg}>
                    <div className={style.nikename}>
                        <span>183****8205</span>
                        <span>男</span>
                    </div>
                    <div className={style.bio}>
                        <span>个人介绍: </span>
                        这是一个酷酷的人是大口径浪费圣达菲的身份的防晒霜的发生的非法发生的水电费
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
                <li className={style.active}>
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
}

class Signout extends Component{
    render () {
        return (
            <div className={style.signout}>
                <button>退出登录</button>
            </div>
        )
    }
}


export default Side