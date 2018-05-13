export default {
    checkLogin (that, state) {
        const {user, history} = that.props;
        if (!user) {
            App.prompt('请先登录');
            if (state) {
                history.replace('/signIn');
            } else {
                history.push('/signIn');
            }
            return false;
        }
        return true
    },
    checkNotLogin (that) {
        const {user, history} = that.props;
        if (user) {
            App.prompt('已登录');
            history.goBack('back');
            return true;
        }
        return false
    }
}