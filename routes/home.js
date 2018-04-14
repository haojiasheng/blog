const express = require('express');
const router = express.Router();

router.get('/',function (req, res, next) {
    res.render('index')
});

router.get('/postInit', function (req, res, next) {
    res.json({
        name: '456'
    })
});

module.exports = router