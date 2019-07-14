var express = require('express');
var router = express.Router();
var streamController = require('../controllers/StreamController');

router.get('/', streamController.streamController.stream);

module.exports = router;