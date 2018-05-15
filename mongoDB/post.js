const Post = require('./index').Post;

Post.plugin('addCommentsAndLikeCount', {
    afterFind: function (posts) {
        return posts.map(function (post) {
            if (post.like) {
                post.likeCount = post.like.length;
            } else {
                post.likeCount = 0;
            }
            return post
        })
    }
});


module.exports = {
    create (post) {
        return Post.create(post).exec();
    },
    getPosts (author, count) {
        const query = {};
        if (author) {
            query.author = author;
        }
        return Post.find(query)
            .populate({path: 'author', model: 'User'})
            .sort({_id: -1})
            .skip(count)
            .limit(20)
            .addCreatedAt()
            .addCommentsAndLikeCount()
            .exec()
    },
    getPostByid (id) {
        return Post.findOne({_id: id})
            .populate({path: 'author', model: 'User'})
            .addCreatedAt()
            .exec()
    },
    searchPostByKey (key) {
        return Post
            .find({$or: [{content: key}, {title: key}]})
            .populate({path: 'author', model: 'User'})
            .addCreatedAt()
            .addCommentsAndLikeCount()
            .exec()
    },
    userLike (postId, userId) {
        return Post.update({_id: postId}, {$addToSet: {like: userId}}).exec();
    },
    userUnLike (postId, userId) {
        return Post.update({_id: postId}, {$pull: {like: userId}}).exec();
    },
    checkUserLike (postId, userId) {
        return Post.count({_id: postId, like: userId}).exec()
    },
    userCollect (postId, userId) {
        return Post.update({_id: postId}, {$addToSet: {collect: userId}}).exec();
    },
    userUnCollect (postId, userId) {
        return Post.update({_id: postId}, {$pull: {collect: userId}}).exec();
    },/*
    getCollectCount (postId) {
        return Post.count({_id: postId}).exec();
    },*/
    checkUserCollect (postId, userId) {
        return Post.count({_id: postId, collect: userId}).exec();
    },
    commentCountIncrease: function (postId) {
        return Post.update({_id: postId}, {$inc: {commentCount: 1}}).exec();
    }
};