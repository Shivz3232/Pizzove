/*
 *  Primary file for the handlers
 */

//  Dependencies
const _data = require('./data');
const helpers = require('./helpers');
const config = require('./config');

// Container for all the handlers
const handlers = {};

/*
 *  HTML Handlers
 *
 */
//  Index Handler
handlers.index = function (data, callback) {
    // Reject any request that isn't a GET
    if (data.method == 'get') {
        // Prepare data for interpolation
        let templateData = {
            'head.title': 'This is the title',
            'head.description': 'We offer free, simple uptime monitoring for HTTP/HTTPS sites of all kinds. When your site goes down we\'ll send you a text to let you konw.',
            'body.class': 'index'
        }

        // Read in a template as a string
        helpers.getTemplate('index', templateData, function (err, str) {
            if (!err && str) {
                // Add the universal header and footer
                helpers.addUniversalTemplates(str, templateData, function (err, str) {
                    if (!err && str) {
                        // Return that page as HTML
                        callback(200, str, 'html');
                    } else {
                        callback(500, undefined, 'html');
                    }
                });
            } else {
                callback(500, undefined, 'html');
            }
        });
    } else {
        callback(405, undefined, 'html');
    }
};

// Create account handler
handlers.accountCreate = function (data, callback) {
    // Reject any request that isn't a GET
    if (data.method == 'get') {
        // Prepare data for interpolation
        let templateData = {
            'head.title': 'Create An Account',
            'head.description': 'Singup is easy and only takes a few seconds',
            'body.class': 'accountCreate'
        }

        // Read in a template as a string
        helpers.getTemplate('accountCreate', templateData, function (err, str) {
            if (!err && str) {
                // Add the universal header and footer
                helpers.addUniversalTemplates(str, templateData, function (err, str) {
                    if (!err && str) {
                        // Return that page as HTML
                        callback(200, str, 'html');
                    } else {
                        callback(500, undefined, 'html');
                    }
                });
            } else {
                callback(500, undefined, 'html');
            }
        });
    } else {
        callback(405, undefined, 'html');
    }
}

// Account edit handler
handlers.accountEdit = function (data, callback) {
    // Reject any request that isn't a GET
    if (data.method == 'get') {
        // Prepare data for interpolation
        let templateData = {
            'head.title': 'Account Settings',
            'body.class': 'accountEdit'
        }

        // Read in a template as a string
        helpers.getTemplate('accountEdit', templateData, function (err, str) {
            if (!err && str) {
                // Add the universal header and footer
                helpers.addUniversalTemplates(str, templateData, function (err, str) {
                    if (!err && str) {
                        // Return that page as HTML
                        callback(200, str, 'html');
                    } else {
                        callback(500, undefined, 'html');
                    }
                });
            } else {
                callback(500, undefined, 'html');
            }
        });
    } else {
        callback(405, undefined, 'html');
    }
}

// Account deketed handler
handlers.accountDeleted = function (data, callback) {
    // Reject any request that isn't a GET
    if (data.method == 'get') {
        // Prepare data for interpolation
        let templateData = {
            'head.title': 'Account Deleted',
            'head.description': 'Your account has been deleted',
            'body.class': 'accountDeleted'
        }

        // Read in a template as a string
        helpers.getTemplate('accountDeleted', templateData, function (err, str) {
            if (!err && str) {
                // Add the universal header and footer
                helpers.addUniversalTemplates(str, templateData, function (err, str) {
                    if (!err && str) {
                        // Return that page as HTML
                        callback(200, str, 'html');
                    } else {
                        callback(500, undefined, 'html');
                    }
                });
            } else {
                callback(500, undefined, 'html');
            }
        });
    } else {
        callback(405, undefined, 'html');
    }
}

