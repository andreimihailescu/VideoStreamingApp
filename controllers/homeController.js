const videoModel = require('../models/videoModel');
const child_process = require("child_process");

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

    static restart(req, res, next) {
        console.log("Application restarting, this is pid " + process.pid);

        process.on("exit", function () {
            child_process.spawn(process.argv.shift(), process.argv, {
                cwd: process.cwd(),
                detached: true,
                stdio: "inherit"
            });
        });

        const gitPull = child_process.execSync(`cd ${process.cwd()} | git pull`);
        console.log('Git pull: ', gitPull.toString());

        setTimeout(()=> {
            process.exit();
        }, 1000);
    }
}

module.exports = HomeController;

