import React,{Component} from 'react';
import style from '../public/css/prompt.scss';
import {connect} from 'react-redux';

class Prompt extends Component{
    constructor (props) {
        super(props)
        this.state = {
            status: 1
        }
    }
    componentWillMount () {
        this.timer = setTimeout(() => {
            this.setState({
                status: 1
            })
        }, 3000);
    }
    render () {
        return (
            !this.state.status && <div className={style.remindBox}>
                123
            </div>
        )
    }
    componentWillUnmount () {
        clearTimeout(this.timer)
    }
}

Prompt.propTypes = {

};

const mapStateToProps = (state) => ({
    prompt: state.prompt
})

function mapDispatchToProps(dispatch) {
    return {
        removePrompt () {
            dispatch({
                type: 'removePrompt'
            })
        }
    }
}

export default connect()(Prompt)