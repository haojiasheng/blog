import React, {Component} from 'react';
import style from '../public/css/postDetail.scss';
import {connect} from 'react-redux';
import {PostAvatar, CommentInput} from '../common/index';
import {Comment, DataLoad} from '../common/index';



class postDetail extends Component{
    constructor (props) {
        super(props);
        this.rightCallback = () => {
            const {notSelect_icons, icons} = this.path.header.right;
            this.path.header.right.notSelect_icons = icons;
            this.path.header.right.icons = notSelect_icons;
            this.props.pageChange(this.path)
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
                    callback: 1
                }
            },
            data: null
        });
        this.state ={
            post: {},
            likeBgImg: 'notLike_icon.png',
            comments: null,
            loadState: 0
        };
        this.loadData()
    }
    render () {
        const {comments, post} = this.state;
        const {author, createAt, title, content, collect} = post;
        const likeBgImg = {
            background: `url(${require('../public/img/' + this.state.likeBgImg)}) no-repeat`,
            backgroundSize: '0.7rem'
        };
        return (
            !!author && (<div className={style.postDetail}>
                <div className={style.post}>
                    <PostAvatar author={author} createAt={createAt} />
                    <h3>{title}</h3>
                    <p>{content}</p>
                    <div className={style.count}>
                        <span style={likeBgImg} onClick={this.addLike.bind(this)} className={style.like}>
                        </span>
                        <span>{collect}人收藏</span>
                    </div>
                </div>
                {comments.map((comment) =>
                    <Comment key={comment._id} author={comment.author} createAt={comment.createAt} content={comment.content} />
                )}
                <CommentInput postComment={this.postComment.bind(this)} />
                <DataLoad />
            </div>)
        )
    }
    componentWillUnmount () {
        console.log(1)
    }
    addLike () {
        const {likeBgImg} = this.state;
        if (likeBgImg === 'notLike_icon.png') {
            this.setState({
                likeBgImg: 'like_icon.png'
            })
        } else {
            this.setState({
                likeBgImg: 'notLike_icon.png'
            })
        }
    }
    loadData () {
        if (this.path.data) {
            this.state = {
                post: this.path.data,
                comments: this.path.data.comments,
                likeBgImg: 'notLike_icon.png'
            };
            return;
        }
        const {match, history, pageChange} = this.props;
        App.api.get(`/post/detail/${match.params.id}`).then((res) => {
            if (res.code === -1) {
                App.prompt(res.message);
                history.goBack();
            } else {
                this.path.header.content = res.data.title;
                this.path.data = res.data;
                this.setState({
                    post: res.data,
                    comments: res.data.comments,
                    loadState: 1
                });
                pageChange(this.path);
            }
        })
    }
    postComment (value) {
        const {user, history} = this.props;
        const {post} = this.state;
        if (!user._id) {
            App.prompt('请先登陆');
            history.push('/signIn');
            return;
        }
        const params = {
            content: value,
            postId: post._id,
            author: user._id
        };
        App.api.post('/comment', params).then((res) => {
            console.log(res)
        })
    }
}


const mapStateToProps = (state) => ({
    path: state.path,
    user: state.user
});

function mapDispatchToProps(dispatch) {
    return {
        pageChange (path) {
            dispatch({
                type: 'changePage',
                path
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(postDetail);