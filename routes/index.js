module.exports = function (app) {
    app.use('/',require('./home'));
    app.use('/signUp', require('./signUp'));
    app.use('/user', require('./user'));
    app.use('/post', require('./post'));
    app.use('/comment', require('./comment'));
    app.use('/like', require('./like'));
    app.use('/collect', require('./collect'));
    app.use('/search', require('./search'))
    app.get('*', function (req, res, next) {
        res.render('index')
    })
};

