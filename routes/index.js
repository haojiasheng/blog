module.exports = function (app) {
    app.use('/signUp', require('./signUp'));
    app.use('/user', require('./user'));
    app.use('/post', require('./post'));
    app.use('/comment', require('./comment'));
    app.use('/search', require('./search'));
    app.get('*', function (req, res, next) {
        res.render('index')
    })
};

