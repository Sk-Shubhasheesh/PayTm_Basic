# Build a basic version of PayTM
### We’re building a PayTM like application that let’s users send money to each other given an initial dummy balance.

![alt text](<Markdown file/Screenshot (711).png>)

## Step 1
### We need to support 3 routes for user authentication -
🚀 Allow user to sign up.
🚀 Allow user to sign in.
🚀 Allow user to update their information (firstName, lastName, password).

## Step 2 -  Create routing file structure
⏺ In the index.js file, route all the requests to /api/v1 to a apiRouter defined in backend/routes/index.js

## Step 3 - Route user requests
1. #### Create a new user router 
Define a new router in backend/routes/user.js and import it in the index router.
Route all requests  that go to /api/v1/user to the user router.
2. #### Create a new user router 
Import the userRouter in backend/routes/index.js so all requests to /api/v1/user get routed to the userRouter.


## Step 4 - Add cors, body parser and jsonwebtoken
1. #### Add cors
Since our frontend and backend will be hosted on separate routes, add the cors middleware to backend/index.js
2. #### Add body-parser
Since we have to support the JSON body in post requests, add the express body parser middleware to backend/index.js. You can use the body-parser npm library, or use express.json 
3. #### Add jsonwebtoken
We will be adding authentication soon to our application, so install jsonwebtoken library.
4. #### Export JWT_SECRET
Export a JWT_SECRET from a new file backend/config.js.
5. #### Listen on port 3000 
Make the express app listen on PORT 3000 of your machine.


## Step 5 - Add backend auth routes
🔸 In the user router (backend/routes/user), add 3 new routes.
1. #### Signup
This route needs to get user information, do input validation using zod and store the information in the database provided.
* Inputs are correct (validated via zod)
* Database doesn’t already contain another user