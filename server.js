const express = require('express');
const bodyParser = require('body-parser');
const app = express();


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

app.get('/', function(req,res){
    res.render('login_page');
});

app.get('/inquire', function(req,res){
    res.render('create_inquiry_page');
});

app.post('/', function(req,res){
    res.redirect('/');
});

app.post('/inquire', function(req,res){
    res.redirect('/');
})


var server = app.listen(3000, function() {
    console.log("Server is running at port 3000...");
});

