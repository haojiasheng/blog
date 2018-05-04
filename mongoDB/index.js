const config = require('config-lite')(__dirname);
const Mongolass = require('mongolass');
const mongolass = new Mongolass();
const objectidToTimestamp = require('objectid-to-timestamp');
mongolass.connect(config.mongodb);

mongolass.plugin('addCreatedAt', {
    afterFindOne: function (result) {
        if (result) {
            result.createAt = objectidToTimestamp(result._id)
        }
        return result;
    },
    afterFind: function (result) {
        result.forEach(function (item) {
            item.createAt = objectidToTimestamp(item._id)
        });
        return result;
    }
});

const User = mongolass.model('User', {
    Email: {
        type: 'string',
        required: true
    },
    password: {
        type: 'string',
        required: true
    },
    avatar: {
        type: 'string'
    },
    gender: {
        type: 'string',
        enum: ['m', 'w'],
        default: 'm'
    },
    bio: {
        type: 'string'
    },
    nikeName: {
        type: 'string',
        required: true
    }
});
User.index({Email: 1}, {unique: true}).exec();



const Post = mongolass.model('Post', {
    author: {
        type: Mongolass.Types.ObjectId,
        require: true
    },
    title: {
        type: 'string',
        require: true
    },
    content: {
        type: 'string',
        require: true
    },
    collect: {
        type: 'number',
        default: 0
    }
});
Post.index({author: 1, _id: -1}).exec();


const Comment = mongolass.model('Comment', {
    author: {
        type: Mongolass.Types.ObjectId,
        require: true
    },
    content: {
        type: 'string',
        require: true
    },
    postId: {
        type: Mongolass.Types.ObjectId,
        require: true
    }
});
Comment.index({postId: 1}, {_id: -1});

const Like = mongolass.model('Like', {
    postId: {
        type: Mongolass.Types.ObjectId,
        require: true
    },
    userId: {
        type: Mongolass.Types.ObjectId,
        require: true
    }
});
Like.index({userId: 1}).exec();

const Collect = mongolass.model('Collect', {
    postId: {
        type: Mongolass.Types.ObjectId,
        require: true
    },
    userId: {
        type: Mongolass.Types.ObjectId,
        require: true
    }
});
Collect.index({postId: 1}).exec();


const CommentLike = mongolass.model('CommentLike', {
    commentId: {
        type: Mongolass.Types.ObjectId,
        require: true
    },
    userId: {
        type: Mongolass.Types.ObjectId,
        require: true
    }
});
CommentLike.index({postId: 1}, {userId: -1}).exec();

module.exports = {
    User,
    Post,
    Comment,
    Like,
    Collect,
    CommentLike
};