import React,{Component} from 'react';
import Search from '../common/search';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';


class SearchPage extends Component{
    componentWillMount () {
        this.props.upSearch()
    }
    render () {
        return (
            <div>
                1
            </div>
        )
    }
    componentWillUnmount () {
        this.props.unSearch()
    }
}
SearchPage.propsType = {
    pageState: PropTypes.number.isRequired,
    upSearch: PropTypes.func.isRequired,
    unSearch: PropTypes.func.isRequired
};

const mapStateToProps = function (state) {
    return {
        pageState: state.pageState
    }
};
const mapDispatchToProps = {
    upSearch () {
        return {
            type: 'search'
        }
    },
    unSearch () {
        return {
            type: 'back'
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage)