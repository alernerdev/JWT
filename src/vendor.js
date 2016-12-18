/*
this file contains references to the vendor libraries used on this project
This is used by webpack for production build ONLY. A separate bundle for prod build
is useful since its unlikely to change as often as app code.
So all the libraries listed here will be written to vendor.js so they can be cached
until one of them changes. So this avoids customers having to download a huge JS file anytime a
line of code changes.  They only need to download vendor.js when the vendor library changes.
Any files that arent listed here will be bundled into main.js for the production build.
*/

/* eslint-disable no-unused-vars */
import fetch from 'whatwg-fetch';
import 'angular';
import 'angular-ui-router';
//import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.paper.min.css'; // theme
import 'animate.css/source/animate.min.css'

