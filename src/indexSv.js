const express = require('express');
const socketio = require('socket.io');
const http = require('http');
Promise = require('bluebird'); // eslint-disable-line no-global-assign
const router = require('./config/express');
const mongoose = require('./config/mongoose');

// open mongoose connection
const PORT = 5000
const hostname = '103.15.50.89';
const app = express();
mongoose.connect();


let online = 0
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('This is a test fro nodjs app.js!\n');
});
const io = socketio(server, {
  cors: {
    origin: '*',
  }
});
app.use(router)


// listen to requests
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

io.on('connection', (socket) => {
  console.log('co nguoi ket nói ' , socket.id)
  online++;
  io.emit("numberOnlineServe", online);
  socket.on('disconnect', function () {
    online--;
    console.log('co ngat nguoi ket nói ' , socket.id)
    io.emit("numberOnlineServe", online);
  });
})
