const CommentLike = require('./index').CommentLike;

module.exports = {
    addCommentLike: function (commentLike) {
        return CommentLike.create(commentLike).exec();
    },
    unCommentLike: function (commentLike) {
        return CommentLike.remove(commentLike).exec();
    },
    getCommentLikeCount: function (commentId) {
        return CommentLike.count({commentId: commentId}).exec();
    },
    checkUserCommentLike: function (commentLike) {
        return CommentLike.count(commentLike).exec();
    }
};