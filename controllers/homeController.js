const videoModel = require('../models/videoModel');

class HomeController {
    static index(req, res, next) {
        res.render('index', {
            videoList: videoModel.getVideoList()
        });
    }

    static room(req, res, next) {
        res.render('room', {title: 'Express'});
    }
}

module.exports = HomeController;
