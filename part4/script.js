// Express.js Framework:
// Introduction to Express.js.
// express js ek npm package hai
//framework -> excxpress.js

// manages everything from receving requests to sending responses


// Setting up a basic Express application.
// Routing.
// Middleware.
// Request and response handling.
// Error handling.

// npm i express
const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})
app.get('/profile', function (req, res) {
    res.send('hey Dev i am kartik mern developer')
  })

app.listen(3000)

// npm i nodemon -g for auto restart server
//nodemon sc1.js
// server or routes ke bich me ho ta he middleware routes ke phle aata hai
// 