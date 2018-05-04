const express = require('express');
const router = express.Router();
const Collect = require('../mongoDB/collect');

router.post('/',function (req, res, next) {
    const data = req.sendData;
    const collect = req.body;
    Collect.addCollect(collect).then(function (result) {
        data.msg = '收藏成功!';
        return res.json(data)
    })
        .catch(next)
});

router.post('/cancel',function (req, res, next) {
    const data = req.sendData;
    const collect = req.body;
    Collect.unCollect(collect).then(function (result) {
        data.msg = '取消收藏';
        return res.json(data)
    })
        .catch(next)
});


module.exports = router;