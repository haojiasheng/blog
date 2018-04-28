const Comment = require('../mongoDB').Comment;

module.exports = {
    createComment: function (comment) {
        return Comment.create(comment).exec()
    },
    getCommentByPostId: function (postId) {
        return Comment.find({postId: postId})
            .populate({path: 'author', model: 'User'})
            .sort({_id: 1})
            .addCreatedAt().exec();
    }
};