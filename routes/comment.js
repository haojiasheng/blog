const express = require('express');
const router = express.Router();
const Comment = require('../mongoDB/comment');

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
        res.json(data)
    })
        .catch(next)
});

module.exports = router;