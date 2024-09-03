const express = require('express')
const app = express()

app.use(function (req, res, next) {
console.log("I am a middleware");
next();
});


app.get('/', function (req, res) {
    res.send('hey Dev i am kartik mern developer')
   
  })

app.listen(3000)