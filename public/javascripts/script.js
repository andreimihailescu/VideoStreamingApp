var App = {
    videoPlayerNode: document.getElementById('videoPlayer'),
    usersListNode: document.getElementById('usersList'),
    isSeekEventReceived: false,
    params: {},
    socket: null,

    onPlayCallback() {
        App.socket.emit('start', {
            currentTime: App.videoPlayerNode.currentTime
        });
    },

    onPauseCallback() {
        App.socket.emit('pause', {
            currentTime: App.videoPlayerNode.currentTime
        });
    },

    onSeekCallback() {
        if (App.isSeekEventReceived) {
            App.isSeekEventReceived = false;
            return;
        }

        App.socket.emit('seek', {
            currentTime: App.videoPlayerNode.currentTime
        });
    },

    onBroadcastCallback(data) {
        switch (data.eventType) {
            case 'start':
                App.videoPlayerNode.play();
                break;

            case 'pause':
                App.videoPlayerNode.pause();
                break;

            case 'seek':
                App.videoPlayerNode.currentTime = data.data.currentTime;
                App.isSeekEventReceived = true;
                break;

            default:
        }
    },

    onUserConnected(data) {
        let html = '';

        data.usersList.forEach(user => {
            html += `<li>${user}</li>`;
        });

        App.usersListNode.innerHTML = html;
    },

    getParams() {
        location.search.substr(1).split("&").forEach(function (item) {
            App.params[item.split("=")[0]] = item.split("=")[1]
        })
    },

    socketConnect() {
        this.socket = io.connect('', {
            query: `video=${this.params.video}`
        })
    },

    init() {
        this.getParams();
        this.socketConnect();
        this.videoPlayerNode.onplay = this.onPlayCallback;
        this.videoPlayerNode.onpause = this.onPauseCallback;
        this.videoPlayerNode.onseeking = this.onSeekCallback;
        this.socket.on('broadcast', this.onBroadcastCallback);
        this.socket.on('userConnected', this.onUserConnected);
    }
};

App.init();
