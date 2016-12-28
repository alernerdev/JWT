(function () {

    'use strict';

    var express = require('express');
    var bodyParser = require('body-parser');
    var chalk = require('chalk');
    var dataAccess = require('./dataAccess');
    var User = require('./user');
    var jwt = require('./services/jwt');

    var app = express();
    app.use(bodyParser.json());

    // allow CORS
    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*'); // from anywhere
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        next();
    });

    /////////
    app.post('/register', function (req, res) {
        var user = {email: req.body.email, password: req.body.password};

        dataAccess.createUser(user, function(err, u) {
            var payload = {
                iss: req.hostname,
                sub: u.id // subject
            }
            var token = jwt.encode(payload, "my very secret");

            // toJSON on my User object strips out the password
            res.status(200).send({
                user: u.toJSON(),
                token: token
            });
        });
    });

    /////////
    var jobs = [
        'Cook', 'SuperHero', 'Programmer', 'Toast Inspector'
    ];
    app.get('/jobs', function(req, res) {
        // this is a secured resource, so check if there is a token
        console.log("received request for jobs on the server side");
        for (var i = 0; i<req.headers.length; i++)
            console.log(req.headers[i]);

        if (!req.headers.Authorization) {
            console.log("there is no token");
            return res.status(401).send({message: 'You are not authorized to view jobs.  Please login'});
        }

        console.log("there IS a token!!!!");
        res.json(jobs);
    });

    ////////
    var server = app.listen(4000, function () {
        console.log("JWT api listening on ", server.address().port);

    });

    dataAccess.connectDB('mongodb://localhost/jwt', function () {
        console.log('database is ready to be used');
    });
}());
