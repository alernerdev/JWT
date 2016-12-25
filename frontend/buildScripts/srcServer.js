import express  from 'express';
import path from 'path';
import open from 'open';
import webpack from 'webpack';
import config from '../webpack.config.dev';

/* eslint-disable no-console */

const port = 3000;
const app = express();

const compiler = webpack(config);
// express / webpack integration
app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../src/index.html'));
})

// Serve the views folder
app.get('/views/:view', function(req, res) {
    console.log(req.params.view);
    res.sendFile(path.join(__dirname, '../src/views/' + req.params.view));
})

app.get('/users', function(req, res) {
    // hardcoding as a starting point
    console.log("returning hardcoded data from the srcServer app.get");
    res.json([
        {"id": 1, "firstName":"Bob", "lastName":"Smith", "email":"bob@gmail.com"},
        {"id": 2, "firstName":"Tammy", "lastName":"Norton", "email":"tnorton@gmail.com"},
        {"id": 3, "firstName":"Tina", "lastName":"Lee", "email":"lee.tina@gmail.com"}
    ])
})

app.listen(port, function(err) {
    if (err) {
        console.log(err);
    }
    else {
        // automatically open the web site the moment you launch the web server
        open('http://localhost:' + port);
    }
});
