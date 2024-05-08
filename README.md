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
