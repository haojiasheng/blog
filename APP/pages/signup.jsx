import React,{Component} from 'react';
import {SignButton, SignInput, SignTextarea, SignImg} from '../common/index';
import style from '../public/css/signup.scss';
import {connect} from 'react-redux';
import propTypes from 'prop-types';

class Main extends Component{
    componentWillMount () {
        this.props.init();
    }
    render () {
        return (
            <div className={style.signUp}>
                <div className={style.wrap}>
                    <SignInput content={input => this.Email=input} text='邮箱'/>
                    <SignInput content={input => this.nickName=input} text='昵称'/>
                    <SignInput content={input => this.password=input} text='密码' type='password'/>
                    <SignInput content={input => this.repassword=input} text='重复密码' type='password'/>
                    <SignImg upAvatar={this.upAvatar.bind(this)} content={input => this.avatar=input} text='上传头像'/>
                    <SignTextarea content={input => this.bio=input} text='个人介绍'/>
                    <SignButton signUp={this.signUp.bind(this)} text='注册'/>
                </div>
            </div>
        )
    }
    componentWillUnmount () {
        this.props.unSignUp()
    }
    signUp () {
        console.log(this.Email.value,this.nickName.value, this.password.value, this.repassword.value, this.bio.value, this.avatar.value)
        const params = {
            Email: this.Email.value,
            nickName: this.nickName.value,
            password: this.password.value,
            repassword: this.repassword.value,
            bio: this.bio.value,
            avatar: this.avatar.value
        }
    }
    upAvatar (e) {
        e.target.value
    }
}
Main.propTypes = {
    init: propTypes.func.isRequired,
    unSignUp: propTypes.func.isRequired
};

function mapStateToProps() {
    return {}
}

function mapDispatchToProps (dispatch, ownProps) {
    return {
        init () {
            dispatch({
                type: 'signup'
            });
        },
        unSignUp () {
            dispatch({
                type: 'back'
            });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)