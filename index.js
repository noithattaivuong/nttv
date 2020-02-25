const express = require('express');
const app = express();
const config = require('./lib/config')
console.log(config)
require('./lib/db')
require('./lib/express')(app, express);
require('./routes')(app);

app.listen(config.server.port, function () {
    console.log('Express is running on port ' + config.server.port);
});