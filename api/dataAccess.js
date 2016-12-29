(function () {
    'use strict';

    var bcrypt = require('bcrypt-nodejs');

    var mongoClient = require('mongodb').MongoClient;
    var chalk = require('chalk');
    var User = require('./user');

    var collectionName = 'users';
    var collection = null;
    var db = null;


    function closeConnection() {
        // THIS ISNT WORKING!!!
        // mongoClient.close();
    }

    function connectDB(connectionString, callback) {
        mongoClient.connect(connectionString, function (err, database) {
            if (err)
                throw err;

            db = database;
            collection = db.collection(collectionName);

            console.log(chalk.blue('database connected'));
            callback();
        });
    }

    function comparePasswords(plainPassword, hashedPassword, callback) {
        bcrypt.compare(plainPassword, hashedPassword, callback);
    }


    function createUser(user, callback) {

        bcrypt.genSalt(10, function (err, salt) {

            if (err)
                throw err; // salt generating error

            bcrypt.hash(user.password, salt, null, function (err, hash) {
                if (err)
                    throw err; // hash generating error

                // do not store passwords, only hashes.
                // overwrite it on the way into DB
                user.password = hash;
                collection.insertOne(user, function (err, result) {
                    if (err) {
                        throw err;
                    }

                    // I could be returning whatever the DB is giving me, but I only want to return certain fields, 
                    // not potentially a ton of fields.  So I am creating a User object
                    callback(null, new User(result.ops[0].email, result.ops[0].password, result.ops[0]._id));
                });
            });
        });
    }

    function findUser(email, callback) {
        console.log("looking for: " + email);

        collection.findOne({email: email}, function(err, result) {
            if (err) {
                throw err;
            }

            // I could be returning whatever the DB is giving me, but I only want to return certain fields, 
            // not potentially a ton of fields.  So I am creating a User object
            callback(null, result ? new User(result.email, result.password, result._id) : null);
        });
    }

    module.exports = {
        connectDB: connectDB,
        createUser: createUser,
        findUser: findUser,
        comparePasswords: comparePasswords,
        closeConnection: closeConnection
    }
}());
