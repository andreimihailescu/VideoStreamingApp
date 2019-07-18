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

    onTimeUpdate() {
        App.socket.emit('timeUpdate', {
            currentTime: App.videoPlayerNode.currentTime,
            paused: App.videoPlayerNode.paused
        });
    },

    onInitialSync(data) {
        if (!data.paused) {
            App.videoPlayerNode.play()
        }

        App.videoPlayerNode.currentTime = data.currentTime;
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

    socketDisconnect() {
        alert('You already have an opened connection to this lobby.');
    },

    init() {
        this.getParams();
        this.socketConnect();
        this.videoPlayerNode.onplay = this.onPlayCallback;
        this.videoPlayerNode.onpause = this.onPauseCallback;
        this.videoPlayerNode.onseeking = this.onSeekCallback;
        this.videoPlayerNode.ontimeupdate = this.onTimeUpdate;
        this.socket.on('broadcast', this.onBroadcastCallback);
        this.socket.on('userConnected', this.onUserConnected);
        this.socket.on('initialSync', this.onInitialSync);
        this.socket.on('disconnect', this.socketDisconnect);
    }
};

App.init();
