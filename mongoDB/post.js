const Post = require('./index').Post;

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
            .exec()
    },
    getPostByid (id) {
        return Post.findOne({_id: id})
            .populate({path: 'author', model: 'User'})
            .addCreatedAt()
            .exec()
    }
};