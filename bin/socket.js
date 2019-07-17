module.exports = function (server) {
    const io = require('socket.io')(server);

    function getConnectedClients(videoName) {
        return Object.keys(io.sockets.connected);
    }

    io.on('connection', socket => {
        const videoName = socket.conn.request._query.video;
        socket.join(videoName);

        socket.on('start', data => {
            console.log('WS: Start received', data);

            socket.broadcast.to(videoName).emit('broadcast', {
                eventType: 'start',
                data: data
            });
        });

        socket.on('pause', data => {
            console.log('WS: Pause received', data);

            socket.broadcast.to(videoName).emit('broadcast', {
                eventType: 'pause',
                data: data
            });
        });

        socket.on('seek', data => {
            console.log('WS: Seek received', data);

            socket.broadcast.to(videoName).emit('broadcast', {
                eventType: 'seek',
                data: data
            });
        });

        socket.on('disconnect', () => {
            console.log('WS: User disconnected', socket.id);
        });
        console.log('WS: User connected', socket.id);

        socket.emit('userConnected', {
            usersList: getConnectedClients(videoName)
        });
    });
};
