    'use strict';

    // emerging standard for making http calls library
    // what working group fetch
    import 'whatwg-fetch';
    import getBaseUrl from './baseUrl'; //  is it dev or prod?  

    const baseUrl = getBaseUrl();


    export function getUsers() {
        return get('users');
    }

    export function deleteUser(id) {
        // this substitutes id into the Url 
        return del(`users/${id}`);
    }

    function get(url) {
        return fetch(baseUrl + url).then(onSuccess, onError);
    }

    function del(url) {
        // so if this is in dev/mock mode, this request gets forwarded to the JSONServer
        // and it knows how to work with fake data file.
        // if in prod mode, it gets forwarded to my real backend and it will get data from a database
        const request = new Request(baseUrl + url, {
            method: 'DELETE'
        });

        return fetch(request).then(onSuccess, onError);
    }

    function onSuccess(response) {
        return response.json();
    }

    function onError(error) {
        console.log(error); // eslint-disable-line no-console
    }
