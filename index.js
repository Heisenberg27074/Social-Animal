 const express = require('express');
 const cookieParser = require('cookie-parser');
 const app = express();
 const port = 8000;
 const path = require('path');
 const db = require('./config/mongoose');


 app .use(express.urlencoded());
 app.use(cookieParser());
//  use express router
app.use('/',require('./routes'));

// set up our view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));

 app.listen(port, (err)=>{
     if(err){
         console.log(`Error in running the server: ${err}`);
     }
     else{
         console.log(`Server is running on the port: ${port}`);
     }
 })