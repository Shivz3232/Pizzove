# Tips to interact with UI:

1. Use the email: dgshivu3232@gmail.com for signing up, as this is used for Stripe as well as mailgun

2. Challenges faced: Let the user know the order is being placed once the place order button is clicked. 
                     I was unable to add a loading indicator.

-----------------------------------------------------------------------------------
# API Overview:

1./users
    -POST: Required data: "name", "email", "address", "tosAgreement" & "password"
    -GET: Required header: token.
    -PUT: Required header: token. Optional data: "name" and/or "address"
    -DELETE: Required header: token. Required data: "email"

2./tokens
    -POST: Required data: "email", "password"
    -GET: Required data: "token"
    -PUT: Required data: "token", "extend"
    -DELETE: Required data: "token"

3./menu
    -GET: Required header: "token"

4./cart:
    -POST: Required header: "token". Required data: "cart"
    -GET: Required header: "token"
    -PUT: Required header: "token". Required data: "cart"
    -DELETE: Required header: "token"

5./orders
    -POST: Required header: "token". Required data: "paymentMethod"
    -GET: Required header: "token".

Note: All required data must be sent as raw JSON.
-------------------------------------------------------------------------------------

# Example API use case:

1.Register by POST /users with "name", "email", "address", "tosAgreement", "password". Ex:
    {
        "name": "me",
        "email": "me@example.com",
        "address": "my address",
        "tosAgreement": true,
        "password": "mypassword"
    }

2.Login by POST /tokens with "email", "password". Ex:
    {
        "email": "me@example.com",
        "password": "mypassword"
    }

3.Access menu by GET /menu using the token recieved in step 2, in the request header.

4.Fill cart by POST /cart with [item ids], reffering the menu recieved in step 3. Ex:
    {
        "cart": [1, 7]
    }

5.Place order by POST /order with "paymentMethod". Ex:
    {
        "paymentMethod": "pm_card_visa"
    }

Note:
1.Step 3, 4, 5 will require the token recieved in step 2 as a header. Ex.
    Header:
    {
        "token": 123456789
    }

2.For mailgun to work i.e., for step 5 to return 200, one must register with a mail id associated with mailgun API key & domain address in config.js.
  For the current API key & domain address to work you may use the email: 'dgshivu3232@gmail.com' in steps 1 & 2.