// Account deketed handler
handlers.accountDeleted = function (data, callback) {
    // Reject any request that isn't a GET
    if (data.method == 'get') {
        // Prepare data for interpolation
        let templateData = {
            'head.title': 'Account Deleted',
            'head.description': 'Your account has been deleted',
            'body.class': 'accountDeleted'
        }

        // Read in a template as a string
        helpers.getTemplate('accountDeleted', templateData, function (err, str) {
            if (!err && str) {
                // Add the universal header and footer
                helpers.addUniversalTemplates(str, templateData, function (err, str) {
                    if (!err && str) {
                        // Return that page as HTML
                        callback(200, str, 'html');
                    } else {
                        callback(500, undefined, 'html');
                    }
                });
            } else {
                callback(500, undefined, 'html');
            }
        });
    } else {
        callback(405, undefined, 'html');
    }
}

// Session create handler
handlers.sessionCreate = function (data, callback) {
    // Reject any request that isn't a GET
    if (data.method == 'get') {
        // Prepare data for interpolation
        let templateData = {
            'head.title': 'Login to your Account',
            'head.description': 'Please enter you email and password to access your account',
            'body.class': 'sessionCreate'
        }

        // Read in a template as a string
        helpers.getTemplate('sessionCreate', templateData, function (err, str) {
            if (!err && str) {
                // Add the universal header and footer
                helpers.addUniversalTemplates(str, templateData, function (err, str) {
                    if (!err && str) {
                        // Return that page as HTML
                        callback(200, str, 'html');
                    } else {
                        callback(500, undefined, 'html');
                    }
                });
            } else {
                callback(500, undefined, 'html');
            }
        });
    } else {
        callback(405, undefined, 'html');
    }
}

// Session deleted handler
handlers.sessionDeleted = function (data, callback) {
    // Reject any request that isn't a GET
    if (data.method == 'get') {
        // Prepare data for interpolation
        let templateData = {
            'head.title': 'Logged out',
            'head.description': 'You have been logged out of your account',
            'body.class': 'sessionDeleted'
        }

        // Read in a template as a string
        helpers.getTemplate('sessionDeleted', templateData, function (err, str) {
            if (!err && str) {
                // Add the universal header and footer
                helpers.addUniversalTemplates(str, templateData, function (err, str) {
                    if (!err && str) {
                        // Return that page as HTML
                        callback(200, str, 'html');
                    } else {
                        callback(500, undefined, 'html');
                    }
                });
            } else {
                callback(500, undefined, 'html');
            }
        });
    } else {
        callback(405, undefined, 'html');
    }
}

// Viewmenu handler
handlers.viewMenu = function (data, callback) {
    // Reject any request that isn't a GET
    if (data.method == 'get') {
        // Prepare data for interpolation
        let templateData = {
            'head.title': 'Menu',
            'head.description': 'World\'s favourite menu.',
            'body.class': 'viewMenu'
        }

        // Read in a template as a string
        helpers.getTemplate('viewMenu', templateData, function (err, str) {
            if (!err && str) {
                // Add the universal header and footer
                helpers.addUniversalTemplates(str, templateData, function (err, str) {
                    if (!err && str) {
                        // Return that page as HTML
                        callback(200, str, 'html');
                    } else {
                        callback(500, undefined, 'html');
                    }
                });
            } else {
                callback(500, undefined, 'html');
            }
        });
    } else {
        callback(405, undefined, 'html');
    }
}

// Edit cart handler
handlers.editCart = function (data, callback) {
    // Reject any request that isn't a GET
    if (data.method == 'get') {
        // Prepare data for interpolation
        let templateData = {
            'head.title': 'Menu',
            'head.description': 'Your Cart',
            'body.class': 'editCart'
        }

        // Read in a template as a string
        helpers.getTemplate('editCart', templateData, function (err, str) {
            if (!err && str) {
                // Add the universal header and footer
                helpers.addUniversalTemplates(str, templateData, function (err, str) {
                    if (!err && str) {
                        // Return that page as HTML
                        callback(200, str, 'html');
                    } else {
                        callback(500, undefined, 'html');
                    }
                });
            } else {
                callback(500, undefined, 'html');
            }
        });
    } else {
        callback(405, undefined, 'html');
    }
}

