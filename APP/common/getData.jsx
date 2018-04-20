import React,{Component} from 'react';
import connect from 'react-redux';
import store from '../lib/store';

const Main = (mySetting) => {
    const setting = {
        path: '',
        component: <div></div>
    };
    for (let key in mySetting) {
        setting[key] = mySetting[key]
    }
    class Index extends Component {
        constructor (props) {
            super(props);
            this.initState = (props) => {
                const {state, location} = props;
                const {pathname, search} = location;
                this.path = pathname + search;

                if (typeof state.path[this.path] === 'object' && state.path[this.path].path === this.path) {
                    this.state = state.path[this.path];
                } else {
                    this.state.path = this.path
                }
            };

            this.readDOM = () => {
                const {scrollX, scrollY} = this.state;
                window.scroll(scrollX, scrollY)
            };

            this.unMount = () => {
                this.state.scrollX = window.scrollX;
                this.state.scrollY = window.scrollY;
                this.props.setPage(this.state)
            };
            this.initState(this.props)
        }
        render () {
            return (
                <div>
                    <this.props.setting.component {...this.props} store={store} />
                </div>
            )
        }
        componentDidMount() {
            this.readDOM()
        }
        componentWillUnmount () {
            this.unMount();
        }
    }
    Index.defaultProps = {setting};
    return connect((state) => {return {state:state.path[setting.path]}})
};



export default Main