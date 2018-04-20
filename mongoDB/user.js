const User = require('./index').User;


module.exports = {
    create (user) {
        return User.create(user).exec();
    },
    getUserInfo (Email) {
        return User.findOne({Email: Email}).exec();
    }
};