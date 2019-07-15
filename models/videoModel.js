const fs = require('fs');

class VideoModel {
    static getVideoList() {
        return fs.readdirSync('./resources/video');
    }
}

module.exports = VideoModel;
