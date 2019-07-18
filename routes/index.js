var express = require('express');
var router = express.Router();
var homeController = require('../controllers/homeController');

router.get('/', homeController.index);

router.get('/room', homeController.room);

router.get('/restart', homeController.restart);

module.exports = router;

