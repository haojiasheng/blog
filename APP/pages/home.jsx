import React,{ Component } from 'react';
import {connect} from 'react-redux';
import fetchPosts from '../lib/asyncAction';
import getNextData from '../common/getNextData';
import style from '../public/css/home.scss';
import PropTypes from 'prop-types';


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
                <Topic></Topic>
                <Topic></Topic>
            </ul>
        )
    }
}


class Topic extends Component{
    render () {
        return (
            <li className={style.topic} onClick={this.navigateTo.bind(this)}>
                <h3>有哪些稳中带皮的操作？</h3>
                <p>
                    昊天: 路口见方的昆仑山的数据库浪费的精神力速度快了福建省的绿卡深刻揭示了讲的是离开，发生的灵魂的身份了速度快苏打绿咖啡了圣诞节卡拉斯加水电费江苏大丰kfsdf
                </p>
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