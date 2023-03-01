const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const db = require('./models/db.js');
const adminAccounts = require('./models/adminAccountsModel.js');
const inquiryForms = require('./models/inquiryFormsModel.js');
const app = express();


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

db.connect();

app.use(session({
    'secret': 'ils-session',
    'resave': false,
    'saveUninitialized': false,
    store: MongoStore.create({mongoUrl: 'mongodb://localhost:27017/ILS-Study-Center'})
}));

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
    db.insertOne(inquiryForms, {name: req.body.inquirer_name, phoneNumber: req.body.inquirer_mobile_number, 
                email: req.body.inquirer_email_address, fbLink: req.body.inquirer_facebook_link, 
                childName: req.body.child_name, birthDate: req.body.child_birthdate, gender: req.body.gender, 
                program: req.body.program, inquiry: req.body.inquiry}, (result) => {

        res.redirect('/');
    });
})


var server = app.listen(3000, function() {
    console.log("Server is running at port 3000...");
});

