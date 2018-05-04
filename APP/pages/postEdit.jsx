import React, {Component} from 'react';
import style from '../public/css/postEdit.scss';
import {connect} from 'react-redux';

class PostEdit extends Component{
    constructor (props) {
        super(props);
        this.rightCallback = () => {
            const {history, createPost, user} = this.props;
            const {content, title} = this.state;
            const author = this.props.user._id;
            const data = {
                title,
                content,
                author
            };
            App.api.post('/post/create', data).then((res) => {
                App.prompt(res.msg);
                if (res.code === 0) {
                    const post = res.data;
                    post.author = user;
                    createPost(post);
                    history.goBack();
                }
            })
        };
        App.checkCompetence.checkLogin(this, true);
        App.getNextData(this, {
            header: {
                content: '发布',
                show: true,
                left: {
                    back: true
                },
                right: {
                    content: '发布',
                    callbackState: 1,
                    callback: null
                }
            }
        });
        this.state = {
            title: '',
            content: ''
        };
    }
    render () {
        return (
            <div className={style.postEdit}>
                <input onChange={this.titleChange.bind(this)} placeholder={'请输入标题'}/>
                <textarea onChange={this.contentChange.bind(this)} placeholder="来吧，尽情发挥吧..." className={style.content}></textarea>
            </div>
        );
    }
    titleChange (e) {
        this.setState({
            title: e.target.value
        })
    }
    contentChange (e) {
        this.setState({
            content: e.target.value
        })
    }
    postCreate () {

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
                type: 'pageChange',
                path
            })
        },
        createPost (post) {
            dispatch({
                type: 'createPost',
                post
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostEdit);