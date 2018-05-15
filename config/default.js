module.exports = {
    port: 3000,
    session: {
        secret: 'hjsBlog',
        key: 'hjsBlog',
        maxAge: 2592000000
    },
    mongodb: 'mongodb://localhost:27017/hjsBlog',
    domainName: 'http://139.224.11.44'/*http://localhost*/
};