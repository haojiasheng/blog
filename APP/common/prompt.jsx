import React,{Component} from 'react';
import style from '../public/css/prompt.scss';
import {connect} from 'react-redux';
import propTypes from 'prop-types';

class Prompt extends Component{
    constructor (props) {
        super(props)
    }
    componentWillReceiveProps () {
        const {removePrompt} = this.props;
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                removePrompt()
            }, 3000);
        } else {
            this.timer = setTimeout(() => {
                removePrompt()
            }, 3000);
        }
    }
    render () {
        const {status, message} = this.props.prompt;
        return (
            !status && <div className={style.remindBox}>
                {message}
            </div>
        )
    }
    componentWillUnmount () {
        clearTimeout(this.timer)
    }
}

Prompt.propTypes = {
    prompt: propTypes.object.isRequired,
    removePrompt: propTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    prompt: state.prompt
});

function mapDispatchToProps(dispatch) {
    return {
        removePrompt () {
            dispatch({
                type: 'removePrompt'
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Prompt)