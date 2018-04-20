import React, {Component} from 'react';
import style from '../public/css/postDetail.scss';
import getNextData from '../common/getNextData';
import {connect} from 'react-redux';
import header from "../common/header";

class postDetail extends Component{
    constructor (props) {
        super(props);
        getNextData(this, {
            header: {
                show: true,
                content: '有哪些稳中带皮的操作',
                left: {
                    back: true
                },
                right: {
                    notSelect_icons: 'notCollection_icon.png',
                    icons: 'collection_icon.png'
                }
            }
        });
        console.log(this.path)
    }
    render () {
        return (
            <div>
                <div className={style.post}>
                    <h2>有哪些稳中带皮的操作</h2>
                </div>
            </div>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(postDetail);