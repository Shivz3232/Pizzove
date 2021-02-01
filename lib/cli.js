/*
 *  Primary file for server CLI
 *
 */

//  Dependencies
const _data = require('./data');
const readLine = require('readline');
const fs = require('fs');
const events = require('events');
class _events extends events{};
const e = new _events();
const os = require('os');
const v8 = require('v8');

// Instantiate the CLI module object
const CLI = {};

/*
 *  Input hanlders
 *
 */

//  Manual(man) handler
e.on('man', function(str) {
    CLI.responders.help();
});

// Help handler
e.on('help', function(str) {
    CLI.responders.help();
});

// Stats handler
e.on('stats', function(str) {
    CLI.responders.stats();
});

// List items handler
e.on('list items', function(str) {
    CLI.responders.listItems();
});

// List users handler
e.on('list users', function(str) {
    CLI.responders.listUsers();
});

// More user info handler
e.on('more user info', function(str) {
    CLI.responders.moreUserInfo(str);
})

// List recent orders handler
e.on('list orders', function(str) {
    CLI.responders.listOrders();
});

// More order info handler
e.on('more order info', function(str) {
    CLI.responders.moreOrderInfo(str);
});

// View recently registerd user handler
e.on('users', function(str) {
    CLI.responders.users(str);
});

// Exit handler
e.on('exit', function(str) {
    CLI.responders.exit();
});

/*
 *  Responders
 *
 */

//  Container for responders
CLI.responders = {}

// Create a vertical space
CLI.verticalSpace = function(lines) {
    lines = typeof (lines) == 'number' && lines > 0 ? lines : 1;
    for (let i = 0; i < lines; i++) {
        console.log('');
    }
}

// Create a horizontal line acreoss the screen
CLI.horizontalLine = function() {
    // Get the available screen size
    const width = process.stdout.columns;

    let line = '';
    for (let i = 0; i < width; i++) {
        line += '-';
    }
    console.log(line);
}

// Create centered text on the screen
CLI.centered = function(str) {
    str = typeof (str) == 'string' && str.length > 0 ? str.trim() : '';

    // Get the available screen size
    const width = process.stdout.columns;

    // Calculate the left padding there should be
    const leftPadding = Math.floor((width - str.length) / 2);

    // Put i nleft padded spaces before the string itself
    let line = '';
    for (let i = 0; i < leftPadding; i++) {
        line += ' ';
    }
    line += str;
    console.log(line);
}

// Responder for man / help
CLI.responders.help = function() {
    const commands = {
        'exit': 'Kill the CLI (and the rest of the application).',
        'man': 'Show this help page.',
        'help': 'Alias for "man" command.',
        'stats': 'Get statistics on the underlying operating system and resources utilisation.',
        'list items': 'Show a list of items in the menu',
        'list users': 'Show a list of recently(past 24 hours) registered users.',
        'more user info --(email)': 'Show details of a specific user',
        'list orders': 'Show a list of recently(past 24 hours) placed orders',
        'more order info --(orderId)': 'Show details of a specific order'
    }

    // Render the header
    CLI.horizontalLine();
    CLI.centered('CLI MANUAL');
    CLI.horizontalLine();
    CLI.verticalSpace();

    // Show each command, followed by its explanation, in white and yellow respectively
    for (const key in commands) {
        if(commands.hasOwnProperty(key)) {
            const value = commands[key];
            let line = '\x1b[33m' + key + '\x1b[0m';
            const padding = 60 - line.length;
            for (let i = 0; i < padding; i++) {
                line += ' ';
            }
            line += value;
            console.log(line);
            CLI.verticalSpace();
        }
    }

    // Render the footer
    CLI.verticalSpace();
    CLI.horizontalLine();
}

// Stats
CLI.responders.stats = function() {
    // Compile an object of stats
    const stats = {
        'Load Average': os.loadavg().join(' '),
        'CPU Count': os.cpus().length,
        'Free Memory': os.freemem(),
        'Current Malloced Memory': v8.getHeapStatistics().malloced_memory,
        'Peak Malloced Memory': v8.getHeapStatistics().peak_malloced_memory,
        'Allocated Heap Used (%)': Math.round((v8.getHeapStatistics().used_heap_size / v8.getHeapStatistics().total_heap_size) * 100),
        'Available Heap Allocated (%)': Math.round((v8.getHeapStatistics().total_heap_size / v8.getHeapStatistics().heap_size_limit) * 100),
        'Uptime': os.uptime() + ' Seconds'
    }

    // Create a header for the stats
    CLI.horizontalLine();
    CLI.centered('CLI STATISTICS');
    CLI.horizontalLine();
    CLI.verticalSpace(2);

    // Show each command, followed by its explanation, in white and yellow respectively
    for (const key in stats) {
        if (stats.hasOwnProperty(key)) {
            const value = stats[key];
            let line = '\x1b[33m' + key + '\x1b[0m'
            const padding = 60 - line.length;
            for (let i = 0; i < padding; i++) {
                line += ' ';
            }
            line += value;
            console.log(line);
            CLI.verticalSpace();
        }
    }

    // End with the footer
    CLI.verticalSpace();
    CLI.horizontalLine();
}

