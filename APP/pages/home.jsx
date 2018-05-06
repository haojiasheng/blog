import React,{ Component } from 'react';
import {connect} from 'react-redux';
import style from '../public/css/home.scss';
import {DataLoad, Topic} from '../common/index';

class Main extends Component {
    constructor (props) {
        super(props);
        App.getNextData(this,{
            header: {
                content: '主页',
                show: true,
                left: {
                    content: '登录/注册',
                    src: '/signIn',
                    avatar: true
                },
                right: {
                    icons: 'newPost_icon.png',
                    src: '/postEdit'
                }
            },
            search: {
                show: true
            },
            data: {
                loadAnimation: true,
                page: 0,
                loadMessage: ''
            }
        });
    }
    render () {
        const {posts} = this.props;
        const {loadAnimation, loadMessage} = this.path.data;
        return (
            <div className={style.home}>
                <ul className={style.list}>
                    {posts.map((post, index) =>
                        <Topic {...post} index={index} key={post._id} />
                    )}
                </ul>
                <DataLoad loadAnimation={loadAnimation} loadMessage={loadMessage}  />
            </div>
        )
    }
    componentDidMount () {
        this.onScrollBottom();
        const {posts} = this.props;
        if (!posts.length) {
            this.loadData();
        }
    }
    componentWillUnmount () {
        window.onscroll = null;
    }
    loadData () {
        const {postAdd} = this.props;
        let page = ++this.path.data.page;
        const data = {
            page
        };
        App.api.post('/post/init', data).then((res) => {
            if (res.code === 0) {
                const data = res.data;
                if (data.length === 0) {
                    this.path.data.loadAnimation = false;
                    this.path.data.loadMessage = '加载完毕';
                } else {
                    this.path.data.loadAnimation = false;
                    this.path.data.page = page;
                }
                postAdd(data);
                this.componentOffset();
            }
        })
    }
    onScrollBottom () {
        this.clientHeight = parseFloat(document.documentElement.clientHeight);
        window.onscroll = () => {
            let srcoll = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
            if (this.clientHeight + srcoll >= this.offset && this.offset > 1000) {
                if (!this.path.data.loadAnimation && !this.path.data.loadMessage) {
                    this.path.data.loadAnimation = true;
                    this.loadData();
                }
            } else {
                this.componentOffset()
            }
        };
    }
    componentOffset () {
        this.offset = parseFloat(window.getComputedStyle(App.DOM).height) - 10;
    }
}

const mapStateToProps = (state) => ({
    posts: state.posts,
    user: state.user,
    path: state.path
});
function mapDispatchToProps(dispatch, ownProps) {
    return {
        pageChange (path) {
            dispatch({
                type: 'pageChange',
                path
            })
        },
        postAdd (data) {
            dispatch({
                type: 'postAdd',
                data
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)