// View orders handler
handlers.viewOrders = function (data, callback) {
    // Reject any request that isn't a GET
    if (data.method == 'get') {
        // Prepare data for interpolation
        let templateData = {
            'head.title': 'Orders',
            'head.description': 'Your Orders',
            'body.class': 'viewOrders'
        }

        // Read in a template as a string
        helpers.getTemplate('viewOrders', templateData, function (err, str) {
            if (!err && str) {
                // Add the universal header and footer
                helpers.addUniversalTemplates(str, templateData, function (err, str) {
                    if (!err && str) {
                        // Return that page as HTML
                        callback(200, str, 'html');
                    } else {
                        callback(500, undefined, 'html');
                    }
                });
            } else {
                callback(500, undefined, 'html');
            }
        });
    } else {
        callback(405, undefined, 'html');
    }
}

// Favicon
handlers.favicon = function (data, callback) {
    // Reject any request that isn't a GET
    if (data.method == 'get') {
        // Read in the favicon's data
        helpers.getStaticAsset('favicon.ico', function(err, data) {
            if (!err && data) {
                // Callback the data
                callback(200, data, 'favicon');
            }
        });
    } else {
        callback(405, undefined, 'html');
    }
}

// Public Assets
handlers.public = function (data, callback) {
    // Reject any request that isn't a GET
    if (data.method == 'get') {
        // Get the filename being requested
        let trimmedAssetName = data.trimmedPath.replace('public/', '').trim();
        if (trimmedAssetName.length > 0) {
            // Read in the asset's data
            helpers.getStaticAsset(trimmedAssetName, function (err, data) {
                if (!err && data) {
                    // Determince the content type (default to plain text)
                    let contentType = 'plain';

                    if (trimmedAssetName.indexOf('.css') > -1) {
                        contentType = 'css';
                    }
                    if (trimmedAssetName.indexOf('.png') > -1) {
                        contentType = 'png';
                    }
                    if (trimmedAssetName.indexOf('.jpg') > -1) {
                        contentType = 'jpg';
                    }
                    if (trimmedAssetName.indexOf('.ico') > -1) {
                        contentType = 'favicon';
                    }

                    // Callback the data
                    callback(200, data, contentType);
                } else {
                    callback(404);
                }
            })
        } else {
            callback(404);
        }
    } else {
        callback(405, undefined, 'html');
    }
}

/*
 *  JSON API Handlers
 *
 */

// Ping handler
handlers.ping = function (data, callback) {
    callback(200);
};

// Not found handler
handlers.notFound = function (data, callback) {
    callback(404);
}

// Users handler
handlers.users = function(data, callback) {
    const acceptableMethods = ['get', 'post', 'delete', 'put'];
    if (acceptableMethods.indexOf(data.method) > -1) {
        handlers._users[data.method](data, callback);
    } else {
        callback(405);
    }
}

// Container for all the user submethods
handlers._users = {};

// Post handler for the users
// Required data: name, email, address, password
// Optional data: none
handlers._users.post = function(data, callback) {
    // Vaildate the incoming data
    const name = typeof (data.payload.name) == 'string' && data.payload.name.trim().length > 0 ? data.payload.name.trim() : false;
    const email = typeof (data.payload.email) == 'string' && /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.payload.email.trim()) ? data.payload.email.trim() : false;
    const address = typeof (data.payload.address) == 'string' ? data.payload.address.trim() : false;
    const password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 8 ? data.payload.password : false;
    const tosAgreement = typeof (data.payload.tosAgreement) == 'boolean' && data.payload.tosAgreement == true ? true : false;
    if (name && email && address && password && tosAgreement) {
        // Make sure the user doesn't exist already
        _data.read('users', email, function(err, userData) {
            if (err) {
                // hash the password
                const hashedPassword = helpers.hash(password);
                if (hashedPassword) {
                    const userObject = {
                        'name': name,
                        'email': email,
                        'hashedPassword': hashedPassword,
                        'address': address,
                        'tosAgreement': tosAgreement
                    }

                    // Store the user object
                    _data.create('users', email, userObject, function(err) {
                        if (!err) {
                            callback(200);
                        } else {
                            callback(500, {'Error': 'Error storing the user data'});
                        }
                    })
                } else {
                    callback(500, {'Error': 'Could not hash the user\'s password'});
                }
            } else {
                callback(400, {'Error': 'User with given email already exists'});
            }
        })
    } else {
        callback(400, {'Error': 'Missing or unformated data'});
    }
}

