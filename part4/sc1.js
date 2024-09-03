const express = require('express')
const app = express()

app.use(function (req, res, next) {
console.log("I am a middleware");
next();
});


app.get('/', function (req, res,next) {
    // res.send('hey Dev i am kartik mern developer')
   return next(new Error('Error in / route'));
   
  })

  app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })
  
app.listen(3000)