const Collect = require('./index').Collect;

module.exports = {
    addCollect (collect) {
        return Collect.create(collect).exec();
    },
    unCollect (collect) {
        return Collect.remove(collect).exec();
    },
    getCollectCount (postId) {
        return Collect.count({postId: postId}).exec();
    },
    checkUserCollect (collect) {
        return Collect.find(collect).exec();
    }
};