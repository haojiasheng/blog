export default {
    checkLogin (that) {
        const {user, prompt, history} = that.props;
        if (!user) {
            prompt('请先登录');
            history.push('/signIn');
        }
    },
    checkNotLogin (that) {
        const {user, prompt, history} = that.props;
        if (user) {
            prompt('已登录');
            history.goBack('back');
        }
    }
}