// Get handler for the Users
// Required Data: email
// Optional Data: none
handlers._users.get = function(data, callback) {
    // Validate the incoming data
    const email = typeof (data.queryStringObject.email) == 'string' && /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.queryStringObject.email) ? data.queryStringObject.email.trim() : false;
    if (email) {
        // Get the token from the header
        const token = typeof(data.headers.token) == 'string' && data.headers.token.trim().length == 20 ? data.headers.token.trim() : false;

        // Check if the token belongs to user
        handlers._tokens.verifyToken(token, email, function(tokenIsValid) {
            if (tokenIsValid) {
                // Lookup the user
                _data.read('users', email, function (err, userData) {
                    if (!err && userData) {
                        // Remove the hashed password before returning it to the requester
                        delete userData['hashedPassword'];
                        callback(200, userData);
                    } else {
                        callback(400, {
                            'Error': 'User not found'
                        });
                    }
                });
            } else {
                callback(400, {'Error': 'Missing or invalid token'});
            }
        });
    } else {
        callback(400, {'Error': 'invalid input'});
    }
};

// PUT handler for the users mehtod
// Required data: email
// Optional data: atleast one of name, address or password
handlers._users.put = function(data, callback) {
    // Validate the required data
    const email = typeof (data.payload.email) == 'string' && /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.payload.email.trim()) ? data.payload.email.trim() : false;

    // Validate the incoming optional data
    const name = typeof (data.payload.name) == 'string' && data.payload.name.trim().length > 0 ? data.payload.name.trim() : false;
    const address = typeof (data.payload.address) == 'string' ? data.payload.address.trim() : false;
    const password = typeof (data.payload.password) == 'string' ? data.payload.password.trim() : false;
    if (email && (name || address || password)) {
        // Get the token from the headers
        const token = typeof (data.headers.token) == 'string' && data.headers.token.trim().length == 20 ? data.headers.token.trim() : false;
        if  (token) {
            // Check if the token belongs to the user
            handlers._tokens.verifyToken(token, email, function(tokenIsValid) {
                _data.read('users', email, function (err, userData) {
                    if (!err && userData) {
                        if (name) {
                            userData.name = name;
                        }
                        if (address) {
                            userData.address = address;
                        }
                        if (password) {
                            const hashedPassword = helpers.hash(password);
                            if (hashedPassword) {
                                userData.hashedPassword = hashedPassword;
                            } else {
                                callback(500, {'Error': "Could not hash users\'s password"});
                            }
                        }
                        // Store the new updates
                        _data.update('users', email, userData, function (err) {
                            if (!err) {
                                callback(200);
                            } else {
                                callback(500, {
                                    'Error': 'Failed to update the user data'
                                });
                            }
                        });
                    } else {
                        callback(400, {
                            'Error': 'Counldn\'t find the user to update'
                        });
                    }
                });
            });
        } else {
            callback(400, {'Error': 'Missing or invalid token'});
        }
    } else {
        callback(400, {'Error': 'Missing data or data not in required format'});
    }
};

// DELETE handler for the users
// Required data: email
// Optional data: none
handlers._users.delete = function(data, callback) {
    // Validate the incoming data
    const email = typeof (data.payload.email) == 'string' && /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.payload.email.trim()) ? data.payload.email.trim() : false;
    if (email) {
        // Get the token from the headers
        const token = typeof (data.headers.token) == 'string' && data.headers.token.trim().length == 20 ? data.headers.token.trim() : false;
        if (token) {
            // Check if the token belongs to the user
            handlers._tokens.verifyToken(token, email, function (tokenIsValid) {
                // Delete the user document
                _data.delete('users', email, function (err) {
                    if (!err) {
                        callback(200);
                    } else {
                        callback(500, {
                            'Error': 'Failed to delete user data'
                        });
                    }
                })
            })
        } else {
            callback(400, {'Error': 'Missing or invalid token'});
        }
    } else {
        callback(400, {'Error': 'Missing required field'});
    }
};

