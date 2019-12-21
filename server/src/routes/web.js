const HttpStatus = require("http-status-codes");

const {Router} = require('express');

const Applicant = require("../models/Applicant");
const Application = require("../models/Application");
const College = require("../models/College");


const router = Router();


router.get("/login", (req, res) => {
    res.render('pages/login', {layout: 'pages/login'})
});

router.post('/login', async (req, res) => {
    let collegeAdmin = await College.findOne(req.body);
    console.log(collegeAdmin)

    if (!collegeAdmin) {
        return res.redirect("/college_admin/login")
    }

    req.session.admin = collegeAdmin;
    res.redirect("/college_admin/dashboard")
})


router.get("/register", (req, res) => {
    res.render('pages/register', {layout: 'pages/register'})
    //console.log(req.session.adminId)
});

router.post("/register", async (req, res) => {
    try {

        let collegeAdmin = await College.create(req.body);

        if (!collegeAdmin) {
            res.redirect('/college_admin/register')
        } else {

            req.session.admin = collegeAdmin;
            res.redirect("/college_admin/dashboard")


        }
    } catch (e) {
        console.error(e);
        res.redirect('/college_admin/register')
    }
});


//Authenticated routes

router.use((req, res, next) => {
    if (req.session.admin === undefined) {
        return res.redirect('/college_admin/login');
    }

    next();
});

//Courses & Programmes shit
router.get("/programmes",  async (req, res) => {
    console.log("am here");
    let college = await College.findOne({
        collegeID: req.session.admin.collegeID

    });


    res.render('pages/courses-list', {admin: req.session.admin, courses: college.courses})
    console.log(req.session)
});

router.get("/add_programme", (req, res) => {
    res.render('pages/add-course', {admin: req.session.admin})
});

router.post("/add_programme", async (req, res) => {
    let programme = await College.findOneAndUpdate({
        collegeID: req.session.admin.collegeID
    }, {
        $push: {
            courses: {
                courseName: req.body.courseName,
                max: req.body.max
            }
        }
    });

    if(!programme){
        res.redirect("/college_admin/add_programme")
    }

    res.redirect("/college_admin/programmes")


});

router.get("/applicants", async (req, res) => {

    let apps = await Application.find({
        college: req.session.admin._id ,
        status: {$ne:'PENDING'}})
        .populate('applicant')
        .populate('college');
    console.log(apps)
    res.render('pages/applicants-list', {admin: req.session.admin, apps: apps})
});

router.get("/dashboard", (req, res) => {
    res.render('pages/dashboard', {
        admin: req.session.admin
    });
});


router.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/college_admin/login")
})


module.exports = router;
