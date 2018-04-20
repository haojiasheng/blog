function getNextData(that, initData) {
    that.initState = (props) => {
        const {path, location} = props;
        const {pathname, search} = location;
        that.pathName = pathname + search;
        that.path = {};
        if (typeof path[that.pathName] === 'object' && path[that.pathName].path === that.pathName) {
            that.path = path[that.pathName];
        } else {
            /*Object.assign(that.path, path.init, initData, {path: that.pathName});*/
            that.path = getPath(path.init, initData);
            that.path.path = that.pathName;
        }
        that.props.pageChange(that.path)
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
        that.readDOM()
    };
    that.componentWillUnmount = () => {
        that.unMount()
    }
}

function typeCheck(obj) {
    return {}.toString.call(obj).match(/^.+\s(.+)]$/)[1].toLocaleLowerCase()
};

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