// Tokens
handlers.tokens = function(data, callback) {
    const acceptableMethods = ['get', 'post', 'put', 'delete'];
    if (acceptableMethods.indexOf(data.method) > -1) {
        handlers._tokens[data.method](data, callback);
    } else {
        callback(401)
    }
};

// Token methods container
handlers._tokens= {};

// GET token handler
// Required data: token id
// Optional data: none
handlers._tokens.get = function(data, callback) {
    // Validate the required data
    const token = typeof (data.queryStringObject.token) == 'string' && data.queryStringObject.token.trim().length == 20 ? data.queryStringObject.token.trim() : false;
    if (token) {
        _data.read('tokens', token, function(err, data) {
            if (!err && data) {
                callback(200, data);
            } else {
                callback(500, {'Error': 'Couldn\'t find token'});
            }
        })
    } else {
        callback(400, {'Error': 'Missing required fields'});
    }
}

// POST token handler
// Required data: email, password
// Optional data: none
handlers._tokens.post = function (data, callback) {
    // Validate the required data
    const email = typeof (data.payload.email) == 'string' && data.payload.email.trim().length > 0 ? data.payload.email.trim() : false;
    const password = typeof (data.payload.password) == 'string' && data.payload.password.length > 0 ? data.payload.password : false;
    if (email && password) {
        _data.read('users', email, function(err, userData) {
            if (!err && userData) {
                // Hash the received password and compare it with the stored password
                // Hash the password
                const hashedPassword = helpers.hash(password);
                if (hashedPassword == userData.hashedPassword) {
                    // Create a new token with a random name. Set expiration date to 1 hour in the future
                    const tokenID = helpers.createRandomString(20);
                    if (tokenID) {
                        const expires = Date.now() + 3600000;
                        const tokenObject = {
                            'tokenID': tokenID,
                            'expires': expires,
                            'email': email
                        }
                        // Store the token
                        _data.create('tokens', tokenID, tokenObject, function (err) {
                            if (!err) {
                                callback(200, tokenObject);
                            } else {
                                callback(400, {
                                    'Error': 'Unalbe to store the token'
                                });
                            }
                        });
                    } else {
                        callback(500, {'Error': 'Couldn\'t create a token'});
                    }
                } else {
                    callback(400, {'Error': 'Invalid credentials'});
                }
            } else {
                callback(400, {'Error': 'Unable to read user data'});
            }
        })
    } else {
        callback(400, {
            'Error': 'Invalid credentials'
        });
    }
}

// PUT token handler
// Required data: token id, extend
// Optional data: none
handlers._tokens.put = function (data, callback) {
    // Validate required data
    const token = typeof (data.payload.token) == 'string' && data.payload.token.trim().length == 20 ? data.payload.token.trim() : false;
    const extend = typeof(data.payload.extend) == 'boolean' ? data.payload.extend : false;
    if (token && extend) {
        // Lookup the token
        _data.read('tokens', token, function(err, tokenData) {
            if (!err && tokenData) {
                // Make sure that the token isn't already expired
                if(tokenData.expires > Date.now()) {
                    // Set the expiration date an hour from now
                    tokenData.expires = Date.now() + 3600000;

                    // Store the updated token
                    _data.update('tokens', token, tokenData, function(err) {
                        if (!err) {
                            callback(200);
                        } else {
                            callback(500, {'Error': 'Could not update the token'});
                        }
                    })
                } else {
                    callback(400, {'Error': 'Token already expired'});
                }
            } else {
                callback(400, {'Error': 'Could not find the token'});
            }
        })
    } else {
        callback(400, {'Error': 'Missing or improperly formated fields'});
    }
}

