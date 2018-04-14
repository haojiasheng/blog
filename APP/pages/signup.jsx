import React,{Component} from 'react';
import {SignButton, SignInput, SignTextarea, SignImg} from '../common/index';
import style from '../public/css/signup.scss';
import {connect} from 'react-redux';
import propTypes from 'prop-types';
import fetchPosts from '../lib/asyncAction';

class Main extends Component{
    constructor (props) {
        super(props);
        this.state = {
            imgUrl: ''
        }
    }
    componentWillMount () {
        this.props.init();
    }
    render () {
        return (
            <div className={style.signUp}>
                <div className={style.wrap}>
                    <SignInput content={input => this.Email=input} text='邮箱'/>
                    <SignInput content={input => this.nikeName=input} text='昵称'/>
                    <SignInput content={input => this.password=input} text='密码' type='password'/>
                    <SignInput content={input => this.repassword=input} text='重复密码' type='password'/>
                    <SignImg upAvatar={this.upAvatar.bind(this)} imgUrl={this.state.imgUrl} content={input => this.avatar=input} text='上传头像'/>
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
        const formData = new FormData;
        formData.append('avatar', this.avatar.files[0]);
        formData.append('Email', this.Email.value);
        formData.append('nikeName', this.nikeName.value);
        formData.append('password', this.password.value);
        formData.append('repassword', this.repassword.value);
        formData.append('bio', this.bio.value);
        this.props.signUp(formData)
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
}
Main.propTypes = {
    init: propTypes.func.isRequired,
    unSignUp: propTypes.func.isRequired,
    signUp: propTypes.func.isRequired
};

function mapStateToProps() {
    return {}
}

function mapDispatchToProps (dispatch, ownProps) {
    return {
        init () {
            dispatch({
                type: 'signUpPage'
            });
        },
        unSignUp () {
            dispatch({
                type: 'back'
            });
        },
        signUp (data) {
            dispatch(fetchPosts('post', '/signUp/create', data, 'userCreate'));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)