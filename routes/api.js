var express = require('express');
var router = express.Router();
var userController = require('./../controllers/user')
var classifyController = require('./../controllers/classify')
var articleController = require('./../controllers/article')

router.get('/api/admin/user',userController.show)
router.post('/api/admin/user',userController.insert)
router.put('/api/admin/user/:id',userController.update)
router.delete('/api/admin/user/:id',userController.delete)

router.get('/api/admin/classify',classifyController.show)
router.post('/api/admin/classify',classifyController.insert)
router.put('/api/admin/classify/:id',classifyController.update)
router.delete('/api/admin/classify/:id',classifyController.delete)

router.get('/api/admin/article',articleController.show)
router.get('/api/admin/article/edit/:id',articleController.editShow)
router.delete('/api/admin/article/:id',articleController.delete)
router.put('/api/admin/article/edit/:id',articleController.update)
router.post('/api/admin/article/create',articleController.insert)

module.exports = router;
