var App = {
    videoPlayerNode: document.getElementById('videoPlayer'),

    getCurrentTime() {
        return this.videoPlayerNode.currentTime;
    }
};