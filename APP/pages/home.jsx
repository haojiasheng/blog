import React,{ Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import fetchPosts from '../lib/asyncAction';

class Main extends Component {
    componentWillMount () {
        console.log(this.props)
        const {postInit, userInit} = this.props;
        postInit();
        userInit();
    }
    render () {
        return (
            <div>

            </div>
        )
    }
}
Main.propTypes = {
    posts: PropTypes.array.isRequired,
    postInit: PropTypes.func.isRequired,
    userInit: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    posts: state.posts,
    user: state.user
});
function mapDispatchToProps(dispatch, ownProps) {
    return {
        postInit () {
            dispatch(fetchPosts('get', '/postInit',{}, 'postInit'))
        },
        userInit () {
            dispatch(fetchPosts('get', '/userInit', {}, 'userInit'))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)