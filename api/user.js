(function () {

    'use strict';

    var chalk = require('chalk');

    function User(email, password, id) {
        this.email = email;
        this.password = password;
        this.id = id;

        console.log(chalk.green('created user: email: ' + email + " password: " + password + " id: " + id));
    }


    User.prototype.toJSON = function () {

        // omit password when serializing object out
        return {
            id: this.id, 
            email: this.email
        };
    }

    module.exports = User;
} ());