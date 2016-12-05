// this file isnt transpiled so must use CommonJS and ES5

// register babel to transpile our tests before mocha run our tests
require('babel-register')();

// disable webpack features that Mocha doesnt understand
require.extensions['.css'] = function(){}
