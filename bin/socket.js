module.exports = function (server) {
    const io = require('socket.io')(server);

    function getConnectedClients() {
        return Object.keys(io.sockets.connected);
    }

    io.on('connection', client => {
        client.on('start', data => {
            console.log('WS: Start received', data);

            client.broadcast.emit('broadcast', {
                eventType: 'start',
                data: data
            });
        });

        client.on('pause', data => {
            console.log('WS: Pause received', data);

            client.broadcast.emit('broadcast', {
                eventType: 'pause',
                data: data
            });
        });

        client.on('seek', data => {
            console.log('WS: Seek received', data);

            client.broadcast.emit('broadcast', {
                eventType: 'seek',
                data: data
            });
        });

        client.on('disconnect', () => {
            console.log('WS: User disconnected', client.id);
        });
        console.log('WS: User connected', client.id);

        client.emit('userConnected', {
            usersList: getConnectedClients()
        });
    });
};
