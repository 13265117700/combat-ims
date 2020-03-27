var express = require('express');
var router = express.Router();
var indexController = require('./../controllers/index.js')

router.get('/all',indexController.breadcrumbShow)
router.get('/all/index',indexController.articleShow)
router.get('/all/index/:id',indexController.articleClassifyShow)
router.get('/all/index/aritcle/:id',indexController.articleContentShow)

module.exports = router;
