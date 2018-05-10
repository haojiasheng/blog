const express = require('express');
const router = express.Router();
const Comment = require('../mongoDB/comment');
const User = require('../mongoDB/user');
const Post = require('../mongoDB/post');

router.post('/', function (req, res, next) {
    const data = req.sendData;
    const comment = req.body;
    try {
        if (!comment.content.length) {
            throw new Error('请填写评论内容')
        }
        if (!comment.author) {
            throw new Error('请先登陆')
        }
    } catch (e) {
        data.msg = e.message;
        data.code = -1;
        res.json(data);
        return;
    }
    Comment.createComment(comment).then(function (result) {
        data.data = result.ops[0];
        const postId = result.ops[0].postId;
        const userId = result.ops[0].author;
        return Promise.all([User.getUserById(userId), Post.commentCountIncrease(postId)]);
    }).then(function (user) {
        data.data.author = user[0];
        return res.json(data);
    })
        .catch(next)
});

router.post('/like', function (req, res, next) {
    const data = req.sendData;
    const commentId = req.body.commentId;
    const userId = req.body.userId;
    Comment.commentLike(commentId, userId).then(function (result) {
        data.msg = '说的好有道理哦~';
        return res.json(data)
    })
        .catch(next)
});
router.post('/unLike', function (req, res, next) {
    const data = req.sendData;
    const commentId = req.body.commentId;
    const userId = req.body.userId;
    Comment.commentUnLike(commentId, userId).then(function (result) {
        data.msg = '细细想来这人大概是在胡说八道~';
        return res.json(data)
    })
        .catch(next)
});

module.exports = router;