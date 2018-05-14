const express = require('express');
const router = express.Router();
const Post = require('../mongoDB/post');
const Comment = require('../mongoDB/comment');

router.post('/init', function (req, res, next) {
    const data = req.sendData;
    const author = req.body.author;
    const page = req.body.page || 1;
    const count = (page-1) * 20;
    Post.getPosts(author, count).then(function (result) {
        data.data = result;
        data.page = page;
        return res.json(data);
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

router.post('/detail', function (req, res, next) {
    let data = req.sendData;
    const id = req.body.id;
    const userId = req.body.userId.toString().trim() || 1;
    Promise.all([Post.getPostByid(id), Comment.getCommentByPostId(id, userId), Post.checkUserLike(id, userId), Post.getCollectCount(id), Post.checkUserCollect(id, userId)]).then(function (result) {
        let post = result[0];
        if (!post) {
            res.msg = '该文章不存在';
            res.code = -1;
        }
        post.comments = result[1];
        post.like = !!result[2];
        post.collectCount = result[3];
        post.collect = !!result[4];
        data.data = post;
        return res.json(data);
    })
        .catch(next)
});

router.post('/like', function (req, res, next) {
    let data = req.sendData;
    const postId = req.body.postId;
    const userId = req.body.userId;
    Post.userLike(postId, userId).then(function (result) {
        data.msg = '你喜欢了这篇文章';
        return res.json(data);
    })
        .catch(next)
});

router.post('/unLike', function (req, res, next) {
    let data = req.sendData;
    const postId = req.body.postId;
    const userId = req.body.userId;
    Post.userUnLike(postId, userId).then(function (result) {
        data.msg = '你变心了';
        return res.json(data);
    })
        .catch(next)
});

router.post('/collect',function (req, res, next) {
    const data = req.sendData;
    const postId = req.body.postId;
    const userId = req.body.userId;
    Post.userCollect(postId, userId).then(function (result) {
        data.msg = '收藏成功!';
        return res.json(data)
    })
        .catch(next)
});

router.post('/unCollect',function (req, res, next) {
    const data = req.sendData;
    const postId = req.body.postId;
    const userId = req.body.userId;
    Post.userUnCollect(postId, userId).then(function (result) {
        data.msg = '取消收藏';
        return res.json(data)
    })
        .catch(next)
});
module.exports = router;