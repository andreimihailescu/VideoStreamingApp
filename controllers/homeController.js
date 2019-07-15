const videoModel = require('../models/videoModel');

class HomeController {
    static index(req, res, next) {
        res.render('index', {
            videoList: videoModel.getVideoList()
        });
    }

    static room(req, res, next) {
        res.render('room', {
            videoUrl: {
                full: req.query.video,
                split: req.query.video.split('.')
            }
        });
    }
}

module.exports = HomeController;
