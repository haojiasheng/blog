const Comment = require('../mongoDB').Comment;
const CommentLike = require('../mongoDB/commentLike');

Comment.plugin('addCommentLike', {
    afterFind: function (comments, userId) {
        return Promise.all(comments.map(function (comment) {
            const params = {
                commentId: comment._id,
                userId: userId
            };
            return Promise.all([CommentLike.getCommentLikeCount(comment._id), CommentLike.checkUserCommentLike(params)]).then(function (result) {
                comment.commentLikeCount = result[0];
                comment.commentLike = !!result[1];
                return comment;
            })
                .catch(function (e) {
                    console.log(e)
                })
        }))
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
            .addCreatedAt().exec();
    },
    getCommentById: function (id) {
        return Comment.findOne({_id: id})
            .populate({path: 'author', model: 'User'})
            .addCreatedAt()
            .exec();
    },
    getPostCommentCount: function (postId) {
        return Comment.count({postId: postId}).exec()
    }
};