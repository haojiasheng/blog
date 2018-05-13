import React,{Component} from 'react';
import {SignButton, SignInput, SignTextarea, SignImg, SignGender} from '../common/index';
import style from '../public/css/signup.scss';
import {connect} from 'react-redux';

class Main extends Component{
    constructor (props) {
        super(props);
        App.checkCompetence.checkNotLogin(this);
        this.state = {
            imgUrl: ''
        };
        App.getNextData(this, {
            header: {
                show: false
            },
            search: {
                show: false
            }
        });
        this.state = {
            buttonStyle: null
        }
    }
    render () {
        const buttonStyle = this.state.buttonStyle;
        return (
            <div className={style.signUp}>
                <div className={style.wrap}>
                    <SignInput contentInspect={this.contentInspect.bind(this)} content={input => this.Email=input} text='邮箱'/>
                    <SignGender content={input => this.gender=input} />
                    <SignInput contentInspect={this.contentInspect.bind(this)} content={input => this.nikeName=input} text='昵称'/>
                    <SignInput contentInspect={this.contentInspect.bind(this)} content={input => this.password=input} text='密码' type='password'/>
                    <SignInput contentInspect={this.contentInspect.bind(this)} content={input => this.repassword=input} text='重复密码' type='password'/>
                    <SignImg upAvatar={this.upAvatar.bind(this)} imgUrl={this.state.imgUrl} content={input => this.avatar=input} text='上传头像'/>
                    <SignTextarea content={input => this.bio=input} text='个人介绍'/>
                    <SignButton buttonStyle={buttonStyle} signUp={this.signUp.bind(this)} text='注册'/>
                </div>
            </div>
        )
    }
    signUp () {
        if (this.state.buttonStyle) {
            const {signUp, history} = this.props;
            const formData = new FormData;
            formData.append('avatar', this.avatar.files[0]);
            formData.append('Email', this.Email.value);
            formData.append('nikeName', this.nikeName.value);
            formData.append('password', this.password.value);
            formData.append('repassword', this.repassword.value);
            formData.append('bio', this.bio.value);
            formData.append('gender',this.gender.value);
            App.api.post('/signUp/create', formData).then((res) => {
                App.prompt(res.msg);
                if (res.code === 0) {
                    signUp(res.data);/*
                    localStorage.setItem('user', JSON.stringify(res.data))*/
                    history.goBack()
                }
            })
        }
    }
    upAvatar (e) {
        const target = e.target;
        const reader = new FileReader();
        reader.readAsDataURL(target.files[0]);
        reader.addEventListener('load', () => {
            this.setState({
                imgUrl: reader.result
            });
        })
    }
    contentInspect () {
        if (this.Email.value && this.nikeName.value && this.password.value && this.repassword.value) {
            this.setState({
                buttonStyle: {
                    background: '#46a3ff'
                }
            })
        } else {
            this.setState({
                buttonStyle: null
            })
        }
    }
}

function mapStateToProps(state) {
    return {
        path: state.path,
        user: state.user
    }
}

function mapDispatchToProps (dispatch) {
    return {
        pageChange (path) {
            dispatch({
                type: 'pageChange',
                path: path
            });
        },
        signUp (data) {
            dispatch({
                type: 'userInit',
                user: data
            });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)