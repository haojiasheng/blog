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
            type: 'pageChange',
            path
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage)