const express = require('express');
const router = express.Router();
const Comment = require('../mongoDB/comment');
const CommentLike = require('../mongoDB/commentLike');

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
        return Comment.getCommentById(result.ops[0]._id);
    }).then(function (comment) {
        data.data = comment;
        return res.json(data);
    })
        .catch(next)
});

router.post('/like', function (req, res, next) {
    const data = req.sendData;
    const params = req.body;
    CommentLike.addCommentLike(params).then(function (result) {
        data.msg = '说的好有道理哦~';
        return res.json(data)
    })
        .catch(next)
});
router.post('/unLike', function (req, res, next) {
    const data = req.sendData;
    const params = req.body;
    CommentLike.unCommentLike(params).then(function (result) {
        data.msg = '细细想来这人大概是在胡说八道~';
        return res.json(data)
    })
        .catch(next)
});
module.exports = router;