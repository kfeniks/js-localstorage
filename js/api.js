//'use strict';
var urlApi = '/api/map';

async function sendRequest(requestType, requestUrl, myData, methodName, params) {
    $.ajax({
        type: requestType,
        url: requestUrl,
        data:
        myData,
        success: function (response) {
            if(isset(response)) {
                //  getConsole(response);
                var jsonData = JSON.parse(response);

                // user is logged in successfully in the back-end
                // let's redirect
                if (jsonData.success == "1") {
                    if(methodName) {
                        action(methodName, jsonData, params);
                    }
                } else {
                    console.log('Invalid ' + requestUrl + '!');
                }
            }
        }
    });
}

function action(name, data, params) {
    if (typeof this[name] !== 'undefined' && typeof this[name] === 'function') {
        this[name](data, params);
    } else {
        console.log('Function ' + name + ' not found!');
    }
}

function countriesBorders(data, params)
{
    if(data) {
        var map = data.value;
        if(map) {
            var countries = map.countries;
            if(countries) {
                setLocalStorageByName('map', countries);
                countries.forEach(function(country) {
                    var colorCountry = country.color;
                    if(country.borders) {
                        var borders = country.borders.split(',');
                        borders.forEach(function(border) {
                            var number = document.querySelector("#" + border);
                            if(isset(number) && isset(number.style)) {
                                // number.style.backgroundColor = '#6aa5b8';
                                number.style.border = 'dashed';
                                //  console.log(border.coord);
                            }
                        });
                    }

                    if(country.body) {
                        var body = country.body.split(',');
                        body.forEach(function(pixel) {
                            var number = document.querySelector("#" + pixel);
                            // number.style.backgroundColor = '#6aa5b8';
                            number.style.backgroundColor = colorCountry;
                        });
                    }

                });
            }
        }
       // addOptions($("#listmeals"), value, 'name-name');
    }
}

function isset(e) {
    if (typeof e !== 'undefined' && e !== null && e !== "" && e !== 'NaN') {
        return true;
    }

    return false;
}

function isBoolTrue(e) {
    if(typeof e === 'boolean' && !e) {
        return 0;
    }

    return 1;
}

function getValue(data) {
    if (isset(data.value)) {
        return data.value;
    }
    return null;
}

function chosenElement(id) {
    var el = document.getElementById(id);
    if (isset(el.options[el.selectedIndex]) && isset(el.options[el.selectedIndex].value)) {
        return el.options[el.selectedIndex].value;
    }
    return null;
}

function getValueByID(e, t = 0) {
    var element = document.getElementById(e);
    var data = null;

    if (element !== null && element !== undefined) {

        if (t === 0 && element.selectedIndex > 0) {
            data = element.options[element.selectedIndex].value;
        }

        if (t === 1) {
            data = element.value;
        }

        if (t === 2) {
            data = element.checked ? 1 : 0;
        }
    }

    return data;
}

function getMap()
{
    sendRequest('GET', urlApi + '/data', null, 'countriesBorders', null);
}

function getBorder(coord)
{
    var data = {
        'coord' : coord,
        'country' : 1,
        };
    sendRequest('GET', urlApi + '/add-border', data, 'countesBorders', null);
}

function getBody(coord)
{
    var data = {
        'coord' : coord,
        'country' : 1,
    };
    sendRequest('GET', urlApi + '/add-body', data, 'countrBorders', null);
}

function setConfig()
{
    sendRequest('GET', urlApi + '/config', null, 'getConfigsGame', 'new');
}

function getConfigsGame(data, params)
{
    var config = {
        'gridHeight': 60,
        'gridWidth': 70,
        'default_user_type': 0,
        'default_user_login': 'player',
    };

    if(isset(data.value)) {
        config = data.value;
        setLocalStorageByName('config', data.value);
    }

    var auth = jsonDecode(getLocalStorageByNameDefault('profile'));
    var profile;

    if(isset(auth)) {
        profile = {
            'type': isset(auth.type) ? auth.type : config.default_user_type,
            'username': isset(auth.username) ? auth.username : config.default_user_login,
            'gridHeight': config.gridHeight,
            'gridWidth': config.gridWidth,
            'color': '#BAFEFC',
            'country_id': isset(auth.country_id) ? auth.country_id : 1,
            'points': isset(auth.points) ? auth.points : 0,
            'status': isset(auth.status) ? auth.status : 0,
            'created_at': isset(auth.created_at) ? auth.created_at : 0,
            'email': isset(auth.created_at) ? auth.created_at : '',
            'id': isset(auth.id) ? auth.id : 0,
        };
    } else {
        profile = {
            'type': config.default_user_type,
            'username': config.default_user_login,
            'gridHeight': config.gridHeight,
            'gridWidth': config.gridWidth,
            'color': '#BAFEFC',
            'country_id': 1,
            'points': 0,
            'status': 0,
            'created_at': 0,
            'email': '',
            'id': 0,
        };
    }

    setLocalStorageByName('profile', profile);

    makeGrid();

}

function getAuthHash(data, params) {
    if(isset(data) && isset(data.value) && isset(data.value.auth_token)) {
        setLocalStorageByNameDefault('auth_token', data.value.auth_token);
    }
    console.log(data);
}

function getAuthLogin(data, params) {
    if(isset(data) && isset(data.value)) {
        if(isset(data.value.auth_token)){
            setLocalStorageByNameDefault('auth_token', data.value.auth_token);
        }

        if(isset(data.value.profile)){
//            setLocalStorageByName('profile', data.value.profile);
            saveProfile(data.value.profile);
        }
    }
}

function saveProfile(db) {
    let profile = getLocalStorageByNameDefault('profile');
    if(isset(profile) && isset(db)) {
        profile.type = db.type;
        profile.username = db.username;
        profile.country_id = db.country_id;
        profile.points = db.points;
        profile.status = db.status;
        profile.created_at = db.created_at;
        profile.email = db.email;
        profile.id = db.id;
        setLocalStorageByNameDefault('profile', profile);
    }
}

function getRegistration(email, login, pass)
{
    var data = {
        'email' : email,
        'login' : login,
        'pass' : pass,
    };
    sendRequest('POST', urlApi + '/create-user', data, 'getAuthHash', null);
}

function getLogin() {
    var token = getLocalStorageByNameDefault('auth_token');
    var data = {
        'auth_token' : token,
    };
    sendRequest('POST', urlApi + '/auth', data, 'getAuthLogin', null);
}

function getLoginWithHash(authHash) {
    setLocalStorageByNameDefault('auth_token', authHash);
    var data = {
        'auth_token' : authHash,
    };
    sendRequest('POST', urlApi + '/auth', data, 'getAuthLogin', null);
}