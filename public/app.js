/*
 * Frontend Logic for application
 *
 */

// Container for frontend application
var app = {};

// Config
app.config = {
  'sessionToken' : false
};

// AJAX Client (for RESTful API)
app.client = {}

// Interface for making API calls
app.client.request = function(headers,path,method,queryStringObject,payload,callback){

  // Set defaults
  headers = typeof(headers) == 'object' && headers !== null ? headers : {};
  path = typeof(path) == 'string' ? path : '/';
  method = typeof(method) == 'string' && ['POST','GET','PUT','DELETE'].indexOf(method.toUpperCase()) > -1 ? method.toUpperCase() : 'GET';
  queryStringObject = typeof(queryStringObject) == 'object' && queryStringObject !== null ? queryStringObject : {};
  payload = typeof(payload) == 'object' && payload !== null ? payload : {};
  callback = typeof(callback) == 'function' ? callback : false;

  // For each query string parameter sent, add it to the path
  var requestUrl = path+'?';
  var counter = 0;
  for(var queryKey in queryStringObject){
     if(queryStringObject.hasOwnProperty(queryKey)){
       counter++;
       // If at least one query string parameter has already been added, preprend new ones with an ampersand
       if(counter > 1){
         requestUrl+='&';
       }
       // Add the key and value
       requestUrl+=queryKey+'='+queryStringObject[queryKey];
     }
  }

  // Form the http request as a JSON type
  var xhr = new XMLHttpRequest();
  xhr.open(method, requestUrl, true);
  xhr.setRequestHeader("Content-type", "application/json");

  // For each header sent, add it to the request
  for(var headerKey in headers){
     if(headers.hasOwnProperty(headerKey)){
       xhr.setRequestHeader(headerKey, headers[headerKey]);
     }
  }

  // If there is a current session token set, add that as a header
  if(app.config.sessionToken){
    xhr.setRequestHeader("token", app.config.sessionToken.tokenID);
  }

  // When the request comes back, handle the response
  xhr.onreadystatechange = function() {
      if(xhr.readyState == XMLHttpRequest.DONE) {
        var statusCode = xhr.status;
        var responseReturned = xhr.responseText;

        // Callback if requested
        if(callback){
          try{
            var parsedResponse = JSON.parse(responseReturned);
            callback(statusCode,parsedResponse);
          } catch(e){
            callback(statusCode,false);
          }

        }
      }
  }

  // Send the payload as JSON
  var payloadString = JSON.stringify(payload);
  xhr.send(payloadString);

};

// Bind the logout button
app.bindLogoutButton = function(){
  document.getElementById("logoutButton").addEventListener("click", function(e){

    // Stop it from redirecting anywhere
    e.preventDefault();

    // Log the user out
    app.logUserOut();

  });
};

// Log the user out then redirect them
app.logUserOut = function(redirectUser){
  // Set redirectUser to default to true
  redirectUser = typeof(redirectUser) == 'boolean' ? redirectUser : true;

  // Get the current token id
  var tokenId = typeof(app.config.sessionToken.tokenID) == 'string' ? app.config.sessionToken.tokenID : false;

  // Send the current token to the tokens endpoint to delete it
  var queryStringObject = {
    'token' : tokenId
  };
  app.client.request(undefined,'api/tokens','DELETE',queryStringObject,undefined,function(statusCode,responsePayload){
    // Set the app.config token as false
    app.setSessionToken(false);

    // Send the user to the logged out page
    if(redirectUser){
      window.location = '/session/deleted';
    }

  });
};

