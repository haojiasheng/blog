const path = require('path');
const express = require('express');
const router = express.Router();
const fs = require('fs');
const User = require('../mongoDB/user');
const sha1 = require('sha1');


var createFolder = function(folder){
    try{
        // 测试 path 指定的文件或目录的用户权限,我们用来检测文件是否存在
        // 如果文件路径不存在将会抛出错误"no such file or directory"
        fs.accessSync(folder);
    }catch(e){
        // 文件夹不存在，以同步的方式创建文件目录。
        fs.mkdirSync(folder);
    }
};

var uploadFolder = './APP/public/img/avatar/';
createFolder(uploadFolder);

router.get('/', function (req, res, next) {
    res.render('index')
});

router.use(require('express-formidable')({
    uploadDir: path.join(__dirname, '../APP/public/img/avatar'),
    keepExtensions: true
}));

router.post('/create', function (req, res, next) {
    const Email = req.fields.Email;
    const nikeName = req.fields.nikeName;
    const bio = req.fields.bio;
    let password = req.fields.password;
    const repassword = req.fields.repassword;
    let avatar = req.files.avatar;
    const gender = req.files.gender;
    if (avatar) {
        avatar = req.files.avatar.path.split(path.sep).pop()
    } else {
        avatar = ''
    }
    let data = req.sendData;
    try {
        if (!Email.length) {
            throw new Error('请输入邮箱');
        }
        if (!(/.+@.+\..{2,}$/).test(Email)) {
            throw new Error('邮箱输入格式不正确');
        }
        if (!nikeName.length) {
            throw new Error('请输入昵称');
        }
        if (!password.length) {
            throw new Error('请输入密码');
        }
        if (password.length < 6) {
            throw new Error('密码不能少于6位');
        }
        if (repassword.toString() !== password.toString()) {
            throw new Error('两次密码输入不一致');
        }
    } catch (e) {
        data.msg = e.message;
        data.code = -1;
        res.json(data);
        return
    }
    password = sha1(password);
    let user = {
        Email,
        nikeName,
        bio,
        password,
        avatar,
        gender
    };
    User.create(user).then(function (result) {
        user = result.ops[0];
        delete user.password;
        data.data = user;
        data.msg = '恭喜！注册成功！';
        req.session.user = user;
        res.json(data);
    })
        .catch(function (e) {
            if (req.files.avatar) {
                fs.unlink(req.files.avatar.path);
            }
            if (e.message.match('duplicate key')) {
                data.msg = '邮箱已被占用';
                res.json(data);
                return
            }
            next(e)
        })
});


module.exports = router;