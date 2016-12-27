'use strict'

import 'angular';
import 'angular-ui-router';

//import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.paper.min.css';
import 'animate.css/animate.css';
import './styles/index.css';
import './styles/alert.css';

import './app.js';
import './app.config.js'

import './controllers/registerCtrl.js';
import './controllers/headerCtrl.js';

import './services/alertSvc.js';
import './services/authToken.js';

import './directives/validateEquals.js';

import numeral from 'numeral';

import {
    getUsers,
    deleteUser
} from './api/userApi';

const courseValue = numeral(1000).format('$0,0.00');
// notice these are not single quotes but backticks
console.log(`I would pay ${courseValue} for this awseome course!`);
console.log('did you see the numeral message?')


