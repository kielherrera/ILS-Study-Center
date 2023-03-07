const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const db = require('./models/db.js');
const adminAccounts = require('./models/adminAccountsModel.js');
const inquiryForms = require('./models/inquiryFormsModel.js');
const classScheds = require('./models/classSchedsModel.js');
const userAccounts = require('./models/userAccountsModel.js');
const studentAccounts = require('./models/studentAccountsModel.js');
const teacherAccounts = require('./models/teacherAccountsModel.js');
const app = express();


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));

// Paths
app.use('/', express.static('public'));
app.use('/enrollment/', express.static('public'));
app.use('/add_classes', express.static('public'));
app.use('/classes/', express.static('public'));
app.use('/enrollment/class/', express.static('public'));
 
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

app.get('/inquiries', (req, res) => {

    if(req.query.id == null){
            inquiryForms.find({}, function(err, inquiries) {
            res.render('admin_inquiries', {
                inquiryList: inquiries
            }) 
        })
    }

    else {
        db.deleteOne (inquiryForms, {_id: req.query.id}, (result) =>{
            inquiryForms.find({}, function(err, inquiries) {
                res.render('admin_inquiries', {
                    inquiryList: inquiries
                }) 
            })
        });
    }
    
})

app.get('/view_inquiry', (req, res) => {
    db.findOne(inquiryForms, {_id: req.query.id}, {}, function(result) {
        res.render('admin_transactions_inquiry', {
            id: result._id,
            name: result.name,
            phoneNumber: result.phoneNumber,
            email: result.email,
            fblink: result.fbLink,
            childName: result.childName,
            birthDate: result.birthDate,
            gender: result.gender,
            program: result.program,
            inquiry: result.inquiry
        }) 
    })
})

app.get('/view_students', function(req,res){
    studentAccounts.find({}, function(err, students) {
        res.render('admin_student_record', {
            studentList: students
        }) 
    })

});

app.get('/view_teachers', function(req,res){
    teacherAccounts.find({}, function(err, teachers) {
        res.render('admin_teacher_record', {
            teacherList: teachers
        }) 
    })

});

app.get('/view_finances', function(req,res){
    res.render('admin_finance_records')
});

app.get('/enrollment', function(req,res){
    classScheds.find({}, function(err, classes) {
        res.render('admin_enrollment', {
            classList: classes
        }) 
    })

});

app.get('/enrollment/class',function(req,res){
    db.findOne(classScheds, {_id: req.query.id}, {}, function(result) {
        res.render('admin_enroll_advanced', {
            className: result.className,
            section: result.section,
            teacherAssigned: result.teacherAssigned,
            program: result.program,
            availableSlots: result.availableSlots,
            startTime: result.startTime,
            endTime: result.endTime
        }) 
    })

});

app.get('/enrollment/class/enrolled_students',function(req,res){

    studentAccounts.find({}, function(err, student) {
        res.render('admin_enrolled_studentlist', {
            studentList: student
        }) 
    })
})

app.post('/enrollment/class',function(req,res){
    res.redirect('/dashboard')  ;
});




//Present in reports and Records

app.get('/classes', (req, res) => {
    classScheds.find({}, function(err, classes) {
        res.render('admin_classlist', {
            classList: classes
        }) 
    })
})

app.get('/add_classes',function(req,res){
    res.render('admin_add_classes');
});

app.get('/classes/edit/', function(req,res){

    db.findOne(classScheds, {_id: req.query.id}, {}, function(result) {
        res.render('admin_edit_class_information', {
            id: result._id,
            className: result.className
        }) 
    })

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
                                childName: req.body.child_name, 
                                birthDate: req.body.child_birthdate,
                                gender: req.body.gender, 
                                program: req.body.program,
                                inquiry: req.body.inquiry,
                                inquiryDate: new Date()
                },
                 (result) => {
        
        res.redirect('/');
    });
});

app.post('/add_classes', function(req,res){
    db.insertOne(classScheds, {className: req.body.className,
                                section: req.body.section,
                                teacherAssigned: req.body.teacherAssigned,
                                availableSlots: req.body.class_slot,
                                startTime: req.body.start_time,
                                endTime: req.body.end_time,
                                program: req.body.program
               },
                (result) => {
       res.redirect('/dashboard');
   });
});

app.post('/create_account', function(req,res){

    var userType = req.body.user_type;

    db.insertOne(userAccounts, {email: req.body.email_address, 
                                firstName: req.body.fName, 
                                lastName: req.body.lName, 
                                userType: req.body.user_type, 
                                username: req.body.username, 
                                password: req.body.password
               },
                (result) => {

       if(userType == "Student"){
            db.insertOne(studentAccounts, {email: req.body.email_address, 
                                            firstName: req.body.fName, 
                                            lastName: req.body.lName,  
                                            username: req.body.username, 
                                            password: req.body.password
                },
                    (result) => {
                    res.redirect('/dashboard');
                });
        }
       else if(userType == "Teacher"){
            db.insertOne(teacherAccounts, {email: req.body.email_address, 
                                            firstName: req.body.fName, 
                                            lastName: req.body.lName,  
                                            username: req.body.username, 
                                            password: req.body.password
                },
                    (result) => {
                    res.redirect('/dashboard');
                });
        }
   });
});

app.post('/classes/edit/', function(req,res){
    res.redirect('/classes');
});

var server = app.listen(3000, function() {
    console.log("Server is running at port 3000...");
});

