var express = require('express');
var router = express.Router();
var streamController = require('../controllers/streamController');

router.get('/', streamController.stream);

module.exports = router;
