/*
 *  Server configuration file
 */

// Dependencies

// Container for all the environments
const environments = {};

// Development environment
environments.staging = {
    'httpPort': 3000,
    'hashingSecret': ":e4dgt<G5th]A(^E",
    'paymentMethods': ["pm_card_visa"],
    'stripe': {
        "secret_key": "sk_test_51I4lbwGp4pHcA1c13OPUELyKvcFLIlAlxmdEw3tMK7BS6yUeQyNCu1LzVfB41hUodmnBoTe3xBMWhzn7ZiVlrEEQ00l3Iyrf0i:"
    },
    'mailgun': {
        'secret_key': "f4199ccfbe9821a7cb310a5405f82e71-c50a0e68-72bacb85",
        'address': 'sandbox5e12003a6dd14fdda7f02851eca92de3.mailgun.org'
    },
    'templateGlobals': {
        'appName': 'Pizove',
        'companyName': 'UnrealFoods Inc.',
        'yearCreated': '2021',
        'baseUrl': 'http://localhost:3000/'
    }
}

// Determine which environment is to be served
const currentEnvironment = typeof (process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV : '';

// Chekc if the requested environment is among the ones defined above, else default to staging
const environmentToExport = typeof (environments[currentEnvironment]) !== 'undefined' ? environments[currentEnvironment] : environments.staging;

// Export the module
module.exports = environmentToExport;