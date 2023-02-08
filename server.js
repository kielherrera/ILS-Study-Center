const http = require('http');
const express = require('express');

const app = express();
app.set('view engine', 'ejs');

app.get('/', function(req,res){
    res.send('Hello World');
})

var server = app.listen(3000, function() {
    console.log("Server is running at port 3000...");
});