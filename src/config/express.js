const express = require('express')
const morgan = require('morgan');
const bodyParser = require('body-parser');
const compress = require('compression');
const methodOverride = require('method-override');
const cors = require('cors');
const helmet = require('helmet');
const passport = require('passport');
const routes = require('../api/routes/v1');
const { logs } = require('./vars');
const strategies = require('./passport');
const error = require('../api/middlewares/error');

/**
* Express instance
* @public
*/

const app = express();
// let number = 0

// const server = require('http').Server(app)
// var options = {
//   allowUpgrades: true,
//   transports: [ 'polling', 'websocket' ],
//   pingTimeout: 9000,
//   pingInterval: 3000,
//   cookie: 'mycookie',
//   httpCompression: true,
//   origins: '*:*'
// };
// let numberArr = [];
// const io = require('socket.io')(server, options);
// // console.log(io);
// io.on('connection', function(socket){
//   if(numberArr.length > 0 ){
//     numberArr.map((item) => {
//       if(item !== socket.id){
//         numberArr.push(socket.id);
//         number++;
//         console.log('co nguoi let noi'+ socket.id);
//       }
//     })
//   }else{
//     console.log('co nguoi let noi'+ socket.id);
//     numberArr.push(socket.id)
//     number++;
//   }
//   // number++;
//   // ngat ket noi
//   socket.on("disconnect", function() {
//     console.log('ngat ket noi'+ socket.id);
//     number--;
//   })

//   socket.emit("numberOnline", numberArr.length)
// })

// request logging. dev: console | production: file
app.use(morgan(logs));

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// gzip compression
app.use(compress());

// lets you use HTTP verbs such as PUT or DELETE
// in places where the client doesn't support it
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// enable authentication
app.use(passport.initialize());
passport.use('jwt', strategies.jwt);
passport.use('facebook', strategies.facebook);
passport.use('google', strategies.google);

// mount api v1 routes
app.use('/v1', routes);

// if error is not an instanceOf APIError, convert it.
app.use(error.converter);

// catch 404 and forward to error handler
app.use(error.notFound);

// error handler, send stacktrace only during development
app.use(error.handler);

module.exports = app;
