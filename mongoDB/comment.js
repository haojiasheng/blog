const Comment = require('../mongoDB').Comment;

Comment.plugin('addCommentLike', {
    afterFind: function (comments, userId) {
        return Promise.all(comments.map(function (comment) {
                return Comment.count({_id: comment._id, commentLike: userId}).exec().then(function (result) {
                        if (comment.commentLike) {
                            comment.commentLikeCount = comment.commentLike.length;
                        } else {
                            comment.commentLikeCount = 0;
                        }
                        comment.commentLike = !!result;
                        return comment
                    }
                )
            })
        )
    }
});


module.exports = {
    createComment: function (comment) {
        return Comment
            .create(comment)
            .populate({path: 'author', model: 'User'})
            .exec()
    },
    getCommentByPostId: function (postId, userId) {
        return Comment.find({postId: postId})
            .populate({path: 'author', model: 'User'})
            .sort({_id: 1})
            .addCommentLike(userId)
            .addCreatedAt()
            .exec();
    },
    commentLike: function (commentId, userId) {
        return Comment.update({_id: commentId}, {$addToSet: {commentLike: userId}}).exec()
    },
    commentUnLike: function (commentId, userId) {
        return Comment.update({_id: commentId}, {$pull: {commentLike: userId}}).exec()
    }
};