function getNextData(that, initData) {
    let componentDidMount = null;
    if (that.componentDidMount) {
        componentDidMount = that.componentDidMount.bind(that);
    }
    let componentWillUnmount = null;
    if (that.componentWillUnmount) {
        componentWillUnmount = that.componentWillUnmount.bind(that);
    }
    that.initState = (props) => {
        const {path, location} = props;
        const {pathname, search} = location;
        that.pathName = pathname + search;
        that.path = {};
        if (typeof path[that.pathName] === 'object' && path[that.pathName].path === that.pathName) {
            that.path = path[that.pathName];
        } else {
            that.path = getPath(path.init, initData);
            that.path.path = that.pathName;
        }
        const callbackState = that.path.header.right.callbackState;
        if (callbackState === 1) {
            that.path.header.right.callback = that.rightCallback;
        }
        that.props.pageChange(that.path);
    };

    that.readDOM = () => {
        const {scrollX, scrollY} = that.path;
        window.scroll(scrollX, scrollY)
    };

    that.unMount = () => {
        that.path.scrollX = window.scrollX;
        that.path.scrollY = window.scrollY;
        that.props.pageChange(that.path);
    };
    that.initState(that.props);
    that.componentDidMount = () => {
        if (componentDidMount) {
            componentDidMount()
        }
        that.readDOM();
    };
    that.componentWillUnmount = () => {
        if (componentWillUnmount) {
            componentWillUnmount()
        }
        that.path.header.callback = null;
        that.unMount();
    }
}

function typeCheck(obj) {
    return {}.toString.call(obj).match(/^.+\s(.+)]$/)[1].toLocaleLowerCase()
}

function getPath(obj, initObj) {
    let newObj = {};
    if (Object.keys(obj).length) {
        newObj = initObj;
    }
    for (let key in obj) {
        if(typeCheck(obj[key]) !== 'object') {
            newObj[key] = initObj[key] || obj[key];
        } else if (!initObj[key]){
            newObj[key] = obj[key];
        } else {
            newObj[key] = getPath(obj[key], initObj[key]);
        }
    }
    return newObj
}
export default getNextData