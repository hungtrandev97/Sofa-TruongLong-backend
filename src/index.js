// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign
const app = require('./config/express');
const mongoose = require('./config/mongoose');

// open mongoose connection
mongoose.connect();

// listen to requests
// app.listen(port, () => logger.info(`server started on port ${port} (${env})`));

app.listen(process.env.PORT || 3002);

/**
* Exports express
* @public
*/

module.exports = app;
