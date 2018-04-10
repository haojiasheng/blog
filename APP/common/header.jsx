import React,{Component} from 'react';
import style from '../public/css/header.scss';
import {connect}  from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component{
    render () {
        const {pageState, user} = this.props;
        return (
            <header className={pageState ? style.hide : ''}>
                {
                    user.Email ? (
                        <div className={style.avatar}>
                            <img src={require('../public/img/avatar.jpg')} />
                        </div>
                    ) : (
                        <span onClick={this.signIn.bind(this)} className={style.signIn}>注册/登陆</span>
                    )
                }
                <h2>主页</h2>
                <span>热门</span>
            </header>
        )
    }
    signIn () {
        this.context.router.history.push('/signup')
    }
}
Header.propsType = {
    pageState: PropTypes.number.isRequired,
    user: PropTypes.object.isRequired
};
Header.contextTypes = {
    router: PropTypes.object
};

const mapStateToProps = (state) => ({
    pageState: state.pageState,
    user: state.user
});

export default connect(mapStateToProps)(Header)