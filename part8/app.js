const express = require("express");
const app = express();
const userModel = require("./usermodel")


app.get('/',( req ,res) =>{
    res.send('Hello World');
})

app.get('/creat', async( req ,res) =>{
   let creat= await userModel.create({
        name: 'kartik',
        age: 21,
        email: 'kartikmehta650@gmail.com'
    })
    res.send(creat)
    console.log('Data created');
})




app.listen(3000 , function(){
    console.log('server is running on port 3000');
})