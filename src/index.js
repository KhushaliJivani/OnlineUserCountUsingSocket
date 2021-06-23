const express = require('express');
const client = require("../src/configRedis/redisInit");
const app = express();
const path = require("path");
const http = require('http');
const server = http.createServer(app);
const {Server} = require("socket.io");
const io = new Server(server);
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
//start a socket io server.
io.on('connection', (socket) => {
    client.incr('counter', function (err, counter1) {})
    socket.on('displayUser', () => {
        client.get('counter', (err, data) => {
            io.emit('onlineUser', data);
        })
    });
    socket.on('disconnect', () => {
        client.decr('counter', (err, counter) => {
            io.emit('disconnectedUser', counter);
        })
    });
});
server.listen(3000, () => {
    console.log('Server is listening on 3000');
});