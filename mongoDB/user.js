const User = require('./index').User;


module.exports = {
    create (user) {
        return User.create(user).exec();
    },
    getUserInfo (Email) {
        return User.findOne({Email: Email}).exec();
    },
    getUserById (id) {
        return User.findOne({_id: id}).exec()
    }
};