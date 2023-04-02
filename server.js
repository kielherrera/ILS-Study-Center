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
const inquiryArchives = require('./models/inquiryArchiveModel.js');
const announcement = require('./models/announcementModel.js');

const { query } = require('express');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const { authenticate } = require('passport');
const app = express();


// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie : {maxAge: oneDay}
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
app.use('/announcements/:announcementID', express.static('public'));
app.use('/edit_announcement/:announcementId', express.static('public'));
app.use('/student/view_announcement', express.static('public'));
app.use('/student/account', express.static('public'));
db.connect();

passport.use(userAccounts.createStrategy());
passport.serializeUser(userAccounts.serializeUser());
passport.deserializeUser(userAccounts.deserializeUser());


// Present in the  login page
app.get('/', function(req,res){
    res.render('login_page', {err_prompt: ""});   
});

app.post('/', function(req,res){
    const user = new userAccounts({username: req.body.username, password:req.body.password});
    req.login(user, function(err){
        if(err)
            console.log(err);
        else{
            passport.authenticate('local',function(err,user,next){
                if(err){
                    return next(err);
                }
                if(!user){
                    return res.render('login_page', {err_prompt: 'Invalid username/password'});
                }

                else{
                    userAccounts.findOne({username:req.body.username}, function(err,data){
                        if(err)
                            res.redirect('/');
                        else{
                            const userType = data.userType; 
                            req.session.userType = userType;
                            
                            if(userType == "Admin")
                                res.redirect('/dashboard');
                            else if (userType == "Student")
                                res.redirect('/student');
                        }
                    });
                }
            })(req,res);
        }
    })
});

// For invalid acess of routes
app.get('/invalid_access', function(req,res){
    res.write("<h1> You are not allowed to access this page. </h1>");
})


app.get('/register', function(req,res){
    res.render('admin_register');
})

// Test Function
app.post('/register', function(req,res){
    userAccounts.register({email: req.body.email,
                            username:req.body.username,
                            firstName: req.body.fName,
                            lastName: req.body.lName,
                            userType: 'Admin'},req.body.password, function(err,user){
                                if(err){
                                    console.log(err);
                                    res.redirect('/register');
                                }
                                else{
                                    passport.authenticate("local")(req, res, function(){
                                        res.redirect('/');
                                    });
                                }
                            });
    
})

app.post('/logout', function(req,res){
    req.logout(function(err){
        if(err)
            console.log(err);
        else{
            req.session.destroy(function(err){
                console.log(err);
            });
            res.redirect('/');
        }
    })
});

app.get('/inquire', function(req,res){
    res.render('create_inquiry_page');
});


//Start of Student routes
app.get('/student', function(req,res){
    if(req.isAuthenticated()){
            if(req.session.userType == "Student"){
            announcement.find({},function(err,data){
                if(err)
                    console.log(err);
                else{
                    res.render('student_dashboard', {announcements:data});
                }
            });
        }
        else
            res.redirect('/invalid_access');
    }
    else
        res.redirect('/');
});

app.get('/student/view_announcement/:announcementId', function(req,res){
    announcement.findById(req.params.announcementId, function(err,data){
        if(err)
            console.log(err);
        else{
            res.render('student_advanced_announcement_view', {announcement:data});
        }
    })
});


app.get('/student_enrollment', function(req,res){
    res.render('student_enrollment');
});

app.post('/student_enrollment', function(req,res){
    console.log(req.body);
})

app.get('/student_personal_information', function(req,res){
    res.render('student_personal_information');
});

app.get('/student/account', function(req,res){
    res.render('student_account');
})

// End Student Routes

// Start of Admin Routes
app.get('/dashboard',function(req,res){
    if(req.isAuthenticated()){
        res.render('admin_homepage');
    }
    else{
        res.redirect('/');
    }
});

app.get('/create_account',function(req,res){
    res.render('admin_create_account', {err_msg:""});
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
        inquiryForms.findById({_id: req.query.id}, function(err,data){
             db.insertOne(inquiryArchives, {id: data._id,
                                           name: data.name,
                                           childName: data.childName,
                                           age: data.age,
                                           phoneNumber: data.phoneNumber,
                                           email: data.email,
                                           fblink: data.fbLink,
                                           gender: data.gender,
                                           program: data.program,
                                           concern1: data.concern1,
                                           concern2: data.concern2,
                                           inquiry: data.inquiry,
                                           inquiryDate: data.inquiryDate}, (result) => {
                db.deleteOne (inquiryForms, {_id: req.query.id}, (result) =>{
                    inquiryForms.find({}, function(err, inquiries) {
                        res.render('admin_inquiries', {
                            inquiryList: inquiries
                        }) 
                    })
                });
            });
        })
    }
});

app.get('/inquiries_archive', (req, res) => {
    
    if(req.query.id == null){
            inquiryArchives.find({}, function(err, inquiries) {
            res.render('admin_inquiries_archive', {
                inquiryArchive: inquiries
            }) 
        })
    }

    else {
        db.deleteOne (inquiryArchives, {_id: req.query.id}, (result) =>{
            inquiryArchives.find({}, function(err, inquiries) {
                res.render('admin_inquiries_archive', {
                    inquiryArchive: inquiries
                }) 
            })
        });
    }
    
});

