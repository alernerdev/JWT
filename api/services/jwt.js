(function () {

    'use strict';

    var crypto = require('crypto');

    function encode(payload, secret) {
        var algorithm = 'HS256';

        var header = {
            typ: 'JWT',
            alg: algorithm
        }

        var jwt = base64Encode(JSON.stringify(header)) + '.' + base64Encode(JSON.stringify(payload));
        jwt += '.' + signature(jwt, secret);

        return jwt;
    }

    function base64Encode(str) {
        return new Buffer(str).toString('base64');
    }

    function signature(str, key) {
        return crypto.createHmac('sha256', key).update(str).digest('base64');
    }

    module.exports = {
        encode : encode
    };

}());
