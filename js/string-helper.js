"use strict";

function jsonEncode(value)
{
    return JSON.stringify(value);
}

function jsonDecode(value)
{
    return JSON.parse(value);
}

function getConsole(data) {
    console.log(data);
}