// Responder for exit
CLI.responders.exit = function() {
    process.exit(0);
}

// Responder for list items
CLI.responders.listItems = function() {
    _data.read('menu', 'menu', function(err, menu) {
        if (!err && menu) {
            CLI.verticalSpace();
            for (const type in menu) {
                if (menu.hasOwnProperty(type)) {
                    menu[type].forEach(item => {
                        let line = 'Id: '+ item['id'] + ', type: ' + type + ',';
                        
                        let padding = 7 - type.length;
                        for (let i = 0; i < padding; i++) {
                            line += ' ';
                        }
                        
                        line += ' Name: ' + item['Item'] + ',';

                        padding = 20 - item['Item'].length;
                        for (let i = 0; i < padding; i++) {
                            line += ' ';
                        }

                        line += ' Price: ' + item['price'];

                        console.log(line);
                    });
                }
            }
            CLI.verticalSpace();
        }
    });
}

// Responder for list users
CLI.responders.listUsers = function() {
    _data.list('users', function(err, userEmails) {
        if (!err && userEmails instanceof Array && userEmails.length > 0) {
            CLI.verticalSpace();
            userEmails.forEach(function(userEmail) {
                const oneDayInMs = 24 * 60 * 60 * 1000;
                _data.creationMs('users', userEmail, function(err, creationMs) {
                    if (!err && creationMs > (Date.now() - oneDayInMs)) {
                        console.log(userEmail);
                    }
                });
            });
            CLI.verticalSpace();
        }
    });
}

// Responder for more user info
CLI.responders.moreUserInfo = function(str) {
    const userEmail = str.split('--').length > 1 && str.split('--')[1].length > 0 ? str.split('--')[1] : false;
    if (userEmail) {
        _data.read('users', userEmail, function(err, userData) {
            if (!err && userData) {
                // Remove the hashed password
                delete userData['hashedPassword'];

                // Print the JSON with text highlighting
                CLI.verticalSpace();
                console.dir(userData, {
                    'color': true
                });
                CLI.verticalSpace();
            }
        })
    }
}

// Responder for list orders
CLI.responders.listOrders = function() {
    _data.list('orders', function(err, orders) {
        if (!err && orders instanceof Array && orders.length > 0) {
            CLI.verticalSpace();
            orders.forEach(function(order) {
                const oneDayInMs = 24 * 60 * 60 * 1000;
                _data.creationMs('orders', order, function(err, creationMs) {
                    if (!err && creationMs > (Date.now() - oneDayInMs)) {
                        console.log(order);
                    }
                });
            });
            CLI.verticalSpace();
        }
    });
}

// Responder for more order info
CLI.responders.moreOrderInfo = function(str) {
    const orderId = str.split('--').length > 0 && str.split('--')[1].length > 0 ? str.split('--')[1] : false;
    if (orderId) {
        _data.read('orders', orderId, function(err, orderData) {
            if (!err && orderData) {
                // Print the JSON with text highlighting
                CLI.verticalSpace();
                console.dir(orderData, {
                    'color': true
                });
            }
        });
    }
}

// Input processor
CLI.processInput = function (str) {
    // Sanitize the input string
    str = typeof (str) == 'string' && str.trim().length > 0 ? str.trim() : false;
    if (str) {
        // Codify the unique strings that identify the unique questoins allowed to be asked
        const uniqueInputs = [
            'man',
            'help',
            'exit',
            'stats',
            'list items',
            'list users',
            'more user info',
            'list orders',
            'more order info',
            'view menu'
        ];

        // Go through the possible inpus, emit an event when a match is found
        let matchFound = false;
        uniqueInputs.some(function(uniqueInput) {
            if (str.toLowerCase().indexOf(uniqueInput) > -1) {
                // Set match found to true
                matchFound = true;

                // Emit an event matching the uniqu input, and inclue the full string given
                e.emit(uniqueInput, str);
                return true;
            }
        });

        // If no match found, tell the user to try again
        if (!matchFound) {
            console.log("\x1b[31mSorry, try again.\x1b[0m");
        }
    }
}

// Init script
CLI.init = function () {
    // Send the start message to the console
    console.log("\x1b[34m%s\x1b[0m", "The CLI is running");

    // Start the interface
    const _interface = readLine.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: '>'
    });

    // Create an initial prompt
    _interface.prompt();

    // Handle each line of input seperately
    _interface.on('line', function(str) {
        // Send to the input processor
        CLI.processInput(str);

        // Re initiallize the prompt
        _interface.prompt();
    });

    // If the user stopped the CLI, kill the associated process
    _interface.on('close', function() {
        process.exit(0);
    });
}

// Export the CLI module
module.exports = CLI;