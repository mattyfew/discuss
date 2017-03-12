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

app.use(morgan('combined'));
app.use(cors())
app.use(bodyParser.json({ type: '*/*'}));

router(app);

const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('server listening on ' + port);
