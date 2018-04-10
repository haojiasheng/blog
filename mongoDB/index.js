const config = require('config-lite')(__dirname);
const Mongolass = require('mongolass');
const mongolass = new Mongolass();
mongolass.connect(config.mongodb);

const User = mongolass.model('User', {
    Email: {
        type: 'string',
        required: true
    },
    name: {
        type: 'string',
        required: true
    },
    password: {
        type: 'string',
        required: true
    },
    avatar: {
        type: 'string'
    },
    gender: {
        type: 'string',
        enum: ['m', 'w'],
        default: 'm'
    },
    bio: {
        type: 'string'
    },
    nikeName: {
        type: 'string',
        required: true
    }
});

User.index({Email: 1}, {unique: true}).exec();

module.export = {
    User
};