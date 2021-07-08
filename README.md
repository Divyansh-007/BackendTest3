# Hospital API
<b>Link: </b> https://covid-track-api.herokuapp.com/  
A hospital api that can be used to keep track of covid patients.

## Tools/Technologies
* [Node Js](https://nodejs.org/en/)
* [Express Js](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/2)
* [Passport Js](http://www.passportjs.org/)

## Minimum Requirements
You must be aware with basics of above (**atleast first three**) and have basic environment set up with you.

## Step by Step Implementation
Step - 1 Set up a new project and create index.js and directory structure as following:
   * project_name
     - config (will contain different config files)
     - controllers (will contain different controller files for different scenarios)
       - api (just distinguishing from normal controllers)
     - models (will contain models to be used in the project)
     - routes (will contain different route files for different routes)
       - api (just distinguishing from normal routes)
         - v1 (incase of different versions, this will be version 1 viz. v1)

Step - 2 Now the common step of initializing node package manager in the project:
```
dirname: \project_name> npm init
```
This will create a new directory **node_modules** in the structure if you will notice.
 
Step - 3 Install [express js](https://www.npmjs.com/package/express) 
```
dirname: \project_name> npm install express
```
and update index.js with following code:
```
 // using express js framework
const express = require('express');

// port for running 
const port = 8000;

// app intialization
const app = express();

// checking the server
app.listen(port,(err) => {
    if(err){console.log(`Error in running the sever ${err}`);}

    console.log(`Express server is up and running on port ${port}`);
});
```
If everyting was fine then it would have started the server and you will receive console output as:
```
dirname: \project_name> Express Server is up and running on port 8000
```
Step - 4 Now we will make user model to that will be the main entity in our project:
  - We need some libraries before hand:-
    - [mongoose](https://www.npmjs.com/package/mongoose) to interact with mongo db.
    - [bcrypt-nodejs](https://www.npmjs.com/package/bcrypt-nodejs) to encode password before storing it to database.
```
dirname: \project_name> npm install mongoose
dirname: \project_name> npm install bcrypt-nodejs
```
 Now create **doctor.js** , **patient.js** and **report.js** (inside models folder) as defined which will result in creation of models named **User** , **Patient** and **Report**.

Step - 5 We will define our first config file **mongoose.js** (under config folder) to establish connection with the database, so set up **mongoose.js** as defined and then update index.js with following:
```
// app intialization
const app = express();

// for database
const db = require('./config/mongoose');
```
Step - 6 Another config file **passport-jwt-strategy.js** (under config folder) to be used for authentication and authorization for a user.
  - Libraries to be installed before hand:-
    - [passport](https://www.npmjs.com/package/passport) to use passport js library
    - [passport-jwt](https://www.npmjs.com/package/passport-jwt) for passport local startegy for authentication.
```
dirname: \project_name> npm install passport
dirname: \project_name> npm install passport-jwt
```
 After setting up **passport-jwt-strategy.js** update the following in the index.js:
 ```
// connecting database
const db = require('./config/mongoose');

// for authentication using passport.js
const passport = require('passport');
// jwt strategy
const passportJwt = require('./config/passport-jwt-strategy');

// to use encoded input data
app.use(express.urlencoded());

// use (main) express router
app.use('/',require('./routes/index'));

// checking the server
app.listen(port,(err) => { .....
```
Step - 7 As this is an api, we wont be working on any views and will directly begin working on routes and controllers.
- Routes
  - Create **index.js** (under routes folder, which will be the main routing file)
    - Create **index.js** (under routes/api folder, which will be the main api routing file)
      - Create **index.js** (under routes/api/v1 folder, which will be the main api v1 routing file)
        - Create **home.js** (under routes/api/v1 folder, which will be the main api v1 home routing file)
        - Create **doctor.js** (under routes/api/v1 folder, which will be the main api v1 doctor routing file)
        - Create **patient.js** (under routes/api/v1 folder, which will be the main api v1 patient routing file)
- Controllers, similarly as routes we will have controllers handling the requests from respective routes namely:
  - **home_api.js** (under controllers/api folder, which will handle home controlling)
  - **doc_api.js** (under controllers/api folder, which will handle doctor controlling)
  - **patient_api.js** (under controllers/api folder, which will handle patient controlling)
  
If everything is created as it is, then we are done with creating the project and now it time to see it working.

## Testing and Working (I have used Postman !!)
Step - 1 We will start the api and check if it is working by calling
- http://localhost:8000/api/v1/home/

Step - 2 Now we will register two doctors using
- http://localhost:8000/api/v1/doctor/register
  - You have to enter **name** , **username** , **password** and **confirm_password** fields.
    - whether registering a new doctor or an existing one you will receive the response accordingly.

Step - 3 As we have registered doctors it's time to register patients as following
- http://localhost:8000/api/v1/patients/register
  - You have to enter **name** , **phoneNumber** , **confirm_phoneNumber** and **status** (intial status) fields.
    - whether registering a new patient or an existing one you will receive the response accordingly.

Step - 4 As soon as we are done with registering patients, we can now start creating reports for concerned patient.  
Here will be authorizing a logged in doctor only for creating report.
- Firstly we will login the specific doctor and generate the token for authorization as
  - http://localhost:8000/api/v1/doctor/login
- Then we will create a report for a patient using his/her id by
  - http://localhost:8000/api/v1/doctor/patients/:id/create_report
    - You have to enter **status** and **date** fields.

Step - 5 If we have created report for a patient, we can look all his/her reports using
- http://localhost:8000/api/v1/home/patients/:id/all_reports
  - you will get the desired response with all the reports of the user with the provided id when and who created with what status. 

Step - 6 At any moment if we need to get all reports of all patients with a specific status filtered we can also do so using
- http://localhost:8000/api/v1/home/reports/:status
  - you will get all reports of all patients which the specified status at present with the hospital.
