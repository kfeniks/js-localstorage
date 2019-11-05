"use strict";

function setLocalStorageByName(name, data)
{
    return localStorage.setItem(name, jsonEncode(data));
}

function setLocalStorageByNameDefault(name, data)
{
    return localStorage.setItem(name, data);
}

function getLocalStorageByName(name)
{
    var data = localStorage.getItem(name);
    return data ? jsonDecode(data) : null;
}

function pushLocalStorageByNameWithValue(name, data)
{
    var local = getLocalStorageByName(name);
    if(local) {
        var value = isset(local.value) ? local.value : null;
        /*if(value.isArray) {
            value.forEach(function(item, index, array) {
                alert(item);
            });
        }*/
    } else {
        setLocalStorageByName(name, data);
    }
}

function getLocalStorageByNameDefault(name)
{
    var data = localStorage.getItem(name);
    return data ? data : null;
}

function removeKeyLocalStorage(key) {
    return localStorage.removeItem(key);
}

function cleanLocalStorage()
{
    return localStorage.clear();
}