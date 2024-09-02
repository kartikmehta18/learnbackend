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

app.listen(3000)