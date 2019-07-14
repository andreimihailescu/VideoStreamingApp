var App = {
    videoPlayerNode: document.getElementById('videoPlayer'),
    socket: io(),

    getCurrentTime() {
        return this.videoPlayerNode.currentTime;
    },

    sendEvent() {
        this.socket.emit('event', 'WORKS');
    },

    init() {
        var self = this;

        this.videoPlayerNode.onplay = function () {
            self.socket.emit('event', 'Video started');
        };

        this.videoPlayerNode.onpause = function () {
            self.socket.emit('event', 'Video paused');
        };

        this.socket.onevent = function (data) {
            console.log('EVENT', data);
            alert('WORKS');
        };
    }
};

App.init();