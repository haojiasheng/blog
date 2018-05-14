const fs = require('fs');
const path = require('path');

module.exports = function (app) {
    app.use('/signUp', require('./signUp'));
    app.use('/user', require('./user'));
    app.use('/post', require('./post'));
    app.use('/post', require('./post'));
    app.use('/comment', require('./comment'));
    app.use('/search', require('./search'));
   /*app.use(function(req, res, next) {
        fs.readFile(path.resolve(__dirname,'../APP/static/index.html'), function(err, data){
            if(err){
                console.log(err);
                res.send('后台错误');
            } else {
                res.writeHead(200, {
                    'Content-type': 'text/html',
                    'Connection':'keep-alive'
                });
                res.end(data);
            }
        });
        next()
    });*/
};

