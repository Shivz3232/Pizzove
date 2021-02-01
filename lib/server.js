/*
 *  Primary file for the server
 */

//  Dependencies
const http = require('http');
const url = require('url');
const handlers = require('./handlers');
const StringDecoder = require('string_decoder').StringDecoder;
const config = require('./config');
const helpers = require('./helpers');
const util = require('util');

// Container for the server
const server = {};

server.httpServer = http.createServer(function(req, res) {
    // Get the url and parse it
    const parsedURL = url.parse(req.url, true);

    // Get the path
    const path = parsedURL.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');

    // Get the method
    const method = req.method.toLowerCase();

    // Get the query string
    const queryStringObject = parsedURL.query;

    // Get the headers
    const headers = req.headers;

    // Get the payload if there is any
    const decoder = new StringDecoder('utf-8');
    var buffer = "";
    req.on('data', function(data) {
        buffer += decoder.write(data);
    });

    req.on('end', function() {
        buffer += decoder.end();

        // Choose the handler for this request
        let chosenHandler = typeof (server.router[trimmedPath]) !== 'undefined' ? server.router[trimmedPath] : server.router.notFound;

        // If the requets is within the public directory, use the public handler instead
        chosenHandler = trimmedPath.indexOf('public') > -1 ? handlers.public : chosenHandler;
        
        // Construct the data object to send to handler
        const data = {
            'headers': headers,
            'trimmedPath': trimmedPath,
            'method': method,
            'queryStringObject': queryStringObject,
            'payload': helpers.parseJSONToObject(buffer)
        }
        // Route the request to handler specified the router
        chosenHandler(data, function(statusCode, payload, contentType) {
            // Determine the content type of the response (fallback to JSON)
            contentType = typeof (contentType) == 'string' ? contentType : 'json';

            // Use the status code called back by the handler, else default to 200
            statusCode = typeof (statusCode) == 'number' ? statusCode : 200;

            // Return the response-parts that are content specific
            let payloadString = "";

            if (contentType == 'json') {
                // Set the response header
                res.setHeader('Content-Type', 'application/json');

                // Use thepaylaod called bakc by the handler, if not then default to an empty object
                payload = typeof (payload) == 'object' ? payload : {};

                // Convert the paylaod to a sting
                payloadString = JSON.stringify(payload);
            }
            if (contentType == 'html') {
                // Set the reasponse header
                res.setHeader('Content-Type', 'text/html')

                // Use the payload called back by the handler, if not then default to an empty string
                payloadString = typeof (payload) == 'string' ? payload : "";
            }
            if (contentType == 'favicon') {
                // Set content header
                res.setHeader('Content-Type', 'image/x-icon');

                // Use the payload called back by the handler, if not then default to an empty string;
                payloadString = typeof (payload) !== 'undefined' ? payload : '';
            }
            if (contentType == 'css') {
                // Set the response header
                res.setHeader('Content-Type', 'text/css');

                // Use the payload called back by the handler, if not then default to an empty string;
                payloadString = typeof (payload) !== 'undefined' ? payload : '';
            }
            if (contentType == 'png') {
                // Set the response header
                res.setHeader('Content-Type', 'image/png');

                // Use the payload called back by the handler, if not then default to an empty string;
                payloadString = typeof (payload) !== 'undefined' ? payload : '';
            }
            if (contentType == 'jpg') {
                // Set the response header
                res.setHeader('Content-Type', 'image/jpeg');

                // Use the payload called back by the handler, if not then default to an empty string;
                payloadString = typeof (payload) !== 'undefined' ? payload : '';
            }
            if (contentType == 'plain') {
                // Set the response header
                res.setHeader('Content-Type', 'text/plain');

                // Use the payload called back by the handler, if not then default to an empty string;
                payloadString = typeof (payload) !== 'undefined' ? payload : '';
            }
            
            // Return the response parts that are common to all content types
            res.writeHead(statusCode);
            res.end(payloadString);
        });
    });
});

// Define a router
server.router = {
    // Client handlers
    '': handlers.index,
    'account/create': handlers.accountCreate,
    'account/edit': handlers.accountEdit,
    'account/deleted': handlers.accountDeleted,
    'session/create': handlers.sessionCreate,
    'session/deleted': handlers.sessionDeleted,
    'menu/viewMenu': handlers.viewMenu,
    'cart/editCart': handlers.editCart,
    'cart/deleteCart': handlers.deleteCart,
    'cart/placeOrder': handlers.placeOrder,
    'orders/viewOrders': handlers.viewOrders,

    // Api handlers
    'api/users': handlers.users,
    'api/tokens': handlers.tokens,
    'api/menu': handlers.menu,
    'api/cart': handlers.cart,
    'api/orders': handlers.orders,

    // Public handler
    'public': handlers.public,

    // Special handlers
    'ping': handlers.ping,
    'notFound': handlers.notFound,
    'favicon.ico': handlers.favicon
};

// Init server
server.init = function() {
    // Start the http server
    server.httpServer.listen(config.httpPort, function() {
        console.log('\x1b[35m%s\x1b[0m', "HTTP server is listening on port " + config.httpPort);
    })
}

// Export the server
module.exports = server