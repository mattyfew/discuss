const app = require('express')();
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const Store = require('connect-redis')(session);



app.use(session({
    store: new Store({
        ttl: 3600,
        host: 'localhost',
        port: 6379
    }),
    resave: false,
    saveUninitialized: true,
    secret: require('./config').secret
}));

mongoose.connect('mongodb://localhost:discuss/discuss')

// app.use(morgan('combined'));
app.use(cors())
// app.use(bodyParser.json({ type: '*/*'}));
app.use(bodyParser.json());






router(app);

const port = process.env.PORT || 3090;
const server = http.createServer(app);
const io = require('socket.io').listen(server);
server.listen(port)

// var server = app.listen(port, () => console.log('server listening on ' + port));



io.on('connection', function(socket) {
    console.log(`socket with the id ${socket.id} is now connected`);

    socket.on('disconnect', function() {
        console.log(`socket with the id ${socket.id} is now disconnected`);
    });

    socket.on('socketpong', function() {
        console.log("PONG");
        socket.emit('socketping')
    })
});
