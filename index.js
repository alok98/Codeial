const express=require('express');
const cookieParser=require('cookie-parser');
const app=express();
const port=8000;
const db = require('./config/mongoose');
const expressLayouts=require("express-ejs-layouts");
app.use(express.urlencoded())
app.use(cookieParser())
app.use(expressLayouts);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
app.use(express.static('./assets'));


//use express router
app.use('/',require("./routes"));



// set up the view engine
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,function(err){
    if(err){
        console.log(`Error in connecting to the port: ${err}`);
    }
    console.log(`Server is running on the port: ${port}`);
})