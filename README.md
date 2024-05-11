# Build a basic version of PayTM
### We’re building a PayTM like application that let’s users send money to each other given an initial dummy balance.

![alt text](<Markdown file/Screenshot (711).png>)

## Step 1
### We need to support 3 routes for user authentication -
🚀 Allow user to sign up. <br />
🚀 Allow user to sign in. <br />
🚀 Allow user to update their information (firstName, lastName, password). <br />

## Step 2 -  Create routing file structure
⏺ In the index.js file, route all the requests to /api/v1 to a apiRouter defined in backend/routes/index.js

## Step 3 - Route user requests
1. #### Create a new user router 
* Define a new router in backend/routes/user.js and import it in the index router.
* Route all requests  that go to /api/v1/user to the user router.

2. #### Create a new user router 
* Import the userRouter in backend/routes/index.js so all requests to /api/v1/user get routed to the userRouter.


## Step 4 - Add cors, body parser and jsonwebtoken
1. #### Add cors
* Since our frontend and backend will be hosted on separate routes, add the cors middleware to backend/index.js

2. #### Add body-parser
* Since we have to support the JSON body in post requests, add the express body parser middleware to backend/index.js. You can use the body-parser npm library, or use express.json. 

3. #### Add jsonwebtoken
* We will be adding authentication soon to our application, so install jsonwebtoken library.

4. #### Export JWT_SECRET
* Export a JWT_SECRET from a new file backend/config.js.

5. #### Listen on port 3000 
* Make the express app listen on PORT 3000 of your machine.


## Step 5 - Add backend auth routes
🔸 In the user router (backend/routes/user), add 3 new routes.
1. #### Signup
This route needs to get user information, do input validation using zod and store the information in the database provided.
* Inputs are correct (validated via zod).
* Database doesn’t already contain another user.

2. #### Route to sign in
Let’s an existing user sign in to get back a token.

#### Note Point
1. Signup Route: <br />
🚀 In the signup route, after a new user is successfully created in the database (User.create()), a JSON Web Token (JWT) is generated using jwt.sign(). This token typically represents the user's identity and is used for authentication purposes. After signing up, the user is immediately logged in, and the token is returned in the response. This token can then be used by the client to authenticate future requests to protected endpoints.

2. Signin Route: <br />
🚀 In the signin route, the purpose of jwt.sign() is different. After validating the user's credentials (username and password), if the user is found in the database, a new JWT is generated using jwt.sign(). This token is then returned to the client, indicating a successful authentication process. The client can store this token and include it in subsequent requests to authenticate themselves.

So, while both routes use jwt.sign(), they serve different purposes: one is for creating a token upon signup, and the other is for creating a token upon successful authentication during signin.


## Step 6 - Middleware
Now that we have a user account, we need to gate routes which authenticated users can hit.For this, we need to introduce an auth middleware.
* Create a middleware.js file that  exports an authMiddleware function. <br />
🚀 Checks the headers for an Authorization header (Bearer <token>). <br />
🚀 Verifies that the token is valid. <br />
🚀 Puts the userId in the request object if the token checks out. <br />
🚀 If not, return a 403 status back to the user. <br />


## Step 7 - User routes
1. #### Route to update user information
* User should be allowed to optionally send either or all of <br />
🚀 password <br />
🚀 firstName <br />
🚀 lastName <br />
Whatever they send, we need to update it in the database for the user.
Use the middleware we defined in the last section to authenticate the user.

2. #### Route to get users from the backend, filterable via firstName/lastName
* This is needed so users can search for their friends and send them money.


## Step 8 - Create Bank related Schema
Update the db.js file to add one new schemas and export the respective models.
#### Accounts table
The Accounts table will store the INR balances of a user.
The schema should look something like this - 
```.JS
{
	userId: ObjectId (or string),
	balance: float/number
}
```
* In the real world, you shouldn’t store `floats` for balances in the database.
You usually store an integer which represents the INR value with 
decimal places (for eg, if someone has 33.33 rs in their account, 
you store 3333 in the database).
* There is a certain precision that you need to support (which for india is
2/4 decimal places) and this allows you to get rid of precision
errors by storing integers in your DB


## Step 9 - Transactions in databases
* A lot of times, you want multiple databases transactions to be atomic Either all of them should update, or none should.
* This is super important in the case of a bank.
* Can you guess what’s wrong with the following code - 
```.js
const mongoose = require('mongoose');
const Account = require('./path-to-your-account-model');

const transferFunds = async (fromAccountId, toAccountId, amount) => {
    // Decrement the balance of the fromAccount
	  await Account.findByIdAndUpdate(fromAccountId, { $inc: { balance: -amount } });

    // Increment the balance of the toAccount
    await Account.findByIdAndUpdate(toAccountId, { $inc: { balance: amount } });
}

// Example usage
transferFunds('fromAccountID', 'toAccountID', 100);
```
1. What if the database crashes right after the first request (only the balance is decreased for one user, and not for the second user)
2. What if the Node.js crashes after the first update?
   - It would lead to a database inconsistency. Amount would get debited from the first user, and not credited into the other users account.
   - If a failure ever happens, the first txn should rollback.
   - This is what is called a transaction in a database. We need to implement a transaction on the next set of endpoints that allow users to transfer INR.

## Step 10 - Initialize balances on signup
* Update the signup endpoint to give the user a random balance between 1 and 10000.
This is so we don’t have to integrate with banks and give them random balances to start with.

## Step 11 - Create a new router for accounts
* Here we crate the nrew route fot the account.

## Step 12 - Balance and transfer Endpoints
- Here, you’ll be writing a bunch of APIs for the core user balances. There are 2 endpoints that we need to implement.
 1. An endpoint for user to get their balance.
 2. An endpoint for user to transfer money to another account.

