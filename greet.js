'use strict';
console.log('Loading greet.js function');

function isNull(theObj) {
    return theObj === null || theObj === undefined;
}

function isEmptyStr(theObj) {
    return theObj === null || theObj === undefined || theObj === '';
}

exports.handler = function (event, context, callback) {
    let name = 'you';
    let city = 'World';
    let time = 'day';
    let day = '';
    let responseCode = 200;
    console.log('request: ' + JSON.stringify(event))

    // event.queryStringParameters, event.headers, event.pathParameters,
    // event.body, event.stageVariables, event.requestContext
    if (!isNull(event.queryStringParameters)
        && !isEmptyStr(event.queryStringParameters.name)) {
        console.log('Received name: ' + event.queryStringParameters.name);
        name = event.queryStringParameters.name;
    }

    if(!isNull(event.pathParameters)
        && !isEmptyStr(event.pathParameters.proxy)) {
        console.log('Received proxy: ' + event.pathParameters.proxy);
        city = event.pathParameters.proxy;
    }

    if ( !isNull(event.headers) && !isEmptyStr(event.headers['day'])) {
        day = event.headers.day;
    }

    if (!isNull(event.body)) {
        let body = JSON.parse(event.body);
        if (body.time) {
            time = body.time;
        }
    }

    let greeting = 'Good ' + time + ', ' + name + ' of ' + city + '. ';

    if (day) greeting += 'Happy ' + day + '!';
    var responseBody = {
        message: greeting,
        input: event
    };

    var response = {
        statusCode: responseCode,
        headers:{
            'x-custom-header': 'my custom header value..'
        },
        body: JSON.stringify(responseBody)
    };

    console.log('response: ' + JSON.stringify(response));
    callback(null, response);
};