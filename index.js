const path = require('path');
const express = require('express');
const session = require('express-session');
const app = express();
const router = require('./routes/index');
const MongoStore = require('connect-mongo')(session);
const config = require('config-lite')(__dirname);
const bodyParser = require('body-parser');
const pkg = require('./package');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'APP/static')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use(session({
    name: config.session.key,
    secret: config.session.secret,
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: config.session.maxAge
    },
    store: new MongoStore({
        url: config.mongodb
    })
}));

app.use(function (req, res, next) {
    req.sendData = {
        code: 0,
        msg: '操作成功！',
        data: null
    };
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001")
    next()
})

router(app);

var debug = require('debug')('react-note:server');
var http = require('http');


var port = normalizePort(process.env.PORT || '293');
app.set('port', port);


var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

console.log(`${pkg.name} listening on port ${port}`)
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}