// DELETE token handler
// Required data: id
// Optional data:
handlers._tokens.delete = function (data, callback) {
    // Check if the token id is valid
    const token = typeof(data.queryStringObject.token) == 'string' ? data.queryStringObject.token.trim() : false;
    if (token) {
        _data.read('tokens', token, function (err, tokenData) {
            if (!err && tokenData) {
                _data.delete('tokens', token, function (err) {
                    if (!err) {
                        callback(200);
                    } else {
                        callback(500, {
                            'Error': 'Could not delete the specified token'
                        });
                    }
                });
            } else {
                callback(400, {
                    'Error': 'Could not find the specified token'
                });
            }
        });
    } else {
        callback(400, {'Error': 'Missing or improperly formated fields'});
    }
}

// Verify if the given token is valid for the given user
handlers._tokens.verifyToken = function(token, email, callback) {
    // Lookup the token
    _data.read('tokens', token, function(err, tokenData) {
        if (!err && tokenData) {
            // Check if the token belongs to the user and is not expired
            if (tokenData.email == email && tokenData.expires > Date.now()) {
                callback(true);
            } else {
                callback(false);
            }
        } else {
            callback(false);
        }
    });
}

// Menu handler
handlers.menu = function(data, callback) {
    const permittedMethods = ['get'];
    if (permittedMethods.indexOf(data.method) > -1) {
        handlers._menu[data.method](data, callback);
    } else {
        callback(405);
    }
};

// Handler for menu submethods
handlers._menu = {};

// GET MENU handler
// Required data: token id,
// Optional data: none
handlers._menu.get = function(data, callback) {
    // Validate the required data
    const token = typeof(data.headers.token) == 'string' && data.headers.token.trim().length == 20 ? data.headers.token.trim() : false;
    if (token) {
        // check if the token exists and is not expired
        _data.read('tokens', token, function(err, tokenData) {
            if (!err && tokenData && tokenData.expires > Date.now()) {
                _data.read('menu', 'menu', function (err, menu) {
                    if (!err && menu) {
                        // Note: the format in which im storing the menu is very basic. This can be customised accoringly.
                        callback(200, menu);
                    } else {
                        callback(500, {
                            'Error': 'Failed to fetch menu'
                        });
                    }
                });
            } else {
                callback(400, {'Error': 'Missing or invalid token'});
            }
        });
    } else {
        callback(400, {'Error': 'Missing or invalid token'});
    }
};

// Cart container
handlers.cart = function(data, callback) {
    const allowedMethods = ['get', 'post', 'put', 'delete'];
    if (allowedMethods.indexOf(data.method) > -1) {
        handlers._cart[data.method](data, callback);
    } else {
        callback(405);
    }
};

// Container for cart submethods
handlers._cart = {};

// POST Cart handler
// Required data: token id
// Optional data: one or more item ids from the menu
handlers._cart.post = function(data, callback) {
    // Validate require data
    const token = typeof(data.headers.token) == 'string' && data.headers.token.trim().length == 20 ? data.headers.token.trim() : false;

    // Validate optional data
    const items = typeof(data.payload.cart) == 'object' && data.payload.cart instanceof Array && data.payload.cart.length > 0 ? data.payload.cart : false;
    if (token && items) {
        // check if the token exists and is not expired
        _data.read('tokens', token, function (err, tokenData) {
            if (!err && tokenData && tokenData.expires > Date.now()) {
                // Check if all the items exist in the menu
                _data.read('menu', 'menu', function(err, menu) {
                    let i = 0;
                    items.forEach(function(itemID) {
                        for (const category in menu) {
                            menu[category].forEach(function(obj) {
                                if (obj.id == Number(itemID)) {
                                    i++;
                                }
                            })
                        }
                    });
                    if (i == items.length) {
                        const cart = {
                            'email': tokenData.email,
                            'items': items
                        }
                        _data.create('carts', tokenData.email, cart, function(err) {
                            if (!err) {
                                callback(200, cart);
                            } else {
                                callback(500, {'Error': 'Failed to create cart. If you want to update the existing cart please use PUT else DELETE the cart and POST a new one'});
                            }
                        })
                    } else {
                        callback(400, {'Error': 'Invalid items in cart'});
                    }
                })
            } else {
                callback(400, {'Error': 'Token invalid or expired'});
            }
        });
    } else {
        callback(400, {'Error': 'Missing or invalid token id or cart is empty'});
    }
};

