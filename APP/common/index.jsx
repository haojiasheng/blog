import React, {Component} from 'react';
import style from '../public/css/commonIndex.scss';

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
        const {value, inputKey, name, defaultValue, checkChange, content, backgroundImg} = this.props
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

export class PostAvatar extends Component{
    render () {
        const bgAvatar = {
            background: `url(${require('../public/img/avatar/avatar.jpg')})`,
            backgroundSize: '1rem'
        };
        return (
            <div className={style.postAvatar}>
                <span className={style.avatar} style={bgAvatar}></span>
                <div className={style.author}>
                    <span>韩立</span>
                    <span className={style.howLong}>1分钟前</span>
                </div>
            </div>
        )
    }
}