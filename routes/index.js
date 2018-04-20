module.exports = function (app) {
    app.use('/',require('./home'));
    app.use('/signUp', require('./signUp'));
    app.use('/user', require('./user'))
};