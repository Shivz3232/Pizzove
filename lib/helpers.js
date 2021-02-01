/*
 *   Helpers for various tasks
 */

// Dependencies
const crypto = require('crypto');
const config = require('./config');
const queryString = require('querystring');
const https = require('https');
const path = require('path');
const fs = require('fs');
const _data = require('./data');

// Container for all the helpers
const helpers = {};

// Create a SHA256 hash
helpers.hash = function (str) {
    if (typeof (str) == 'string' && str.length > 0) {
        const hash = crypto.createHmac('sha256', config.hashingSecret).update(str).digest('hex');
        return hash;
    } else {
        return false;
    }
};

// Parse a JSON string to an object in all cases, without throwing
helpers.parseJSONToObject = function (str) {
    try {
        const obj = JSON.parse(str);
        return obj;
    } catch (err) {
        return err;
    }
};

// Create a string of random alpha numeric values of a given length
helpers.createRandomString = function (strLength) {
    strLength = typeof (strLength) == 'number' && strLength > 0 ? strLength : false;
    if (strLength) {
        // Define all the characters that could go into the string
        const possibleCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';

        // Start the final string
        let str = '';
        for (let i = 0; i < strLength; i++) {
            // Get a random character from the possibleCharacter string
            const randomCharacter = possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));

            // Append this random character to the final string
            str += randomCharacter;
        }

        // Return the final string
        return str;
    } else {
        return false;
    }
};

// Calculate the bill for the items in the cart
helpers.getTotal = function(items, menu) {
    let amount = 0;
    items.forEach(function (itemID) {
        for (const category in menu) {
            menu[category].forEach(function (obj) {
                if (obj.id == itemID) {
                    amount = amount + obj.price;
                }
            })
        }
    });

    return amount;
}

// Checkout with stripe
helpers.payWithStripe = function(amount, callback) {
    // Validate parameters
    amount = typeof(amount) === 'number' && amount > 0 ? amount : false;
    if (amount) {
        // Configure the request payload
        const payload = {
            'amount': amount,
            'currency': 'inr',
            'source': 'tok_visa'
        }

        // Stirgify the payload
        const stringPayload = queryString.stringify(payload);

        // Craft the https request
        const requestDetails = {
            'protocol': 'https:',
            'hostname': 'api.stripe.com',
            'method': 'POST',
            'path': '/v1/charges',
            'auth': config.stripe.secret_key,
            'headers': {
                'Content-type': 'application/x-www-form-urlencoded',
                'Content-length': Buffer.byteLength(stringPayload)
            }
        };

        // Send the request
        const req = https.request(requestDetails, function (res) {
            // Callback successful if the request went through
            if (res.statusCode == 200 || res.statusCode == 201) {
                callback(false);
            } else {
                callback(res.statusCode);
            }
        });

        // Bind the error event so it doesn't ge thrown
        req.on('error', function (err) {
            callback(400);
        });

        // Add the payload
        req.write(stringPayload);

        // End the request
        req.end();
    } else {
        callback(400);
    }
}

