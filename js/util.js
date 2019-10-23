'use strict';


function loadObjFromStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

function saveObjToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}