// Bind the forms
app.bindForms = function(){
  if(document.querySelector("form")){

    var allForms = document.querySelectorAll("form");
    for(var i = 0; i < allForms.length; i++){
        allForms[i].addEventListener("submit", function(e){

        // Stop it from submitting
        e.preventDefault();
        var formId = this.id;
        console.log(formId)
        var path = this.action;
        var method = this.method.toUpperCase();

        // Hide the error message (if it's currently shown due to a previous error)
        document.querySelector("#"+formId+" .formError").style.display = 'none';

        // Hide the success message (if it's currently shown due to a previous error)
        if(document.querySelector("#"+formId+" .formSuccess")){
          document.querySelector("#"+formId+" .formSuccess").style.display = 'none';
        }


        // Turn the inputs into a payload
        var payload = {};
        var elements = this.elements;
        for(var i = 0; i < elements.length; i++){
          if(elements[i].type !== 'submit'){
            // Determine class of element and set value accordingly
            var classOfElement = typeof(elements[i].classList.value) == 'string' && elements[i].classList.value.length > 0 ? elements[i].classList.value : '';
            var valueOfElement = elements[i].type == 'checkbox' && classOfElement.indexOf('multiselect') == -1 ? elements[i].checked : classOfElement.indexOf('intval') == -1 ? elements[i].value : parseInt(elements[i].value);
            var elementIsChecked = elements[i].checked;
            // Override the method of the form if the input's name is _method
            var nameOfElement = elements[i].name;
            if(nameOfElement == '_method'){
              method = valueOfElement;
            } else {
              // Create an payload field named "method" if the elements name is actually httpmethod
              if(nameOfElement == 'httpmethod'){
                nameOfElement = 'method';
              }
              // Create an payload field named "id" if the elements name is actually uid
              if(nameOfElement == 'uid'){
                nameOfElement = 'id';
              }
              // If the element has the class "multiselect" add its value(s) as array elements
              if(classOfElement.indexOf('multiselect') > -1){
                if(elementIsChecked){
                  payload[nameOfElement] = typeof(payload[nameOfElement]) == 'object' && payload[nameOfElement] instanceof Array ? payload[nameOfElement] : [];
                  payload[nameOfElement].push(valueOfElement);
                }
              } else {
                payload[nameOfElement] = valueOfElement;
              }

            }
          }
        }


        // If the method is DELETE, the payload should be a queryStringObject instead
        var queryStringObject = method == 'DELETE' ? payload : {};

        // Call the API
        app.client.request(undefined,path,method,queryStringObject,payload,function(statusCode,responsePayload){
          // Display an error on the form if needed
          if(statusCode !== 200){

            // If signup is forbidden
            if(statusCode == 403){
              // log the user out
              app.logUserOut();

            } else {

              // Try to get the error from the api, or set a default error message
              var error = typeof(responsePayload.Error) == 'string' ? responsePayload.Error : 'An error has occured, please try again';

              // Set the formError field with the error text
              document.querySelector("#"+formId+" .formError").innerHTML = error;

              // Show (unhide) the form error field on the form
              document.querySelector("#"+formId+" .formError").style.display = 'block';
            }
          } else {
            // If successful, send to form response processor
            app.formResponseProcessor(formId,payload,responsePayload);
          }

        });
      });
    }
  }
};

// Form response processor
app.formResponseProcessor = function(formId,requestPayload,responsePayload){
  var functionToCall = false;
  // If account creation was successful, try to immediately log the user in
  if(formId == 'accountCreate'){
    // Take the phone and password, and use it to log the user in
    var newPayload = {
      'email' : requestPayload.email,
      'password' : requestPayload.password
    };

    app.client.request(undefined,'api/tokens','POST',undefined,newPayload,function(newStatusCode,newResponsePayload){
      // Display an error on the form if needed
      if(newStatusCode !== 200){

        // Set the formError field with the error text
        document.querySelector("#"+formId+" .formError").innerHTML = 'Sorry, an error has occured. Please try again.';

        // Show (unhide) the form error field on the form
        document.querySelector("#"+formId+" .formError").style.display = 'block';

      } else {
        // If successful, set the token and redirect the user
        app.setSessionToken(newResponsePayload);
        window.location = '/menu/viewMenu';
      }
    });
  }
  // If login was successful, set the token in localstorage and redirect the user
  if(formId == 'sessionCreate'){
    app.setSessionToken(responsePayload);
    window.location = '/menu/viewMenu';
  }

  // If forms saved successfully and they have success messages, show them
  var formsWithSuccessMessages = ['accountEdit1', 'accountEdit2','checksEdit1'];
  if(formsWithSuccessMessages.indexOf(formId) > -1){
    document.querySelector("#"+formId+" .formSuccess").style.display = 'block';
  }

  // If the user just deleted their account, redirect them to the account-delete page
  if(formId == 'accountEdit3'){
    app.logUserOut(false);
    window.location = '/account/deleted';
  }

  // If the user just created a new check successfully, redirect back to the dashboard
  if(formId == 'checksCreate'){
    window.location = '/checks/all';
  }

  // If the user just deleted a check, redirect them to the dashboard
  if(formId == 'checksEdit2'){
    window.location = '/checks/all';
  }

  // If the order was placed successfully redirect to the orders page
  if (formId == 'placeOrderForm'){
    document.querySelector("#"+formId+" .formSuccess").style.display = 'block';
    window.location = '/orders/viewOrders'
  }
};

