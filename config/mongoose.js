// require the library
const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost/Codeial_development');

// acquire the connection (to check if its successful)
const db = mongoose.connection;

// error
db.on('error', console.error.bind(console, 'error connecting to db'));

// up and running then peint the message
db.once('open',function(){
    console.log("Succesfully connected to the database");
})
