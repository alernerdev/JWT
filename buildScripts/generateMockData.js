/*
    this script generates mock data for local development
    This way you dont have to point to the actual API,
    but you can enjoy realistic but randomized data and
    rapid page loads due to local static data
*/

/* eslint-disable no-console */

import jsf from 'json-schema-faker';
import {schema} from './mockDataSchema';
import fs from 'fs';
import chalk from 'chalk';

const json = JSON.stringify(jsf(schema));

fs.writeFile("./src/api/db.json", json, function(err){
    if (err) {
        return console.log(chalk.red(err));
    } else {
        return console.log(chalk.green("Mock data generated"));        
    }
})