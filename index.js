const express = require('express');
const app = express();
const config = require('./lib/config')
console.log(config)
require('./lib/express')(app, express);
require('./routes')(app);
require('./lib/db')

app.listen(config.server.port, function () {
    console.log('Express is running on port ' + config.server.port);
});