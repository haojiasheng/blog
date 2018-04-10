import React,{Component} from 'react';
import style from '../public/css/search.scss';
import { PropTypes } from 'prop-types';
import {connect} from 'react-redux';


class Search extends Component{
    render () {
        return (
            <div onClick={this.searchPage.bind(this)} className={`${style.search} ${this.props.pageState === 1 ? style.searchPage : (this.props.pageState === 3 ? style.hide : '')}`}>
                <input ref={(input) => this.input = input} onInput={this.searchInput.bind(this)}  />
                <span  onClick={this.goBack.bind(this)}>取消</span>
                <div className={style.text}>
                    <span></span>
                    <i>搜索</i>
                    <b></b>
                </div>
            </div>
        )
    }
    searchPage  ()  {
        if (!this.props.pageState) {
            this.input.focus();
            this.context.router.history.push('/search');
        }
    }
    searchInput () {
    }
    goBack () {
        this.context.router.history.replace('/')
    }
}
Search.contextTypes = {
    router: PropTypes.object,
};
Search.propTypes = {
    pageState: PropTypes.number.isRequired
};

const mapStateToProps = (state) => ({
    pageState: state.pageState
});

export default connect(mapStateToProps)(Search)