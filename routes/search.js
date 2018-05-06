const express = require('express');
const router = express.Router();
const Post = require('../mongoDB/post');

router.post('/',function (req, res, next) {
    const data = req.sendData;
    const key = req.body.key;
    const reg = new RegExp('[\\s\\S]*' + key + '[\\s\\S]*', 'gi');
    Post.searchPostByKey(reg).then(function (result) {
        data.data = result;
        return res.json(data)
    })
        .catch(next)
});

module.exports = router;