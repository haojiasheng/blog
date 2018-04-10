import React, {Component} from 'react';
import style from '../public/css/commonIndex.scss';

export class SignButton extends Component{
    render () {
        const {text, signUp} = this.props;
        return (
            <button onClick={signUp} className={style.SignButton}>{text}</button>
        )
    }
}

export class SignInput extends Component{
    render () {
        const {text, type = 'text', content} = this.props;
        return (
            <label className={style.SignLabel}>
                {text}:
                <input type={type} ref={content} className={style.SignInput}/>
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
        const {content, upAvatar} = this.props
        return (
            <label className={style.imgLabel}>
                点击上传图片
                <input onChange={upAvatar} accept={'image/*'} ref={content} type='file' className={style.img}/>
                <img />
            </label>
        )
    }
}