// Get the session token from localstorage and set it in the app.config object
app.getSessionToken = function(){
  var tokenString = localStorage.getItem('token');
  if(typeof(tokenString) == 'string'){
    try{
      var token = JSON.parse(tokenString);
      app.config.sessionToken = token;
      if(typeof(token) == 'object'){
        app.setLoggedInClass(true);
      } else {
        app.setLoggedInClass(false);
      }
    }catch(e){
      app.config.sessionToken = false;
      app.setLoggedInClass(false);
    }
  }
};

// Set (or remove) the loggedIn class from the body
app.setLoggedInClass = function(add){
  var target = document.querySelector("body");
  if(add){
    target.classList.add('loggedIn');
  } else {
    target.classList.remove('loggedIn');
  }
};

// Set the session token in the app.config object as well as localstorage
app.setSessionToken = function(token){
  app.config.sessionToken = token;
  var tokenString = JSON.stringify(token);
  localStorage.setItem('token',tokenString);
  if(typeof(token) == 'object'){
    app.setLoggedInClass(true);
  } else {
    app.setLoggedInClass(false);
  }
};

// Renew the token
app.renewToken = function(callback){
  var currentToken = typeof(app.config.sessionToken) == 'object' ? app.config.sessionToken : false;
  if(currentToken){
    // Update the token with a new expiration
    var payload = {
      'token' : currentToken.tokenID,
      'extend' : true,
    };
    app.client.request(undefined,'api/tokens','PUT',undefined,payload,function(statusCode,responsePayload){
      // Display an error on the form if needed
      if(statusCode == 200){
        // Get the new token details
        var queryStringObject = {'token' : currentToken.tokenID};
        app.client.request(undefined,'api/tokens','GET',queryStringObject,undefined,function(statusCode,responsePayload){
          // Display an error on the form if needed
          if(statusCode == 200){
            app.setSessionToken(responsePayload);
            callback(false);
          } else {
            app.setSessionToken(false);
            callback(true);
          }
        });
      } else {
        app.setSessionToken(false);
        callback(true);
      }
    });
  } else {
    app.setSessionToken(false);
    callback(true);
  }
};

// Load data on the page
app.loadDataOnPage = function(){
  // Get the current page from the body class
  var bodyClasses = document.querySelector("body").classList;
  var primaryClass = typeof(bodyClasses[0]) == 'string' ? bodyClasses[0] : false;

  // Logic for account settings page
  if(primaryClass == 'accountEdit'){
    app.loadAccountEditPage();
  }

  // Logic for dashboard page
  if(primaryClass == 'viewMenu'){
    app.loadViewMenuPage();
  }

  // Logic for cart details page
  if(primaryClass == 'editCart'){
    app.loadEditCartPage();
  }

  // Logic for order details page
  if(primaryClass == 'viewOrders'){
    app.loadViewOrdersPage();
  }
};

// Load the account edit page specifically
app.loadAccountEditPage = function(){
  // Get the email number from the current token, or log the user out if none is there
  var email = typeof(app.config.sessionToken.email) == 'string' ? app.config.sessionToken.email : false;
  if(email){
    // Fetch the user data
    var queryStringObject = {
      'email' : email
    };
    app.client.request(undefined,'api/users','GET',queryStringObject,undefined,function(statusCode,responsePayload){
      if(statusCode == 200){
        // Put the data into the forms as values where needed
        document.querySelector("#accountEdit1 .nameInput").value = responsePayload.name;
        document.querySelector("#accountEdit1 .addressInput").value = responsePayload.address;
        document.querySelector("#accountEdit1 .displayEmailInput").value = responsePayload.email;

        // Put the hidden phone field into both forms
        var hiddenEmailInputs = document.querySelectorAll("input.hiddenEmailInput");
        for(var i = 0; i < hiddenEmailInputs.length; i++){
            hiddenEmailInputs[i].value = responsePayload.email;
        }

      } else {
        // If the request comes back as something other than 200, log the user our (on the assumption that the api is temporarily down or the users token is bad)
        app.logUserOut();
      }
    });
  } else {
    app.logUserOut();
  }
};

