var request = require('request');
request('http://www.redditadsfasdfadf.com', function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    if(!error && response.statusCode == 200){/*old version */
        console.log('body:', body);
    }; // Print the HTML for the Google homepage.
});