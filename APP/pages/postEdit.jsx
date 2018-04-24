import React, {Component} from 'react';
import getNextData from '../common/getNextData';
import style from '../public/css/postEdit.scss';
import {connect} from 'react-redux';

class PostEdit extends Component{
    constructor (props) {
        super(props);
        getNextData(this, {
            header: {
                content: '发布',
                show: true,
                left: {
                    back: true
                },
                right: {
                    content: '发布'
                }
            }
        })
    }
    render () {
        return (
            <div className={style.postEdit}>
                <input placeholder={'请输入标题'}/>
                <textarea></textarea>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    path: state.path
});

function mapDispatchToProps(dispatch) {
    return {
        pageChange (path) {
            dispatch({
                type: 'changePage',
                path
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostEdit);