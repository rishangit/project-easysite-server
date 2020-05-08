const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session')

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'dist')));
app.use(cors());

var hour = 36000000;
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: "secret",
  secureProxy: true,
  cookie: { expires: new Date(Date.now() + hour ) }
}))

const api = require('./api');

var redirectToHTTPS = require('express-http-to-https').redirectToHTTPS
 
// Don't redirect if the hostname is `localhost:port` or the route is `/insecure`
app.use(redirectToHTTPS([/localhost:(\d{4})/], [/\/insecure/], 301));

app.use('/api', api);

app.get('*', (req, res) => {   
    console.log('url not match')
});

const port = process.env.PORT || '3001';
app.set('port', port);






const server = http.createServer(app);

server.listen(port, () => console.log(`API running on localhost:${port}`));