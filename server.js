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

// Present in the  login page
app.get('/', function(req,res){
    res.render('login_page');
});

app.get('/inquire', function(req,res){
    res.render('create_inquiry_page');
});

// Present in admin pages
app.get('/dashboard',function(req,res){
    res.render('admin_homepage');
});


app.get('/create_account',function(req,res){
    res.render('admin_create_account');
});


app.get('/inquiries', function(req,res){
    res.render('admin_inquiries');
});

app.get('/view_inquiry', function(req,res){
    res.render('admin_transactions_inquiry');
});

app.get('/view_students', function(req,res){
    res.render('admin_student_record');
});

app.get('/view_teachers', function(req,res){
    res.render('admin_teacher_record');
});

app.get('/view_finances', function(req,res){
    res.render('admin_finance_records')
});

app.get('/enrollment', function(req,res){
    res.render('admin_enrollment');
});

app.get('/enrollment/:classId',function(req,res){
    res.render('admin_enroll_advanced');
});

//Present in reports and Records

app.get('/classes', function(req,res){
    res.render('admin_classlist')
});
app.get('/add_classes',function(req,res){
    res.render('admin_add_classes');
});


// Post methods

app.post('/', function(req,res){
    res.redirect('/dashboard');
 
});




app.post('/inquire', function(req,res){
    db.insertOne(inquiryForms, {name: req.body.inquirer_name,
         phoneNumber: req.body.inquirer_mobile_number, 
                email: req.body.inquirer_email_address,
                 fbLink: req.body.inquirer_facebook_link, 
                childName: req.body.child_name, birthDate: req.body.child_birthdate,
                 gender: req.body.gender, 
                program: req.body.program,
                 inquiry: req.body.inquiry
                },
                 (result) => {
        res.redirect('/');
    });
})


var server = app.listen(3000, function() {
    console.log("Server is running at port 3000...");
});

