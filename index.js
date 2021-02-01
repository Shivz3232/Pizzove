/*
 *  Primary file for the API
 */

// Dependencies
const server = require('./lib/server');
const CLI = require('./lib/cli');

// Declare the app
const app = {};

// Initiate the app
app.init = function() {
    // Start the http server
    server.init();

    // Start the CLI after a short period
    setTimeout(function() {
        CLI.init();        
    }, 50);
}

// Start the app
app.init();

// Export the app
module.exports = app