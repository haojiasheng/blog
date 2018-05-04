const express = require('express');
const router = express.Router();
const Like = require('../mongoDB/like');

router.post('/',function (req, res, next) {
    let data = req.sendData;
    const like = req.body;
    Like.postLike(like).then(function (result) {
        data.msg = '你喜欢了这篇文章';
        return res.json(data);
    })
        .catch(next)
});

router.post('/cancel', function (req, res, next) {
    let data = req.sendData;
    const like = req.body;
    Like.postNotLike(like).then(function (result) {
        data.msg = '你变心了';
        return res.json(data);
    })
        .catch(next)
});

module.exports = router;