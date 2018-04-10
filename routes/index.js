module.exports = function (app) {
    app.use('/',require('./home'));
    app.use('/user', require('./user'))
};