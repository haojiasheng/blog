import React,{Component} from 'react';
import style from '../public/css/search.scss';
import { PropTypes } from 'prop-types';
import {connect} from 'react-redux';


class Search extends Component{
    render () {
        const {pathname} = this.context.router.route.location;
        const {path} = this.props;
        const data = path[pathname] || path.init;
        const search = data.search;
        return (
            search.show && (<div onClick={this.searchPage.bind(this)} className={`${style.search} ${search.state === 1 ? style.searchPage : ''}`}>
                <input ref={(input) => this.input = input} onInput={this.searchInput.bind(this)}  />
                <span  onClick={this.goBack.bind(this)}>取消</span>
                <div className={style.text}>
                    <span></span>
                    <i>搜索</i>
                    <b></b>
                </div>
            </div>)
        )
    }
    searchPage  ()  {
        if (!this.props.path.search) {
            this.input.focus();
            this.context.router.history.push('/search');
        }
    }
    searchInput () {
    }
    goBack () {
        this.context.router.history.goBack()
    }
}
Search.contextTypes = {
    router: PropTypes.object,
};

const mapStateToProps = (state) => ({
    path: state.path
});

export default connect(mapStateToProps)(Search)