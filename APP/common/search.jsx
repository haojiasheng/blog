import React,{Component} from 'react';
import style from '../public/css/commonSearch.scss';
import { PropTypes } from 'prop-types';
import {connect} from 'react-redux';


class Search extends Component{
    constructor (props) {
        super(props);
    }
    render () {
        const {pathname} = this.context.router.route.location;
        const {path} = this.props;
        this.path = path[pathname] || path.init;
        const {search} = this.path;
        return (
            search.show && (<div onClick={this.searchPage.bind(this)} className={`${style.search} ${search.state === 1 ? style.searchPage : ''}`}>
                <input ref={(input) => this.input = input} onInput={this.searchInput.bind(this)}  />
                <span  onClick={this.goBack.bind(this)}>取消</span>
                <div className={style.text}>
                    <span></span>
                    {!search.key && <i>搜索</i>}
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
    searchInput (e) {
        const key = e.target.value.toString().trim();
        const params = {
            key
        };
        if( key !== '') {
            App.api.post('/search',params).then((res) => {
                    if (res.code === 0) {
                        this.path.search.data = res.data;
                        this.props.pageChange(this.path);
                    }
                }
            );
        } else {
            this.path.search.data = [];
        }
        this.path.search.key = key;
        this.props.pageChange(this.path);
    }
    goBack () {
        this.input.value = '';
        this.context.router.history.goBack()
    }
}
Search.contextTypes = {
    router: PropTypes.object,
};

const mapStateToProps = (state) => ({
    path: state.path
});

function mapDispatchToProps(dispatch) {
    return {
        pageChange (path) {
            dispatch({
                type: 'pageChange',
                path
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)