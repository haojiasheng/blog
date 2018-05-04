import React,{ Component } from 'react';
import {connect} from 'react-redux';
import style from '../public/css/home.scss';
import PropTypes from 'prop-types';
import {PostAvatar, DataLoad} from '../common/index';

class Main extends Component {
    constructor (props) {
        super(props);
        App.getNextData(this,{
            header: {
                content: '主页',
                show: true,
                left: {
                    content: '登录/注册',
                    src: '/signIn',
                    avatar: true
                },
                right: {
                    icons: 'newPost_icon.png',
                    src: '/postEdit'
                }
            },
            search: {
                show: true
            },
            data: {
                loadAnimation: true,
                page: 0,
                loadMessage: ''
            }
        });
    }
    render () {
        const {posts} = this.props;
        const {loadAnimation, loadMessage} = this.path.data;
        return (
            <div className={style.home}>
                <ul className={style.list}>
                    {posts.map((post, index) =>
                        <Topic {...post} index={index} key={post._id} />
                    )}
                </ul>
                <DataLoad loadAnimation={loadAnimation} loadMessage={loadMessage}  />
            </div>
        )
    }
    componentDidMount () {
        this.onScrollBottom();
        const {posts} = this.props;
        if (!posts.length) {
            this.loadData();
        } else {
            this.setState({
                page: this.path.data.page,
                loadAnimation: false
            });
        }
    }
    componentWillUnmount () {
        window.onscroll = null;
    }
    loadData () {
        const {postAdd} = this.props;
        let page = ++this.path.data.page;
        const data = {
            page
        };
        App.api.post('/post/init', data).then((res) => {
            if (res.code === 0) {
                const data = res.data;
                if (data.length === 0) {
                    this.setState({
                        loadAnimation: false,
                        loadMessage: '加载完毕'
                    });
                } else {
                    this.setState({
                        loadAnimation: false,
                        page
                    });
                }
                postAdd(data);
                this.componentOffset();
            }
        })
    }
    onScrollBottom () {
        this.clientHeight = parseFloat(document.documentElement.clientHeight);
        window.onscroll = () => {
            let srcoll = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
            if (this.clientHeight + srcoll >= this.offset && this.offset > 1000) {
                if (!this.path.data.loadAnimation && !this.path.data.loadMessage) {
                    this.setState({
                        loadAnimation: true
                    });
                    this.loadData();
                }
            } else {
                this.componentOffset()
            }
        };
    }
    componentOffset () {
        this.offset = parseFloat(window.getComputedStyle(App.DOM).height) - 10;
    }
}


class Topic extends Component{
    render () {
        const {author, createAt, _id, title, commentCount, likeCount, index} = this.props;
        return (
            <li className={style.topic} onClick={this.navigateTo.bind(this, _id, index)}>
                <PostAvatar author={author} createAt={createAt} />
                <h3>{title}</h3>
                <div className={style.commentWrap}>
                    <span>{likeCount}人喜欢</span>
                    <span className={style.comment}>{commentCount}条评论</span>
                </div>
            </li>
        )
    }
    navigateTo (id, index) {
        this.context.router.history.push(`/postDetail/${id}?index=${index}`);
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
        pageChange (path) {
            dispatch({
                type: 'pageChange',
                path
            })
        },
        postAdd (data) {
            dispatch({
                type: 'postAdd',
                data
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)