// Send order receipt to the use using mailgum
helpers.sendWithMailgun = function(to, orderID, order, menu, callback) {
    // Validate the parameters
    to = typeof (to) === "string" && /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(to) ? to : false;
    order = typeof (order) === 'object' ? order : false
    if (to && order) {
        // items
        let items = []
        order.items.forEach(function (itemID) {
            for (const category in menu) {
                menu[category].forEach(function (obj) {
                    if (obj.id == itemID) {
                        items.push(obj.Item);
                    }
                });
            }
        });
        
        // Craft the msg
        let msg = "Order details:- Items: ";
        items.forEach((item) => {
            msg += item + " "; 
        });
        msg += ". Total: " + order.total + " Rs. Date: " + order.date + " Payment Method: " + order.paymentMethod;
        
        // Configure the payload
        const payload = {
            "from": 'D G Shivu <shivu@' + config.mailgun.address + '>',
            "to": 'dgshivu3232@gmail.com',
            "subject": "Your order with ID: " + orderID + " has been placed successfully!",
            "text": msg
        }

        // Stringify the payload
        const stringPayload = queryString.stringify(payload);

        // Craft the request
        const options = {
            "protocol": "https:",
            "hostname": "api.mailgun.net",
            "path": "/v3/sandbox5e12003a6dd14fdda7f02851eca92de3.mailgun.org/messages",
            "method": "POST",
            "auth": "api:" + config.mailgun.secret_key,
            'headers': {
                'Content-type': 'application/x-www-form-urlencoded',
                'Content-length': Buffer.byteLength(stringPayload)
            }
        }

        // Send the request
        const req = https.request(options, function(res) {
            if (res.statusCode == 200 || res.statusCode == 201) {
                callback(false);
            } else {
                callback(res.statusCode)
            }
        });

        // Bind the error event so it doesn't ge thrown
        req.on('error', function (err) {
            callback(err);
        });

        // Add the payload
        req.write(stringPayload);

        // End the request
        req.end();
    } else {
        callback({"Error": "Invalid Input parameters"});
    }
}

// Add the universal header and footer to the a string, and pass provided data object to the head and footer for interpolation
helpers.addUniversalTemplates = function (str, data, callback) {
    // Validate the input parameters
    str = typeof (str) == 'string' && str.length > 0 ? str : '';
    data = typeof (data) == 'object' && data !== null ? data : {};

    // Get the header
    helpers.getTemplate('_header', data, function(err, headerString) {
        if (!err && headerString) {
            // Get the footer
            helpers.getTemplate('_footer', data, function(err, footerString) {
                if (!err && footerString) {
                    // Add them all together
                    let fullString = headerString + str + footerString;
                    callback(false, fullString);
                } else {
                    callback('Could not find hte footer template');
                }
            })
        } else {
            callback('Could not find the header template');
        }
    })
}

// Take a given string and a data object and find/replace all the keys within it
helpers.interpolate = function (str, data) {
    // Validate the input parameters
    str = typeof (str) == 'string' && str.length > 0 ? str : '';
    data = typeof (data) == 'object' && data !== null ? data : {};

    // Add the template globals to the data object, prepending their key name with "global"
    for (let keyName in config.templateGlobals) {
        if (config.templateGlobals.hasOwnProperty(keyName)) {
            data['global.' + keyName] = config.templateGlobals[keyName];
        }
    }

    // For each key in hte data object, insert its value into the string at the corresponding place holder
    for (let key in data) {
        if (data.hasOwnProperty(key) && typeof (data[key]) == 'string') {
            let replace = data[key];
            let find = '{' + key + '}';
            str = str.replace(find, replace);
        }
    }
    return str;
}

// Get the string content of a template
helpers.getTemplate = function (templateName, data, callback) {
    // Validate the input parameters
    templateName = typeof (templateName) == 'string' && templateName.length > 0 ? templateName : false;
    data = typeof (data) == 'object' && data !== null ? data : {};

    if (templateName && data) {
        const templateDir = path.join(__dirname, '/../templates/');
        fs.readFile(templateDir + templateName + '.html', 'utf-8', function (err, str) {
            if (!err && str && str.length > 0) {
                // Do interpolation on the string
                let finalString = helpers.interpolate(str, data);
                callback(false, finalString);
            } else {
                callback('No template could be found');
            }
        });
    } else {
        callback('A valid template name was not specifed');
    }
}

// Get the contents of a static (public) asset
helpers.getStaticAsset = function (fileName, callback) {
    fileName = typeof (fileName) == 'string' && fileName.length > 0 ? fileName : false;
    if (fileName) {
        let publicDir = path.join(__dirname, '/../public/');
        fs.readFile(publicDir + fileName, function (err, data) {
            if (!err && data) {
                callback(false, data)
            } else {
                callback('No file could be found');
            }
        })
    } else {
        callback('A valid file name was not specified');
    }
}

// Export the helpers module
module.exports = helpers;