// GET Cart handler
// Required data: token id
// Optional data: none
handlers._cart.get = function(data, callback) {
    // Validate the required data
    const token = typeof(data.headers.token) == 'string' && data.headers.token.trim().length == 20 ? data.headers.token.trim() : false;
    if (token) {
         // check if the token exists and is not expired
        _data.read('tokens', token, function (err, tokenData) {
            if (!err && tokenData && tokenData.expires > Date.now()) {
                _data.read('carts', tokenData.email, function(err, cartData) {
                    if (!err && cartData){
                        callback(200, cartData);
                    } else {
                        callback(204, {'Erro': 'Failed to read cart. It may not exist'});
                    }
                })
            } else {
                callback(400, {'Error': 'Token is invalid or expired'});
            }
        })
    } else {
        callback(400, {'Error': 'Missing or Invalid token'});
    }
}

// PUT cart handler
// Required data: token id
// optional data: one or more item ids
handlers._cart.put = function(data, callback) {
    // validate the required data
    const token = typeof(data.headers.token) == 'string' && data.headers.token.trim().length == 20 ? data.headers.token.trim() : false;

    // Validate optional data
    const items = typeof (data.payload.cart) == 'object' && data.payload.cart instanceof Array && data.payload.cart.length > 0 ? data.payload.cart : false;
    if (token) {
         // check if the token exists and is not expired
        _data.read('tokens', token, function (err, tokenData) {
            if (!err && tokenData && tokenData.expires > Date.now()) {
                // If cart is empty delete the cart else update it with new items
                if (items.length) {
                    // Check if all the items exist in the menu
                    _data.read('menu', 'menu', function (err, menu) {
                        let i = 0;
                        items.forEach(function (itemID) {
                            for (const category in menu) {
                                menu[category].forEach(function (obj) {
                                    if (obj.id == Number(itemID)) {
                                        i++;
                                    }
                                })
                            }
                        });
                        if (i == items.length) {
                            const cart = {
                                'email': tokenData.email,
                                'items': items
                            }
                            _data.update('carts', tokenData.email, cart, function (err) {
                                if (!err) {
                                    callback(200, cart);
                                } else {
                                    callback(500, {
                                        'Error': 'Failed to update cart'
                                    });
                                }
                            })
                        } else {
                            callback(400, {
                                'Error': 'Invalid items in cart'
                            });
                        }
                    });
                } else {
                    _data.read('carts', tokenData.email, function(err, cart) {
                        if (!err) {
                            _data.delete('carts', tokenData.email, function (err) {
                                if (!err) {
                                    callback(200);
                                } else {
                                    callback(500, {
                                        'Error': "Failed to update cart"
                                    });
                                }
                            });
                        } else {
                            callback(500);
                        }
                    });
                }
            } else {
                callback(400, {'Error': 'Unable to read token data. Token may be expired'});
            }
        })
    } else {
        callback(400, {'Error': 'Invalid token or Empty cart'});
    }
}

// Delete cart handler
// Required data: token id
// Optional data: none
handlers._cart.delete = function(data, callback) {
    // validate the required data
    const token = typeof (data.headers.token) == 'string' && data.headers.token.trim().length == 20 ? data.headers.token.trim() : false;
    if (token) {
         // check if the token exists and is not expired
        _data.read('tokens', token, function (err, tokenData) {
            if (!err && tokenData && tokenData.expires > Date.now()) {
                _data.read('carts', tokenData.email, function (err, cart) {
                    if (!err) {
                        _data.delete('carts', tokenData.email, function (err) {
                            if (!err) {
                                callback(200);
                            } else {
                                callback(500, {
                                    'Error': "Failed to update cart"
                                });
                            }
                        });
                    } else {
                        callback(200);
                    }
                });
            }
        });
    } else {
        callback(400, {'Error': 'Missing or invalid token'});
    }
}

// Orders hadler
handlers.orders = function(data, callback) {
    const allowedMethods = ['get', 'post'];
    if (allowedMethods.indexOf(data.method) > -1) {
        handlers._orders[data.method](data, callback);
    } else {
        callback(405)
    }
};

