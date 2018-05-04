const Post = require('./index').Post;
const Comment = require('./comment');
const Like = require('./like');

Post.plugin('addCommentsAndLikeCount', {
    afterFind: function (posts) {
        return Promise.all(posts.map(function (post) {
            let id = post._id;
            return Promise.all([Comment.getPostCommentCount(id), Like.getPostLikeCount(id)]).then(function (result) {
                post.commentCount = result[0];
                post.likeCount = result[1];
                return post;
            })
        }))
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
    }
};