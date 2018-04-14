const User = require('./index').User;


module.exports = {
    create (user) {
        return User.create(user).exec()
    }
};