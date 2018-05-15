import React, {Component} from 'react';
import style from '../public/css/postDetail.scss';
import {connect} from 'react-redux';
import {Comment, DataLoad, CommentInput, PostAvatar} from '../common/index';
import {getSearch} from '../lib/locationControl';



class postDetail extends Component{
    constructor (props) {
        super(props);
        this.rightCallback = () => {  /*header右边回调函数*/
            this.addCollect()
        };
        this.userCallback = () => { /*user接口回调函数*/
            this.loadData()
        };
        App.getNextData(this, {
            header: {
                show: true,
                content: '',
                left: {
                    back: true
                },
                right: {
                    notSelect_icons: 'notCollection_icon.png',
                    icons: 'collection_icon.png',
                    callback: null,
                    state: false,
                    callbackState: 1
                },
                userCallbackState: 1,
                userCallback: null
            },
            data: {
                post: null,
                like: false,
                comments: [],
                loadAnimation: true,
                loadMessage: ''
            }
        });
        this.posts = this.props.posts;
    }
    render () {
        let {post, loadAnimation, loadMessage, like} = this.path.data;
        post = post || {};
        let comments = post.comments;
        const {author, createAt, title, content, collectCount} = post;
        let likeImg = like ? 'like_icon.png' : 'notLike_icon.png';
        const likeBgImg = {
            background: `url(${require('../public/img/' + likeImg)}) no-repeat`,
            backgroundSize: '0.7rem'
        };
        return (
            <div>
                {
                    !!author && <div className={style.postDetail}>
                        <div className={style.post}>
                            <PostAvatar author={author} createAt={createAt} />
                            <h3>{title}</h3>
                            <p>{content}</p>
                            <div className={style.count}>
                        <span style={likeBgImg} onClick={this.addLike.bind(this)} className={style.like}>
                        </span>
                                <span>{collectCount}人收藏</span>
                            </div>
                        </div>
                        {comments.map((comment, index) => {
                                let commentLikeImg = comment.commentLike ? 'like_icon.png' : 'notLike_icon.png';
                                return <Comment addCommentLike={this.addCommentLike.bind(this, index)} commentLikeCount={comment.commentLikeCount} commentLikeImg={commentLikeImg} key={comment._id} author={comment.author} createAt={comment.createAt} content={comment.content} />
                            }
                        )}
                        <CommentInput postComment={this.postComment.bind(this)} />
                    </div>
                }
                {(loadAnimation || loadMessage) && <DataLoad loadAnimation={loadAnimation} loadMessage={loadMessage} />}
            </div>
        )
    }
    componentWillUnmount () {
        this.props.postsChange(this.posts);
    }
    addCommentLike (index) {
        const login = App.checkCompetence.checkLogin(this);
        if (!login) {
            return
        }
        const {comments} = this.path.data.post;
        const {user} = this.props;
        const commentLike = comments[index].commentLike;
        const params = {
            userId: user._id,
            commentId: comments[index]._id
        };
        if (!commentLike) {
            App.api.post('/comment/like', params).then(
                (res) => {
                    if (res.code === 0) {
                        this.path.data.post.comments[index].commentLike = true;
                        ++this.path.data.post.comments[index].commentLikeCount;
                        this.props.pageChange(this.path);
                        App.prompt(res.msg)
                    }
                }
            );
        } else {
            App.api.post('/comment/unLike', params).then(
                (res) => {
                    if (res.code === 0) {
                        this.path.data.post.comments[index].commentLike = false;
                        --this.path.data.post.comments[index].commentLikeCount;
                        this.props.pageChange(this.path);
                        App.prompt(res.msg)
                    }
                }
            );
            this.path.data.post.comments[index].commentLike = false
        }
    }
    addCollect () {
        const login = App.checkCompetence.checkLogin(this);
        if (!login) {
            return
        }
        const {post} = this.path.data;
        const state = this.path.header.right.state;
        let {user} = this.props;
        user = user || {};
        const data = {
            userId: user._id,
            postId: post._id
        };
        if (state) {
            App.api.post('/post/unCollect', data).then((res) => {
                if (res.code === 0) {
                    this.path.header.right.state = false;
                    --this.path.data.post.collectCount;
                    this.props.pageChange(this.path);
                    App.prompt(res.msg);
                }
            });
        } else {
            App.api.post('/post/collect', data).then((res) => {
                if (res.code === 0) {
                    this.path.header.right.state = true;
                    ++this.path.data.post.collectCount;
                    this.props.pageChange(this.path);
                    App.prompt(res.msg)
                }
            });
        }
    }
    addLike () {
        const login = App.checkCompetence.checkLogin(this);
        if (!login) {
            return
        }
        const {like, post} = this.path.data;
        let {user} = this.props;
        user = user || {};
        const data = {
            userId: user._id,
            postId: post._id
        };
        if (like === false) {
            App.api.post('/post/like', data).then((res) => {
                if (res.code === 0) {
                    this.path.data.like = true;
                    this.props.pageChange(this.path);
                    App.prompt(res.msg);
                    this.postsChangeOfCount('likeCount', true);
                }
            });
        } else {
            App.api.post('/post/unLike', data).then((res) => {
                if (res.code === 0) {
                    this.path.data.like = false;
                    this.props.pageChange(this.path);
                    App.prompt(res.msg);
                    this.postsChangeOfCount('likeCount', false)
                }
            });
        }
    }
    loadData () {
        if (this.path.data.post) {
            return;
        }
        let {match, history, user} = this.props;
        user = user || {};
        const data = {
            id: match.params.id,
            userId: user._id
        };
        App.api.post('/post/detail', data).then((res) => {
            if (res.code === -1) {
                App.prompt(res.message);
                history.goBack();
            } else {
                const result = res.data;
                const like = result.like;
                this.path.header.content = result.title;
                this.path.data.post = result;
                this.path.data.like = like;
                this.path.data.loadAnimation = false;
                this.path.header.right.state = result.collect;
                this.props.pageChange(this.path)
            }
        })
    }
    postComment (value) {
        const login = App.checkCompetence.checkLogin(this);
        if (!login) {
            return
        }
        const {user} = this.props;
        const {post} = this.path.data;
        const comments = post.comments;
        const params = {
            content: value,
            postId: post._id,
            author: user._id
        };
        App.api.post('/comment', params).then((res) => {
            if (res.code === 0) {
                let comment = res.data;
                comment.commentLikeCount = 0;
                this.path.data.post.comments = [...comments, comment];
                this.props.pageChange(this.path);
                const offsetHeight = parseFloat(window.getComputedStyle(App.DOM).height);
                const clientHeight = parseFloat(document.documentElement.clientHeight);
                window.scroll(0, offsetHeight - clientHeight);
                this.postsChangeOfCount('commentCount', true);
            }
        })
    }
    postsChangeOfCount (key, state) {
        const searchIndex = getSearch('index');
        if (this.posts.length-1 >= searchIndex) {
            if (state) {
                ++this.posts[searchIndex][key];
            } else {
                --this.posts[searchIndex][key];
            }
        }
    }
}


const mapStateToProps = (state) => ({
    path: state.path,
    user: state.user,
    posts: state.posts
});

function mapDispatchToProps(dispatch) {
    return {
        pageChange (path) {
            dispatch({
                type: 'pageChange',
                path
            })
        },
        postsChange (posts) {
            dispatch({
                type: 'postsChange',
                posts
            })
        },
        userInit (data) {
            dispatch({
                type: 'userInit',
                user: data
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(postDetail);