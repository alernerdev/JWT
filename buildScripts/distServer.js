import express  from 'express';
import path from 'path';
import open from 'open';
import compression from 'compression';

/* eslint-disable no-console */

const port = 3000;
const app = express();

// gzip compression
app.use(compression());
// dist folder is where production files are
app.use(express.static('dist'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
})

/*

if  we are hitting heroku, this isnt needed

app.get('/users', function(req, res) {
    // hardcoding as a starting point
    res.json([
        {"id": 1, "firstName":"Bob", "lastName":"Smith", "email":"bob@gmail.com"},
        {"id": 2, "firstName":"Tammy", "lastName":"Norton", "email":"tnorton@gmail.com"},
        {"id": 3, "firstName":"Tina", "lastName":"Lee", "email":"lee.tina@gmail.com"}
    ])
})
*/

app.listen(port, function(err) {
    if (err) {
        console.log(err);
    }
    else {
        // automatically open the web site the moment you launch the web server
        open('http://localhost:' + port);
    }
});
