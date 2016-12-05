'use strict'

import './index.css'

import numeral from 'numeral';

import { getUsers, deleteUser } from './api/userApi';

const courseValue = numeral(1000).format('$0,0.00');
// notice these are not single quotes but backticks
console.log(`I would pay ${courseValue} for this awseome course!`);
console.log('did you see the numeral message?')

// populate table of users via Api call

getUsers().then(result => {
    let usersBody = "";

    result.forEach(user => {
        // notice these are backticks to allow substitution
        usersBody += `<tr>
            <td><a href="#" data-id="${user.id}" class="deleteUser">Delete</a></td>
            <td>${user.id}</td>
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.email}</td>
            </tr>`
    });
    global.document.getElementById('users').innerHTML = usersBody;

    const deleteLinks = global.document.getElementsByClassName('deleteUser');

    // must use array.from to create a real array from a DOM collection
    // getElementsbyClassName only returns "array like" object
    // attach a click handler to each link
    Array.from(deleteLinks, link => {
        link.onclick = function (event) {
            const element = event.target;
            event.preventDefault();
            deleteUser(element.attributes["data-id"].value);
            const row = element.parentNode.parentNode;
            row.parentNode.removeChild(row);
        }
    });
});

