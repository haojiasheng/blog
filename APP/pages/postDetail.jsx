import React, {Component} from 'react';
import style from '../public/css/postDetail.scss';
import getNextData from '../common/getNextData';
import {connect} from 'react-redux';
import {PostAvatar} from '../common/index';

class postDetail extends Component{
    constructor (props) {
        super(props);
        getNextData(this, {
            header: {
                show: true,
                content: '有哪些稳中带皮的操作',
                left: {
                    back: true
                },
                right: {
                    notSelect_icons: 'notCollection_icon.png',
                    icons: 'collection_icon.png'
                }
            }
        });
    }
    render () {
        return (
            <div className={style.postDetail}>
                <div className={style.post}>
                    <PostAvatar />
                    <h3>长得漂亮的人都是这么知道自己长得漂亮的呢？</h3>
                    <p>每个人都对于自己的样貌都有认知过程，比如别人的夸奖，还有路人的频繁回眸。。。</p>
                    <div className={style.count}>
                        <span className={style.collection}>9627人收藏</span>
                        <span>68条评论</span>
                    </div>
                </div>
                <CommentInput />
            </div>
        )
    }
}

class CommentInput extends Component{
    constructor (props) {
        super(props);
        this.state = {
            commentPlaceholder: '说说你的看法...',
            commentValue: '',
            commentStyle: {}
        }
    }
    render () {
        const {commentPlaceholder, commentStyle} = this.state
        return (
            <div onClick={this.commentWrapClick.bind(this)} style={commentStyle} className={style.commentInput}>
                <div ref={(input) => {this.commentInputBox = input}} onInput={this.commentInput.bind(this)}  onBlur={this.commentInputBlur.bind(this)} onFocus={this.commentInputFocus.bind(this)} data-placeholder={commentPlaceholder} className={style.input} contentEditable={true}></div>
                发布
            </div>
        )
    }
    commentInputBlur (e) {
        console.log(e.target)
        const value = e.target.textContent;
        e.target.textContent = '';
        if (value) {
            this.setState({
                commentPlaceholder: '[草稿待发送]',
                commentValue: value
            })
        }
    }
    commentInputFocus (e) {
        const value = this.state.commentValue;
        e.target.textContent = value;
    }
    commentInput (e) {
        const value = e.target.textContent;
        if (!value) {
            this.setState({
                commentPlaceholder: '说说你的看法...'
            })
        } else {
            this.setState({
                commentStyle: {
                    color: 'blue'
                }
            })
        }
    }
    commentWrapClick () {
        this.commentInputBox.focus()
    }
}

const mapStateToProps = (state) => ({
    path: state.path
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