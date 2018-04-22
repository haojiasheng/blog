import React,{ Component } from 'react';
import {connect} from 'react-redux';
import fetchPosts from '../lib/asyncAction';
import getNextData from '../common/getNextData';
import style from '../public/css/home.scss';
import PropTypes from 'prop-types';
import {PostAvatar} from '../common/index';


class Main extends Component {
    constructor (props) {
        super(props);
        getNextData(this,{
            header: {
                content: '主页',
                show: true,
                left: {
                    content: '登录/注册',
                    src: '/signIn',
                    avatar: true
                },
                right: {
                    content: '热门'
                }
            },
            search: {
                show: true
            }
        });
        console.log(this.props.path)
    }
    componentWillMount () {
        const {postInit, prompt} = this.props;
        postInit();
    }
    render () {
        return (
            <ul className={style.list}>
                <Topic />
                <Topic />
            </ul>
        )
    }
}


class Topic extends Component{
    render () {
        return (
            <li className={style.topic} onClick={this.navigateTo.bind(this)}>
                <PostAvatar />
                <h3>有哪些稳中带皮的操作？离开家附近的法律岁数大了记得是东方斯卡拉但考虑到所说的看电视来看</h3>
                {/*<p></p>*/}
                <div>
                    <span>9644赞同</span>
                    <span className={style.comment}>699评论</span>
                </div>
            </li>
        )
    }
    navigateTo () {
        console.log(this)
        this.context.router.history.push('/postDetail');
    }
}
Topic.contextTypes = {
    router: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    posts: state.posts,
    user: state.user,
    path: state.path
});
function mapDispatchToProps(dispatch, ownProps) {
    return {
        postInit () {
            dispatch(fetchPosts('get', '/postInit',{}, 'postInit'))
        },
        prompt (msg) {
            dispatch({
                type: 'prompt',
                message: msg
            })
        },
        pageChange (path) {
            dispatch({
                type: 'changePage',
                path
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)