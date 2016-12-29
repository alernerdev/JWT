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
        jwt += '.' + createSignature(jwt, secret);

        return jwt;
    }

    function decode(token, mySecret) {
        var segments = token.split('.');
        if (segments.length !== 3)
            throw new Error("Authorization token structure is incorrect");

        var header = JSON.parse(base64Decode(segments[0]));
        var payload = JSON.parse(base64Decode(segments[1]));

        // figure out if the header and the payload really produce the signature that is the 3rd part
        var raw = segments[0] + '.' + segments[1];
        if (!verify(raw, mySecret, segments[2]))
            throw new Error("Token verification failed");
        
        return payload;
    }

    function verify(raw, secret, signature) {
        return signature === createSignature(raw, secret);
    }

    function base64Encode(str) {
        return new Buffer(str).toString('base64');
    }

    function base64Decode(str) {
        return new Buffer(str, 'base64').toString();
    }

    function createSignature(str, key) {
        return crypto.createHmac('sha256', key).update(str).digest('base64');
    }

    module.exports = {
        encode: encode,
        decode: decode
    };

} ());
