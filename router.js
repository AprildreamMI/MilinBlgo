var express = require('express');
var User = require('./models/user');
var md5 = require('blueimp-md5');

var router = express.Router();

router.get('/',function (req,res) {
    res.render('index.html',{
        user:req.session.user
    });
})

router.get('/login',function (req,res) {
    res.render('login.html');
})

router.post('/login',function (req,res) {
    User.findOne({
        email:req.body.email,
        password:md5(md5(req.body.password))
    },function (err,ret) {
        if (err) {
            router.get('/login',function (req,res) {
                res.render('login.html');
            })
        }
        if (ret) {
            req.session.user = ret;
            res.status(200).json({
                err_code:0,
                message:'Ok'
            })
        } else {
            return res.status(200).json({
                err_code:1,
                message:'邮箱或密码不正确'
            })
        }
    })
})

router.get('/logout',function (req,res) {
    req.session.user = null;

    res.redirect('/login');
})

router.get('/register',function (req,res) {
    res.render('register.html');
})

router.post('/register', async function (req,res) {

    var userBody = req.body;
    
    try {
        // 涉及到回调函数的，都要加awit
        if (await User.findOne({email:userBody.email})) {
            return res.status(200).json({
                err_code:1,
                message:'邮箱已存在'
            })
        }
        
        if (await User.findOne({nickname:userBody.nickname})) {
            return res.status(200).json({
                err_code:2,
                message:'昵称已存在'
            })
        }


        userBody.password = md5(md5(userBody.password));
        ret = await new User(userBody).save();
        req.session.user = ret;
        res.status(200).json({
            err_code:0,
            message:'Ok'
        })


    // 错误的都调用此函数
    } catch (err) {
        return res.status(500).json({
            err_code:500,
            message:'Server Error!!!'
        })
    }

})



module.exports = router;