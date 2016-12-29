'use strict'

import 'angular';
import 'angular-ui-router';
import 'angular-animate';

//import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.paper.min.css';
import 'animate.css/animate.css'; // used for alert registration display
import './styles/index.css';
import './styles/alert.css';
import './styles/animation.css'; // used for state transitions

import './app.js';
import './app.config.js'

import './controllers/registerCtrl.js';
import './controllers/headerCtrl.js';
import './controllers/logoutCtrl.js';
import './controllers/jobsCtrl.js';
import './controllers/loginCtrl.js';


import './services/alertSvc.js';
import './services/authTokenFactory.js';
import './services/authInterceptorFactory.js';


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