app.get('/announcements', function(req,res){
    announcement.find({}, function(err, data){
        if(err)
            console.log(err)
        else
            res.render('admin_announcements', {announcements:data});
    });
    
});

app.get('/announcements/:announcementId',function(req,res){
    announcement.findById(req.params.announcementId, function(err,data){
        if(err){
            console.log(err);
            res.redirect('/announcements');
        }
        else{
            res.render('admin_announcement_advanced_view', {announcement:data});
        }
    })
});



app.post('/create_announcement', function(req,res){
    var date = new Date();

    date = date.toString().slice(4,15);

   
    db.insertOne(announcement, {dateCreated: date,
                                            announcementTitle: req.body.title,
                                            announcementText: req.body.announcementText}, (err, result) =>{
                                                if(err)
                                                    console.log(err);
                                                res.redirect('/announcements');
                                            });
});

app.get('/create_announcement', function(req,res){
    res.render('admin_createAnnouncement');
});

app.post('/delete_announcement/:announcementId', function(req,res){
    announcement.findByIdAndDelete(req.params.announcementId, function(err,docs){
        if(err)
            console.log(err);
        else{
            res.redirect('/announcements');
        }
    })
});

app.get('/edit_announcement/:announcementId',function(req,res){
    announcement.findById(req.params.announcementId, function(err,data){
        if(err)
            console.log(err);
        else{
            console.log(data);
            res.render('admin_edit_announcement', {announcement:data});
        }

    })
 });

app.post('/edit_announcement/:announcementId', function(req,res){
    announcement.findByIdAndUpdate(req.params.announcementId,{announcementTitle: req.body.title, announcementText: req.body.announcementText},
        {new:true},function(err,data){
            if(err)
                console.log(err);
            else
                res.redirect('/announcements');
        })
});

app.get('/view_inquiry', (req, res) => {
    db.findOne(inquiryForms, {_id: req.query.id}, {}, function(result) {
        res.render('admin_transactions_inquiry', {
            id: result._id,
            name: result.name,
            childName: result.childName,
            age: result.age,
            phoneNumber: result.phoneNumber,
            email: result.email,
            fblink: result.fbLink,
            gender: result.gender,
            program: result.program,
            concern1: result.concern1,
            concern2: result.concern2,
            inquiry: result.inquiry
        }) 
    })
}) 

app.get('/view_inquiry_archives', (req, res) => {
    db.findOne(inquiryArchives, {_id: req.query.id}, {}, function(result) {
        res.render('admin_transactions_inquiry_archives', {
            id: result._id,
            name: result.name,
            childName: result.childName,
            age: result.age,
            phoneNumber: result.phoneNumber,
            email: result.email,
            fblink: result.fbLink,
            gender: result.gender,
            program: result.program,
            concern1: result.concern1,
            concern2: result.concern2,
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
                else{
                     res.redirect('/view_students');
                    console.log('Updated' + docs);
                }
                    
            });

            userAccounts.findOneAndUpdate(new_query, updates,function(err,docs){
                if(err)
                    console.log(err);
                else
                    console.log('Updated' + docs);
            });
        }
    });
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
                else{
                    res.redirect('/view_teachers');
                    console.log('Deleted' + docs);
                }
                    
            })
            userAccounts.deleteOne(new_query,function(err,docs){
                if(err)
                    console.log(err);
                else
                    console.log('Deleted' + docs);
            });            
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
                else{
                    res.redirect('/view_teachers');
                    console.log('Updated' + docs);
                }
                    
            });

            userAccounts.findOneAndUpdate(new_query, updates,function(err,docs){
                if(err)
                    console.log(err);
                else
                    console.log('Updated' + docs);
            });
        }
    });
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


app.post('/inquire', function(req,res){
    
    db.insertOne(inquiryForms, {name: req.body.parent_name,
                                phoneNumber: req.body.parent_contact_info, 
                                fbLink: req.body.fb_link, 
                                childName: req.body.child_name, 
                                age: req.body.childAge,
                                gender: req.body.childGender, 
                                program: req.body.program,
                                concern1: req.body.information_for_teacher1,
                                concern2: req.body.information_for_teacher2,
                                inquiry: req.body.additional_message,
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

    userAccounts.register({email: req.body.email_address, 
                           firstName: req.body.fName, 
                           lastName: req.body.lName, 
                           userType: req.body.user_type, 
                           username: req.body.username},req.body.password, function(err,user){
            if(err){
                
                res.render('admin_create_account', {err_msg:err})
            }
            else{
                passport.authenticate("local")(req, res, function(){
                    if(userType == "Student"){
                        db.insertOne(studentAccounts, {email: req.body.email_address, 
                                                        firstName: req.body.fName, 
                                                        lastName: req.body.lName,  
                                                        username: req.body.username
                            },
                                (result) => {
                                res.redirect('/dashboard');
                        });
                    }
                   else if(userType == "Teacher"){
                        db.insertOne(teacherAccounts, {email: req.body.email_address, 
                                                        firstName: req.body.fName, 
                                                        lastName: req.body.lName,  
                                                        username: req.body.username
                            },
                                (result) => {
                                res.redirect('/dashboard');
                        });
                    }
                });
            }
        })
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

// End of Admin Routes

var server = app.listen(3000, function() {
    console.log("Server is running at port 3000...");
});