// Add the requested item to user's cart
app.addToCart = function(e) {
  e.preventDefault();
  if (String(e.target.tagName) == 'BUTTON') {
    app.client.request(undefined, 'api/cart', 'GET', undefined, undefined, function(statusCode, responsePayload) {
      if (statusCode == 200) {
        responsePayload.items.push(e.target.classList[0]);
        let payload = {
          "cart": responsePayload.items
        }
        app.client.request(undefined, 'api/cart', 'PUT', undefined, payload, function(statusCode, responsePayload) {
          if (statusCode != 200) {
            app.logUserOut();
          }
        });
      } else {
        var payload = {
          "cart": [String(e.target.classList[0])]
        }
        app.client.request(undefined, 'api/cart', 'POST', undefined, payload, function(statusCode, responsePayload) {
          if (statusCode != 200) {
            app.logUserOut();
          }
        });
      }
    });
  }
}

// Remove the requested item 1 in number from the cart
app.removeFromCart = function(e) {
  if (String(e.target.tagName) == 'BUTTON') {
    app.client.request(undefined, 'api/cart', 'GET', undefined, undefined, function(statusCode, responsePayload) {
      if (statusCode == 200) {
        responsePayload.items.splice(responsePayload.items.indexOf(e.target.classList[0]), 1);
        let payload = {
          "cart": responsePayload.items
        }
        app.client.request(undefined, 'api/cart', 'PUT', undefined, payload, function(statusCode, responsePayload) {
          if (statusCode != 200) {
            app.logUserOut();
          } else {
            window.location.reload();
          }
        });
      } else {
        app.logUserOut();
      }
    });
  }
}

// Load the dashboard page specifically
app.loadViewMenuPage = function(){
  // Fetch the Menu
  app.client.request(undefined,'api/menu','GET',undefined,undefined,function(statusCode,responsePayload){
    if(statusCode == 200){
      // Validate the menu object
      const menu = typeof(responsePayload) == 'object' ? responsePayload : false;
      if (menu) {
        // Show each item in the menu as a new row in the table
        for (type in menu) {
          if (menu.hasOwnProperty(type)) {
            menu[type].forEach(function(item) {
              var table = document.getElementById("menuTable");
              var tr = table.insertRow(-1);
              tr.classList.add('itemRow');
              var td0 = tr.insertCell(0);
              var td1 = tr.insertCell(1);
              var td2 = tr.insertCell(2);
              var td3 = tr.insertCell(3);
              td0.innerHTML = item['Item'].toUpperCase();
              td1.innerHTML = type.toUpperCase();
              td2.innerHTML = item['price'];
              td3.innerHTML = '<button class="' + item['id'] + '" style="padding:5px 5px; background-color: rgb(98, 237, 255);">+</button>'
              td3.addEventListener('click', app.addToCart);
            });
          }
        }
      } else {
        // If the request comes back as something other than 200, log the user our (on the assumption that the api is temporarily down or the users token is bad)
        app.logUserOut();
      }
    } else {
      // If the request comes back as something other than 200, log the user our (on the assumption that the api is temporarily down or the users token is bad)
      app.logUserOut();
    }
  });
};

