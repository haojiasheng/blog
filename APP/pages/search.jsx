import React,{Component} from 'react';
import {connect} from 'react-redux';


class SearchPage extends Component{
    componentWillMount () {
        App.getNextData(this,{
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
        const {data} = this.props.path.search;
        return (
            <div>

            </div>
        )
    }
    componentWillUnmount () {
        this.path.search.key = undefined;
        this.path.search.data = null;
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
            type: 'pageChange',
            path
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage)