## Week 7 Project - AUTHENTICATION WEEK

To see the project: https://xxteam.herokuapp.com/

### Requirements
+ [x] Login form with 2 fields - username and password
+ [ ] Client-side _and_ server-side validation on login form, including error handling that provides feedback to users
+ [x] Users only have to log in once (i.e. implement a cookie-based session on login)
+ [x] Username is visible on each page of the site after logging in
+ [ ] Any user-submitted content should be labelled with the authors username
+ [ ] There should be protected routes and unprotected routes that depend on the user having a cookie or not (or what level of access they have).
+ [x] Website content should be stored in a database

Note:
+ Client-side and server-side validation on content submission is optional
+ Whether you also allow users to delete the content that they have submitted will depend on the project you decide to create.

Our team decided to build a web application where authorized users can create short posts to share. To begin, the user must register with the site by providing a properly formatted email address and a password that is at least 8 characters long and contains either a capital letter or special character. Once this is complete, they will be logged in automatically and should see "You are logged in as example@example.com". The user can then create and submit posts and should be able to see them appear immediately on the page after posting.

### To run this project locally:
Clone the repository. Then cd into the repository.
```
$ git clone git@github.com:fac-13/xx-team.git
$ cd xx-team
```
Use `npm` to install dependencies
```
$ npm install
```
or
```
$ npm i
```

Create a local database using Postgres and add it to a file called "config.env" with a key of DB_URL and include a secret (used for hashing the signature of the [JSON Web Token](https://en.wikipedia.org/wiki/JSON_Web_Token))

```
DB_URL=postgres://[username]:[password]@localhost:5432/[name-of-database]
SECRET=[random string of letters/numbers]
```

You should now be all set up and ready to run the program! You can run 'npm start' in your terminal, however, 'npm run dev' will utilize the [Nodemon](https://www.npmjs.com/package/nodemon) package which will continue to check for changes in your files and restart the server for you.
```
$ npm run dev
```



