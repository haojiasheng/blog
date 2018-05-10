import React,{Component} from 'react';
import {connect} from 'react-redux';
import style from '../public/css/search.scss';
import {Topic} from '../common/index';


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
        const {data} = this.path.search;
        return (
            <div>
                <div className={style.post}>
                    {
                        data.map((post) => {
                            return <Topic key={post._id} {...post}/>
                        })
                    }
                </div>
            </div>
        )
    }
    componentWillUnmount () {
        this.path.search.key = undefined;
        this.path.search.data = [];
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