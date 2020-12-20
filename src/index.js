// make bluebird default Promise
const express = require('express');
const socketio = require('socket.io');
const http = require('http');
Promise = require('bluebird'); // eslint-disable-line no-global-assign
const router = require('./config/express');
const mongoose = require('./config/mongoose');
const { v1 } = require('uuid');

// open mongoose connection
const PORT = 3002
const app = express();
mongoose.connect();
// const server = http.createServer(app);
// const io = socketio(server, {
//   cors: {
//     origin: '*',
//   }
// });

// io.on('connection', (socket) => {
//   console.log('we have a new connect.');

//   socket.on('join', ({ name, room }) => {
//     console.log(name, room)
//   })

//   socket.on('disconect', () => {
//     console.log(' User had left')
//   })
// })

let online = 0
let numberArr = [];
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: '*',
  }
});
app.use(router)


// listen to requests
server.listen(PORT, () => console.log(`sevaer run ${PORT}`));

io.on('connection', (socket) => {
  console.log('co nguoi ket nói ' , socket.id)
  online++;
  io.emit("numberOnlineServe", online);
  socket.on('disconnect', function () {
    socket.emit('disconnected');
    online--;
    console.log('co ngat nguoi ket nói ' , socket.id)
    io.emit("numberOnlineServe", online);
  });
})

/**
* Exports express
* @public
*/

module.exports = app;
