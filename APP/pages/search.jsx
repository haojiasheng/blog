import React,{Component} from 'react';
import Search from '../common/search';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import getNextData from '../common/getNextData';


class SearchPage extends Component{
    componentWillMount () {
        getNextData(this,{
            header: {
                show: false
            },
            search: {
                show: true,
                state: 1
            }
        });
    }
    render () {
        return (
            <div>
                1
            </div>
        )
    }
}

const mapStateToProps = function (state) {
    return {
        path: state.path
    }
};
const mapDispatchToProps = {
    pageChange (path) {
        return {
            type: 'changePage',
            path
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage)