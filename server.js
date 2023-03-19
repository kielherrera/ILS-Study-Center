require('dotenv').config();
const express = require('express');
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
const User = require('./models/userModel');
const { query } = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local')
const passportLocalMongoose = require('passport-local-mongoose');
const app = express();


app.use(session({
    secret: 'Secret',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));

mongoose.set('strictQuery', true);

//Paths
app.use('/', express.static('public'));
app.use('/enrollment/', express.static('public'));
app.use('/add_classes', express.static('public'));
app.use('/classes/', express.static('public'));
app.use('/classes/edit/:id', express.static('public'));
app.use('/enrollment/class/', express.static('public'));
app.use('/enrollment/class/:id',express.static('public'));
app.use('/view_students/edit/', express.static('public'));
app.use('/view_students/delete', express.static('public'));
app.use('/view_teachers/edit/', express.static('public'));
app.use('/view_teachers/delete', express.static('public'));
app.use('/enrollment/class/:classId/students', express.static('public'));
app.use('/enrollment/class/:classId/drop', express.static('public'));

db.connect();

passport.use(User.createStrategy());


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Present in the  login page
app.get('/', function(req,res){
    res.render('login_page', {err_prompt: ""});
});

app.post('/', function(req,res){

    const user = new User({
        username: req.body.username,
        password: req.body.password
    });
    req.login(user,function(err){
        if(err){
            console.log(err);
            res.redirect('/');
        }
        else{
            passport.authenticate('local', function(err,user,info,status){
                if(err){
                    console.log(err);
                      return res.redirect('/register');
                }
                if(!user){
                    console.log('wrong user');
                     return res.redirect('/');
                }

                res.redirect('/dashboard');
            })(req,res);
        }
    })
});

app.get('/register', function(req,res){
    res.render('admin_register');
});
// Test Function
app.post('/register', function(req,res){
    User.register({username:req.body.username}, req.body.password, function(err,user){
        if(err){
            console.log(err);
            res.redirect('/register');
        }
        else{
            passport.authenticate("local")(req,res,function(){
               res.redirect('/dashboard');
            });
        }
    })
});

 

app.post('/logout', function(req,res){
    req.logout(function(err){
        if(err)
            console.log(err);
        else
            res.redirect('/');
    });
     
})

app.get('/inquire', function(req,res){
    res.render('create_inquiry_page');
});

// Present in admin pages
app.get('/dashboard',function(req,res){
    if(req.isAuthenticated()){
        res.render('admin_homepage');
    }
    else
        res.redirect('/');
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
    });
});

app.post('/view_students/:id/delete', function(req,res){
    const query = {_id: req.params.id};

    studentAccounts.findById(query, function(err,data){
        if(err)
            console.log(err);
        else{
            const new_query = {email: data.email};

            studentAccounts.deleteOne(new_query, function(err,docs){
                if(err)
                    console.log(err);
                else
                    console.log('Deleted' + docs);
            })
            userAccounts.deleteOne(new_query,function(err,docs){
                if(err)
                    console.log(err);
                else
                    console.log('Deleted' + docs);
            });

            res.redirect('/view_students');
        }
    });
});

app.get('/view_students/edit/:id', function(req,res){
    const id = req.params.id;

    studentAccounts.findById(id, function(err,data){
        if(err)
            console.log(err);
        else{
            res.render('admin_student_record_edit', {student:data});
        }
    })
});

app.post('/view_students/edit/:id/success', function(req,res){
    const query = {_id: req.params.id};
    const updates = {firstName: req.body.fName, lastName: req.body.lName, email: req.body.email_address,
    username: req.body.username, password: req.body.password};

    studentAccounts.findById(query,function(err,data){
 
        if(err)
            console.log(err);
        else{
 
            const new_query = {email: data.email};

            studentAccounts.findOneAndUpdate(new_query, updates, function(err,docs){
                if(err)
                    console.log(err);
                else
                    console.log('Updated' + docs);
            });

            userAccounts.findOneAndUpdate(new_query, updates,function(err,docs){
                if(err)
                    console.log(err);
                else
                    console.log('Updated' + docs);
            });
        }
    });
    res.redirect('/view_students');
});



app.get('/view_teachers', function(req,res){
    teacherAccounts.find({}, function(err, teachers) {
        res.render('admin_teacher_record', {
            teacherList: teachers
        }) 
    })

});

app.post('/view_teachers/:id/delete', function(req,res){
    const query = {_id: req.params.id};

    teacherAccounts.findById(query, function(err,data){
        if(err)
            console.log(err);
        else{
            const new_query = {email: data.email};

            teacherAccounts.deleteOne(new_query, function(err,docs){
                if(err)
                    console.log(err);
                else
                    console.log('Deleted' + docs);
            })
            userAccounts.deleteOne(new_query,function(err,docs){
                if(err)
                    console.log(err);
                else
                    console.log('Deleted' + docs);
            });

            res.redirect('/view_teachers');
        }
    });
});