// Load the edit cart page specifically
app.loadEditCartPage = function(){
  // Fetch the Menu
  app.client.request(undefined,'api/cart','GET',undefined,undefined,function(statusCode,responsePayload){
    if(statusCode == 200){
      // Validate the menu object
      const items = typeof(responsePayload.items) == 'object' && responsePayload.items instanceof Array ? responsePayload.items : false;
      if (items) {
        const counts = {};
        items.forEach(function(x) { counts[x] = (counts[x] || 0)+1; });
        app.client.request(undefined,'api/menu','GET',undefined,undefined,function(statusCode,responsePayload){
          if (statusCode == 200) {
            // Calculate the total
            let total = 0;

            for (id in counts) {
              if (counts.hasOwnProperty(id)) {
                for (type in responsePayload) {
                  if (responsePayload.hasOwnProperty(type)) {
                    responsePayload[type].forEach((item) => {
                      if (item['id'] == id) {
                        var table = document.getElementById("cartTable");
                        var tr = table.insertRow(-1);
                        tr.classList.add('itemRow');
                        var td0 = tr.insertCell(0);
                        var td1 = tr.insertCell(1);
                        var td2 = tr.insertCell(2);
                        var td3 = tr.insertCell(3);
                        var td4 = tr.insertCell(4);
                        td0.innerHTML = item['Item'].toUpperCase();
                        td1.innerHTML = type.toUpperCase();
                        td2.innerHTML = item['price'];
                        total += Number(item['price'])
                        td3.innerHTML = counts[id];
                        td4.innerHTML = '<button class="' + item['id'] + '" style="color:white; padding:5px 5px; background-color: #ff0000;">-</button>'
                        td4.addEventListener('click', app.removeFromCart);
                      }
                    })
                  }
                }
              }
            }
            // Put the data into the forms as values where needed
            document.getElementById("displayOrderTotalInput").value = total;
            document.querySelector("#placeOrderForm .PaymentMethodInput").value = "pm_card_visa";
          } else {
            // If the request comes back as something other than 200, log the user our (on the assumption that the api is temporarily down or the users token is bad)
            app.logUserOut();
          }
        });
      } else {
        // If there are no items, log the user out (on the assumption is that the api has failed deleting the empty cart or the users token is bad)
        app.logUserOut();
      }
    } else if (statusCode == 204) {
      console.log("here")
      // Show 'you have no checks' message
      document.getElementById("noChecksMessage").style.display = 'table-row';

      // Show the createCheck CTA
      document.getElementById("editCartCTA").style.display = 'block';

      // Disable the button to place order
      document.getElementById("placeOrderForm").style.visibility = 'hidden';
      document.getElementById("orderTotal").style.visibility = 'hidden';
    } else {
      // If the request comes back as something other than 200 or 500, log the user our (on the assumption that the api is temporarily down or the users token is bad)
      app.logUserOut();
    }
  });
}

// Load the orders
app.loadViewOrdersPage = function(){
  // Fetch the orders
  app.client.request(undefined,'api/orders','GET',undefined,undefined,function(statusCode,responsePayload){
    // Validate the required parameters
    const orders = typeof (responsePayload['orders']) && responsePayload['orders'] instanceof Array ? responsePayload['orders'] : false;
    if(statusCode == 200, orders){
      app.client.request(undefined,'api/menu','GET',undefined,undefined,function(statusCode,responsePayload){
        if (statusCode == 200) {
          // Validate the menu object
          const menu = typeof(responsePayload) == 'object' ? responsePayload : false;
          if (menu) {
            orders.forEach(function(order) {
              order['itemNames'] = [];
              order['items'].forEach(function(itemId) {
                 // Show each item in the menu as a new row in the table
                for (type in menu) {
                  if (menu.hasOwnProperty(type)) {
                    menu[type].forEach(function(item) {
                      if (item['id'] == itemId) {
                        order['itemNames'].push(item['Item'][0].toUpperCase() + item['Item'].slice(1));
                      }
                    });
                  }
                }
              });
            });
            orders.forEach(function(order) {
              var table = document.getElementById("ordersTable");
              var tr = table.insertRow(-1);
              tr.classList.add('itemRow');
              var td0 = tr.insertCell(0);
              var td1 = tr.insertCell(1);
              var td2 = tr.insertCell(2);
              var td3 = tr.insertCell(3);
              td0.innerHTML = order['itemNames'].join(',');
              td1.innerHTML = order['paymentMethod']
              td2.innerHTML = order['date'];
              td3.innerHTML = order['total'];
            });
          } else {
            console.log(1)
            // If the request comes back as something other than 200, log the user our (on the assumption that the api is temporarily down or the users token is bad)
            app.logUserOut();
          }
        } else {
          // If the request comes back as something other than 200, log the user our (on the assumption that the api is temporarily down or the users token is bad)
          app.logUserOut();
        }
      });
    } else if (statusCode == 204) {
      // Show 'you have no checks' message
      document.getElementById("noChecksMessage").style.display = 'table-row';
    } else {
      // If the request comes back as something other than 200, log the user our (on the assumption that the api is temporarily down or the users token is bad)
      app.logUserOut();
    }
  });
}

// Loop to renew token often
app.tokenRenewalLoop = function(){
  setInterval(function(){
    app.renewToken(function(err){
      if(!err){
        console.log("Token renewed successfully @ "+Date.now());
      }
    });
  },1000 * 60);
};

// Init (bootstrapping)
app.init = function(){

  // Bind all form submissions
  app.bindForms();

  // Bind logout logout button
  app.bindLogoutButton();

  // Get the token from localstorage
  app.getSessionToken();
  
  // Renew token
  app.tokenRenewalLoop();

  // Load data on page
  app.loadDataOnPage();
};

// Call the init processes after the window loads
window.onload = function(){
  app.init();
};