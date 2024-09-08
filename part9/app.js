const express = require('express');
const path = require('path');
const app = express();

app.use("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));

app.get('/',(req,res)=>{
    res.send('hellow world');
})

app.listen(3000,()=>{
    console.log('server is running on port 3000');
});