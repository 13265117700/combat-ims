var express = require('express');
var router = express.Router();
var indexController = require('./../controllers/index.js')
var authController = require('./../controllers/auth')

router.get('/all',indexController.breadcrumbShow)
router.get('/all/index',indexController.articleShow)
router.get('/all/index/:id',indexController.articleClassifyShow)
router.get('/all/index/aritcle/:id',indexController.articleContentShow)
router.post('/all/login',authController.login)

module.exports = router;
