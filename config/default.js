module.exports = {
    port: 3000,
    session: {
        secret: 'hjsBlog',
        key: 'hjsBlog',
        maxAge: 2592000000
    },
    mongodb: 'mongodb://localhost:27017/hjsBlog'
}