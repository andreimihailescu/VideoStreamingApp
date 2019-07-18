module.exports = function (server) {
    const io = require('socket.io')(server);

    function getConnectedClients(videoName) {
        return Object.keys(io.sockets.connected);
    }

    function checkIfClientAlreadyConnected(client) {
        const connectedClients = io.sockets.connected;

        for (let prop in connectedClients) {
            if (!connectedClients.hasOwnProperty(prop)) continue;

            if (connectedClients[prop].id !== client.id &&
                connectedClients[prop].handshake.address === client.handshake.address) {
                return true;
            }
        }

        return false;
    }

    io.on('connection', socket => {
        if (checkIfClientAlreadyConnected(socket)) {
            console.log('WS: User already connected');
            return;
        }

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
