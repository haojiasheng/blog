import React, {Component} from 'react';
import style from '../public/css/commonIndex.scss';
import moment from 'moment';
import PropTypes from 'prop-types';

export class SignButton extends Component{
    render () {
        const {text, signUp, buttonStyle} = this.props;
        return (
            <button style={buttonStyle} onClick={signUp} className={style.SignButton}>{text}</button>
        )
    }
}

export class SignInput extends Component{
    render () {
        const {text, type = 'text', content, diffStyle,borderStyle, placeText, contentInspect} = this.props;
        return (
            <label style={borderStyle} className={style.SignLabel}>
                {text}:
                <input onChange={contentInspect} placeholder={placeText} type={type} style={diffStyle} ref={content} className={style.SignInput}/>
            </label>
        )
    }
}


export class SignTextarea extends Component{
    render () {
        const {text, content} = this.props;
        return (
            <label className={style.areaLabel}>
                {text}: <textarea ref={content} className={style.area}></textarea>
            </label>
        )
    }
}

export class SignImg extends Component{
    render () {
        const { upAvatar, imgUrl, content} = this.props;
        return (
            <label className={style.imgLabel}>
                点击上传图片
                <input onChange={upAvatar} accept={'image/*'} ref={content} type='file' className={style.img}/>
                <img src={imgUrl} className={imgUrl ?  style.upImg : ''}/>
            </label>
        )
    }
}

export class SignCheck extends Component{
    render () {
        const {value, inputKey, name, defaultValue, checkChange, content, backgroundImg} = this.props;
        return (
            <label className={style.signCheck}>{inputKey}
                <span className={style.checkWrap}  style={backgroundImg}>
                    <input onChange={checkChange} ref={content} name={name} defaultChecked={defaultValue} type={'radio'} value={value}></input>
                </span>
            </label>
        )
    }
}

export class SignGender extends Component{
    constructor (props) {
        super(props);
        this.state = {
            gender: 'm'
        }
    }
    render () {
        const notCheck = {
            background: `url(${require('../public/img/select_nocheck_ico.png')}) no-repeat`
        };
        const check = {
            background: `url(${require('../public/img/select_check_ico.png')})  no-repeat`
        };
        const {content} = this.props;
        const gender = this.state.gender;
        return (
            <div className={style.SignGender}>性别:
                <SignCheck value={'m'} backgroundImg={gender === 'm' ? check : notCheck} content={gender === 'm' ? content : () => {}} checkChange={this.checkChange.bind(this)} defaultValue={'true'} inputKey={'男'} name={'gender'}/>
                <SignCheck value={'w'} backgroundImg={gender === 'w' ? check : notCheck} content={gender === 'w' ? content : () => {}} checkChange={this.checkChange.bind(this)} inputKey={'女'} name={'gender'}/>
            </div>
        )
    }
    checkChange (e) {
        this.setState({
            gender: e.target.value
        })
    }
}

/*注册所需要的输入框、按钮等等*/


export class PostAvatar extends Component{
    render () {
        const {author, createAt} = this.props;
        let bgAvatar = {};
        if (author) {
            bgAvatar = {
                background: `url(${require('../public/img/avatar/'+ author.avatar)}) no-repeat`,
                backgroundSize: '1rem'
            };
        }
        return (
            !!author && <div className={style.postAvatar}>
                <span className={style.avatar} style={bgAvatar}></span>
                <div className={style.author}>
                    <span>{author.nikeName}</span>
                    <span className={style.howLong}>{moment(createAt).locale('zh-cn').startOf().fromNow()}</span>
                </div>
            </div>
        )
    }
}
/*文章头像*/

export class CommentInput extends Component{
    constructor (props) {
        super(props);
        this.state = {
            commentPlaceholder: '说说你的看法...',
            commentValue: '',
            commentStyle: {}
        }
    }
    render () {
        const {commentPlaceholder, commentStyle} = this.state;
        return (
            <div style={commentStyle} className={style.commentInput}>
                <div onInput={this.commentInput.bind(this)}  onBlur={this.commentInputBlur.bind(this)} onFocus={this.commentInputFocus.bind(this)} data-placeholder={commentPlaceholder} className={style.input} contentEditable={true}></div>
                <span onClick={this.postComment.bind(this)}>发布</span>
            </div>
        )
    }
    postComment () {
        this.props.postComment(this.state.commentValue);
        this.setState({
            commentValue: ''
        });
        this.commentInput();
    }
    commentInputBlur (e) {
        const value = e.target.textContent;
        e.target.textContent = '';
        if (value) {
            this.setState({
                commentPlaceholder: '[草稿待发送]'
            })
        }
    }
    commentInputFocus (e) {
        const value = this.state.commentValue;
        e.target.textContent = value;
    }
    commentInput (e = {target: {textContent: ''}}) {
        const value = e.target.textContent;
        if (!value) {
            this.setState({
                commentPlaceholder: '说说你的看法...',
                commentStyle: {
                    color: '#aaa'
                },
                commentValue: value
            })
        } else {
            this.setState({
                commentStyle: {
                    color: 'blue'
                },
                commentValue: value
            })
        }
    }
}
/*评论输入框*/

export class Comment extends Component{
    render () {
        const {author, createAt, content, commentLikeImg, commentLikeCount, addCommentLike} = this.props;
        const likeBg = {
            background: `url(${require('../public/img/' + commentLikeImg)}) no-repeat`
        };
        return (
            <div className={style.comment}>
                <div className={style.commentHeader}>
                    <PostAvatar  author={author} createAt={createAt}  />
                    <div className={style.likeWrap}>
                        <span style={likeBg} className={style.commentLike} onClick={addCommentLike}></span>
                        <span className={style.likeCount}>{commentLikeCount}</span>
                    </div>
                </div>
                <div className={style.commentContent}>
                    {content}
                </div>
            </div>
        )
    }
}
/*每条评论*/


export class DataLoad extends Comment {
    render () {
        let {loadAnimation, loadMessage} = this.props;
        return (
            <div className={`${style.loading} ${style['loading_' + loadAnimation]}`}>
                <div className={style.msg}>{loadMessage}</div>
            </div>
        )
    }
}
/*加载动画*/



export class Topic extends Component{
    render () {
        const {author, createAt, _id, title, commentCount, likeCount, index} = this.props;
        return (
            <li className={style.topic} onClick={this.navigateTo.bind(this, _id, index)}>
                <PostAvatar author={author} createAt={createAt} />
                <h3>{title}</h3>
                <div className={style.commentWrap}>
                    <span>{likeCount}人喜欢</span>
                    <span className={style.commentCount}>{commentCount}条评论</span>
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
/*文章一部分内容展示*/