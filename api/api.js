(function () {

    'use strict';

    var express = require('express');
    var bodyParser = require('body-parser');
    var chalk = require('chalk');
    var dataAccess = require('./dataAccess');
    var User = require('./user');
    var jwt = require('./services/jwt');
    var passport = require('passport')
    var PassportLocalStrategy = require('passport-local').Strategy;


    var mySecret = "my very secret";
    var usePassport = false;

    var app = express();
    app.use(bodyParser.json());

    app.use(passport.initialize());
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // allow CORS
    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*'); // from anywhere
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        next();
    });

    // tell passport how to identify users
    var strategy = new PassportLocalStrategy({
        usernameField: 'email'
    }, function (email, password, done) {
        var user = { email: email, password: password };

        dataAccess.findUser(user.email, function (err, u) {
            if (err)
                return done(err);

            // cant find user
            if (!u)
                return done(null, false, { message: 'Wrong email/password' });

            dataAccess.comparePasswords(password, u.password, function (err, isMatch) {
                if (err)
                  return done(err);

                if (!isMatch)
                    return done(null, false, { message: 'Wrong email/password' });

                return done(null, user);
            });
        });
    });
    passport.use(strategy);

    /////////
    app.post('/register', registerHandler);
    app.post('/login', loginHandler);
    app.get('/jobs', getJobsHandler);

    /////////
    // post /register
    function registerHandler(req, res) {
        var user = { email: req.body.email, password: req.body.password };

        dataAccess.createUser(user, function (err, u) {
            if (err)
                return res.status(401).send({ message: 'Failed to create account' });

            createAndSendToken(req.hostname, u, res);
        });
    }

    // post /login
    function loginHandler(req, res) {

        if (usePassport) {
            passport.authenticate('local', function (err, user) {
                if (err)
                    next(err);

                req.login(user, function (err) {
                    if (err)
                        next(err);

                    createAndSendToken(req.hostname, user, res);
                });
            })(req, res, next);
        }
        else {
            // if here, using jwt
            var user = { email: req.body.email, password: req.body.password };

            dataAccess.findUser(user.email, function (err, u) {
                if (err)
                    throw err;

                // cant find user
                if (!u)
                    return res.status(401).send({ message: 'Wrong email/password' });

                dataAccess.comparePasswords(user.password, u.password, function (err, isMatch) {
                    if (err)
                        throw err;

                    if (!isMatch)
                        return res.status(401).send({ message: 'Wrong email/password' });

                    createAndSendToken(req.hostname, u, res)
                });
            });
        }
    }


    var jobs = [
        'Cook', 'SuperHero', 'Programmer', 'Toast Inspector'
    ];
    function getJobsHandler(req, res) {
        // this is a secured resource, so check if there is a token
        if (!req.headers.authorization) {
            return res.status(401).send({ message: 'You are not authorized to view jobs.  Please login' });
        }

        // the layout is: 'Bearer tokenstringvalue'
        var token = req.headers.authorization.split(' ')[1];
        var payload = jwt.decode(token, mySecret);
        if (!payload.sub) {
            // missing email piece ?
            return res.status(401).send({ message: 'You are not authorized to view jobs' });
        }


        res.json(jobs);
    };


    function createAndSendToken(hostname, user, res) {
        var payload = {
            iss: hostname,
            sub: user.id // subject
        }
        var token = jwt.encode(payload, mySecret);

        // toJSON on my User object strips out the password
        res.status(200).send({ user: user.toJSON(), token: token });
    }


    ////////
    var server = app.listen(4000, function () {
        console.log("JWT api listening on ", server.address().port);

        if (process.argv.length <= 2)
            return;

        for (var i = 2; i < process.argv.length; i++) {
            if (process.argv[i] == "--usePassport") {
                usePassport = true;
                console.log("using passport for authentication");
            }
        }
    });

    if (!usePassport) {
        dataAccess.connectDB('mongodb://localhost/jwt', function () {
            console.log('database is ready to be used');
        });
    }
} ());
