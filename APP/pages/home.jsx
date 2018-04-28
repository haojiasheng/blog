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
            }
        });
        this.state = {
            loadAnimation: true,
            page: 0,
            loadMessage: ''
        };
    }
    componentWillMount () {
        this.loadData();
    }
    render () {
        const {posts} = this.props;
        const {loadAnimation, loadMessage} = this.state;
        return (
            <div className={style.home}>
                <ul className={style.list}>
                    {posts.map((post) =>
                        <Topic {...post} key={post._id} />
                    )}
                </ul>
                <DataLoad loadAnimation={loadAnimation} loadMessage={loadMessage}  />
            </div>
        )
    }
    componentDidMount () {
        this.mounted = true;
        this.onScrollBottom();
    }
    componentWillUnmount () {
        this.mounted = false;
    }
    onScrollBottom () {
        window.onload = () => {
            const clientHeight = parseFloat(document.documentElement.clientHeight);
            window.onscroll = () => {
                let srcoll = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                if (clientHeight + srcoll >= this.offset && this.offset > 1000) {
                    if (!this.state.loadAnimation && !this.state.loadMessage) {
                        this.setState({
                            loadAnimation: true
                        });
                        this.loadData();
                    }
                } else {
                    this.componentOffset()
                }
            }
        }
    }
    loadData () {
        const data = {
            page: ++this.state.page
        };
        App.api.post('/post/init', data).then((res) => {
            if (res.code === 0) {
                setTimeout(() => {
                        const {postAdd} = this.props;
                        const data = res.data;
                        if (data.length === 0) {
                            this.setState({
                                loadAnimation: false,
                                loadMessage: '加载完毕'
                            });
                        } else {
                            if (this.mounted) {
                                this.setState({
                                    loadAnimation: false
                                });
                            }
                        }
                        postAdd(data);
                        console.log(this.props.posts.length)
                }, 500);
                this.componentOffset()
            }
        })
    }
    componentOffset () {
        this.offset = parseFloat(window.getComputedStyle(App.DOM).height) - 10;
    }
}


class Topic extends Component{
    render () {
        const {author, createAt, _id, good, title} = this.props;
        return (
            <li className={style.topic} onClick={this.navigateTo.bind(this, _id)}>
                <PostAvatar author={author} createAt={createAt} />
                <h3>{title}</h3>
                <div className={style.commentWrap}>
                    <span>{good}点赞</span>
                    <span className={style.comment}>{good}评论</span>
                </div>
            </li>
        )
    }
    navigateTo (id) {
        this.context.router.history.push(`/postDetail/${id}`);
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
                type: 'changePage',
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