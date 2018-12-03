var time = require('time');
exports.handler = (event, context, callback) => {
    var currentTime = new time.Date();
    currentTime.setTimezone("America/Los_Angeles");

    let message = 'release 2. The time in Los Angeles is: ' + currentTime.toString()

    var responseBody = {
        message: message,
        input: event
    };

    var response = {
        statusCode: '200',
        headers: {
            'x-custom-header': 'my custom header value..'
        },
        body: JSON.stringify(responseBody)
    };

    console.log('response: ' + JSON.stringify(response));
    callback(null, response);
};