// Container for order submethods
handlers._orders = {};

// POST order
// Required data: token id, payment method (card type)
// Optional data: none 
handlers._orders.post = function(data, callback) {
    // validate the required data
    const token = typeof (data.headers.token) == 'string' && data.headers.token.trim().length == 20 ? data.headers.token.trim() : false;
    const paymentMethod = typeof(data.payload.paymentMethod) == 'string' && config.paymentMethods.indexOf(data.payload.paymentMethod.trim()) >= 0 ? data.payload.paymentMethod : false;
    if (token && paymentMethod) {
         // check if the token exists and is not expired
        _data.read('tokens', token, function (err, tokenData) {
            if (!err && tokenData && tokenData.expires > Date.now()) {
                // Get the user cart
                _data.read('carts', tokenData.email, function(err, cart) {
                    if (!err) {
                        _data.read('menu', 'menu', function (err, menu) {
                            if (!err) {
                                // Get the current date
                                const now = new Date()
                                
                                // Create the orders object
                                let order = {
                                    "email": tokenData.email,
                                    "items": cart.items,
                                    "paymentMethod": paymentMethod,
                                    "date": now,
                                    "total": helpers.getTotal(cart.items, menu)
                                };

                                helpers.payWithStripe(order.total, function (err) {
                                    if (!err) {
                                        _data.create('orders', tokenData.email + '_' + now.getTime(), order, function (err) {
                                            if (!err) {
                                                // Clear the cart if the order was successfull
                                                _data.delete('carts', tokenData.email, function(err) {
                                                    if (!err) {
                                                        // Send reciept mail regardless
                                                        helpers.sendWithMailgun(tokenData.email, now.getTime(), order, menu, function (err) {
                                                            if (!err) {
                                                                callback(200);
                                                            } else {
                                                                callback(500,  {'Error': "Order places successfully but falied to send order receipt to the customer"});
                                                            }
                                                        });
                                                    } else {
                                                        callback(500, {'Error': 'Order placed successfully but failed to empty cart'});
                                                    }
                                                })
                                            } else {
                                                callback(500, {
                                                    'Error': "Failed to process order"
                                                });
                                            }
                                        })
                                    } else {
                                        callback(err, {
                                            'Error': "Failed to connect to payment gateway"
                                        });
                                    }
                                });
                            } else {
                                callback(500, {
                                    'Error': "Falied to bill"
                                });
                            }
                        });
                    } else {
                        callback(400, {'Error': "Cart empty"})
                    }
                });
            } else {
                callback(400, {'Error': 'Token not found or expired'});
            }
        });
    } else {
        callback(400, {'Error': 'Invalid token or Card Details'});
    }
}

// Get orders
// Required data: token id
// Optional data: none
handlers._orders.get = function(data, callback) {
    // validate the required data
    const token = typeof (data.headers.token) == 'string' && data.headers.token.trim().length == 20 ? data.headers.token.trim() : false;
    if (token) {
         // check if the token exists and is not expired
        _data.read('tokens', token, function (err, tokenData) {
            if (!err && tokenData && tokenData.expires > Date.now()) {
                // Read all orders by this users and add it to the orders array
                let orders = [];
                _data.list('orders', async function(err, data) {
                    if (!err && data) {
                        data.forEach(function(order){
                            if (order.indexOf(tokenData.email) == 0) {
                                // Read each order detail synchronously
                                _data.readSync('orders', order, function(err, orderData) {
                                    if (!err && orderData) {
                                        // Exclude the email from order details before adding to the orders array
                                        delete orderData['email']
                                        orders.push(orderData)
                                    } else {
                                        callback(500, {'Error': 'Unable to read order with Id: ' + order.split('_')[1]})
                                    }
                                });
                            }
                        });
                        // Wrap the orders into a payload
                        const payload = {
                            "orders": orders
                        }

                        // Send the payload
                        callback(200, payload);
                    } else {
                        callback(204);
                    }
                })
            }
        });
    } else {
        callback(400, {'Error': 'Missing or invalid token'});
    }
}

// Export the handlers
module.exports = handlers;