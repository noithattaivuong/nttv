const http = require('http');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const logger = require('morgan');
const cors = require('cors');


module.exports = (app, express) => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static('public'));
    app.use(express.urlencoded({
        extended: false
    }));
    app.use(express.json({
        limit: '50mb'
    }));
    app.use(cookieParser());
    app.use(cors());
}