app.get('/view_teachers/edit/:id', function(req,res){
    const id = req.params.id;

    teacherAccounts.findById(id, function(err,data){
        if(err)
            console.log(err);
        else{

            res.render('admin_teacher_record_edit', {teacher:data});
        }
    })
});

app.post('/view_teachers/edit/:id/success', function(req,res){
    const query = {_id: req.params.id};
    const updates = {firstName: req.body.fName, lastName: req.body.lName, email: req.body.email_address,
    username: req.body.username, password: req.body.password};

    teacherAccounts.findById(query,function(err,data){
 
        if(err)
            console.log(err);
        else{
 
            const new_query = {email: data.email};

            teacherAccounts.findOneAndUpdate(new_query, updates, function(err,docs){
                if(err)
                    console.log(err);
                else
                    console.log('Updated' + docs);
            });

            userAccounts.findOneAndUpdate(new_query, updates,function(err,docs){
                if(err)
                    console.log(err);
                else
                    console.log('Updated' + docs);
            });
        }
    });
    res.redirect('/view_teachers');
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
        studentAccounts.find({'classes._id': req.query.id}, function(err, students) {
                res.render('admin_enroll_advanced', {
                    studentList: students,
                    classId: result._id,
                    className: result.className,
                    section: result.section,
                    teacherAssigned: result.teacherAssigned,
                    program: result.program,
                    availableSlots: result.availableSlots,
                    startTime: result.startTime,
                    endTime: result.endTime
            }) 
        })
    })

    
});

app.get('/enrollment/class/:id/students',function(req,res){

    studentAccounts.find({}, function(err, student) {
        res.render('admin_enrolled_studentlist', {
            studentList: student,
            returnLink: req.params.id
        }) 
    })
})

app.post('/enrollment/class/:classId/students/:studentId',function(req,res){

    const classQuery = {_id: req.params.classId};

    classScheds.findById(classQuery, function(err,studentClass){
        if(err)
            console.log(err);
        else{
            const studentQuery = {_id: req.params.studentId};
            var subject = {className: studentClass.className};

            var subject = {_id: req.params.classId, className: studentClass.className, teacherAssigned:
                             studentClass.teacherAssigned,section:studentClass.section, 
                             startTime:studentClass.startTime,endTime:studentClass.endTime};

            const pushOperation = {$push : {classes:subject}};

            studentAccounts.findByIdAndUpdate(studentQuery, pushOperation, function(err,docs){
                if(err)
                    console.log(err);
                else{
                    res.redirect('/enrollment/class/?id=' + req.params.classId);
                    console.log('Inserted at ' + docs );
                }  
            });
        }
    });
});

app.post('/enrollment/class/:classId/drop/:studentId', function(req,res){
    const classQuery = {_id : req.params.classId};

    classScheds.findById(classQuery, function(err, classList){
        if(err)
            console.log(err);
        else{
            const studentSearchQuery = {_id : req.params.studentId};
            const dropOperation = {$pull:{ classes: {_id: classList.id, className: classList.className, teacherAssigned:classList.teacherAssigned,
                                            section: classList.section, startTime: classList.startTime, endTime: classList.endTime}}};

            studentAccounts.findByIdAndUpdate(studentSearchQuery, dropOperation, function(err,students){
                if(err)
                    console.log(err);
                else{
                    res.redirect('/enrollment/class/?id=' + req.params.classId);
                    console.log('Dropped subject' + classList.name + 'from student ' + students.name );
                }
            });
        }
    })
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

    teacherAccounts.find({}, function(err, data) {
        res.render('admin_add_classes', {
            teachers: data
        }) 
    })
});

app.get('/classes/edit/:id', function(req,res){
    db.findOne(classScheds, {_id: req.params.id}, {}, function(result) {
        teacherAccounts.find({}, function (err, teachers){
            res.render('admin_edit_class_information', {
                teacherList: teachers,
                id: req.params.id,
                className: result.className,
                program: result.program,
                availableSlots: result.availableSlots,
                section: result.section,
                startTime: result.startTime,
                endTime: result.endTime             
            }) 
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

app.post('/classes/edit/:id', function(req,res){

    classScheds.findByIdAndUpdate(req.params.id, { 
        section: req.body.section, 
        teacherAssigned: req.body.teacherAssigned,
        program: req.body.program,
        availableSlots: req.body.class_slot,
        startTime: req.body.start_time,
        endTime: req.body.end_time}, {new:true}, function(err,data){
            if(err){
                console.log(err);
            }
            else{
                console.log('Updated' + data);
                res.redirect('/classes');
            }
        } )

});

var server = app.listen(3000, function() {
    console.log("Server is running at port 3000...");
});

