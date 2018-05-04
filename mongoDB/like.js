const Like = require('./index').Like;

module.exports = {
    postLike (like) {
        return Like.create(like).exec()
    },
    postNotLike (like) {
        return Like.remove(like).exec()
    },
    checkUserLike (like) {
        return Like.find(like).exec()
    },
    getPostLikeCount (postId) {
        return Like.count({postId: postId}).exec()
    }
};