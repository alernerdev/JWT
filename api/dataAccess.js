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

                    callback(null, new User(result.ops[0].email, result.ops[0].password, result.ops[0]._id));
                });
            });
        });
    }

    module.exports = {
        connectDB: connectDB,
        createUser: createUser,
        closeConnection: closeConnection
    }
}());
