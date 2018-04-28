export default {
    checkLogin (that) {
        const {user, history} = that.props;
        if (!user) {
            App.prompt('请先登录');
            history.push('/signIn');
        }
    },
    checkNotLogin (that) {
        const {user, history} = that.props;
        if (user) {
            App.prompt('已登录');
            history.goBack('back');
        }
    }
}