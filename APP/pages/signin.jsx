import React,{Component} from 'react';
import {connect} from 'react-redux';
import getNextData from '../common/getNextData';
import style from '../public/css/signin.scss';
import {SignInput, SignButton} from '../common/index';
import api from '../lib/api';
import login from '../lib/checkCompetence';

class SignIn extends Component{
    constructor (props) {
        super(props);
        login.checkNotLogin(this);
        getNextData(this, {
            header: {
                show: true,
                content: '首页',
                left: {
                    back: true
                },
                right: {
                    content: '注册',
                    src: 'signUp'
                }
            }
        });
        this.state = {
            buttonStyle: null
        }
    }
    render () {
        const diffStyle  = {
            color: '#999',
            width: '8.5rem',
            padding: '0rem'
        };
        const borderStyle = {
            borderBottom: '0.01rem solid #999'
        };
        const buttonStyle = this.state.buttonStyle;
        return (
            <div>
                <div className={style.imgWrap}>
                    <img className={style.signInImg} src={'http://7xrl0p.com1.z0.glb.clouddn.com/20180418.54d5f270dbdaee03690c8de4068a1417_1542x1449.png'} />
                </div>
                <div className={style.inputValue}>
                    <SignInput contentInspect={this.contentInspect.bind(this)} content={(input) => this.Email = input} placeText={'邮箱'} borderStyle={borderStyle} diffStyle={diffStyle}/>
                    <SignInput contentInspect={this.contentInspect.bind(this)} content={(input) => this.password = input} placeText={'密码'} type={'password'} borderStyle={borderStyle} diffStyle={diffStyle}/>
                </div>
                <div className={style.signInButton}>
                    <SignButton buttonStyle={buttonStyle} signUp={this.signIn.bind(this)} text={'登陆'} />
                </div>
            </div>
        )
    }
    contentInspect () {
        if (this.Email.value && this.password.value) {
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
    signIn () {
        const {prompt, userInit, history} = this.props;
        if (this.state.buttonStyle) {
            const params = {
                Email: this.Email.value,
                password: this.password.value
            };
            api.post('/user/signIn', params).then((res) => {
                if (res.code === 0) {
                    userInit(res.data);
                    localStorage.setItem('user', JSON.stringify(res.data));
                    history.goBack()
                }
                prompt(res.msg)
            })
        }
    }
}

const mapStateToProps = (state) => {
    return {
        path: state.path,
        user: state.user
    }
};

function mapDispatchToProps(dispatch) {
    return {
        pageChange (path) {
            dispatch({
                type: 'changePage',
                path
            })
        },
        userInit (user) {
            dispatch({
                type: 'userInit',
                user
            })
        },
        prompt (msg) {
            dispatch({
                type: 'prompt',
                message: msg
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)