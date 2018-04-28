const express = require('express');
const router = express.Router();
const Post = require('../mongoDB/post');
const Comment = require('../mongoDB/comment');

router.get('/', function (req, res, next) {
    res.render('index')
});

router.post('/init', function (req, res, next) {
    const data = req.sendData;
    const author = req.body.author;
    const page = req.body.page || 1;
    const count = (page-1) * 20;
    Post.getPosts(author, count).then(function (result) {
        data.data = result;
        data.page = page;
        res.json(data);
    })
        .catch(next)
});

router.post('/create', function (req, res, next) {
    const post = req.body;
    const data = req.sendData;
    const title = post.title;
    const content = post.content;
    try {
        if (!title) {
            throw new Error('请输入标题！')
        }
        if (!content) {
            throw new Error('请输入文章内容！')
        }
    } catch (e) {
        data.msg = e.message;
        data.code = -1;
        res.json(data);
        return;
    }
    Post.create(post).then(function (result) {
        data.data = result.ops[0];
        res.json(data);
    })
        .catch(next)
});

router.get('/detail/:id', function (req, res, next) {
    let data = req.sendData;
    const id = req.params.id;
    Promise.all([Post.getPostByid(id), Comment.getCommentByPostId(id)]).then(function (result) {
        if (!result[0]) {
            res.msg = '该文章不存在';
            res.code = -1;
        }
        result[0].comments = result[1];
        data.data = result[0];
        return res.json(data);
    })
        .catch(next)
});

module.exports = router;