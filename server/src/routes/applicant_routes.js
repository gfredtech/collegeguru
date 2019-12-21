const HttpStatus = require("http-status-codes");

const {Router} = require('express');
const ObjectId = require('mongoose').Types.ObjectId;

const Applicant = require("../models/Applicant");
const College = require("../models/College");
const  Application = require("../models/Application");

const PaymentUtils = require("../util/PaymentUtils");

const router = Router();

router.get("/login", (req, res) => {
    res.render('pages/applicant/login', {layout: 'pages/applicant/login'})
});

router.post('/login', async (req, res) => {
    let applicant = await Applicant.findOne(req.body);
    console.log(applicant)

    if (!applicant) {
        return res.redirect("/applicant/login")
    }

    req.session.applicant = applicant;
    res.redirect("/applicant/dashboard")
});


router.get("/register", (req, res) => {
    res.render('pages/applicant/register', {layout: 'pages/applicant/register'})
});


function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
router.post("/register", async (req, res) => {
    try {

        req.body.aggregate = getRandomArbitrary(6, 24);

        let applicant = await Applicant.create(req.body);

        if (!applicant) {
            res.redirect('/applicant/register')
        } else {

            req.session.applicant = applicant;
            res.redirect("/applicant/dashboard")


        }
    } catch (e) {
        console.error(e);
        res.redirect('/applicant/register')
    }
});


//Authenticated routes
router.use((req, res, next) => {
    if (req.session.applicant === undefined) {
        return res.redirect('/applicant/login');
    }

    next();
});

//General Application
router.get('/general_application',(req, res)=>{
    res.render('pages/applicant/general-application', {
        layout: 'layout_applicant',
        applicant: req.session.applicant
    })
});

router.post('/general_application', async (req, res)=>{
    await Applicant.findByIdAndUpdate(req.session.applicant.id,
        {$set: {

            }});

    res.redirect("my_colleges");


});


//My colleges
router.get('/my_colleges',  async (req, res) => {


    let applications = await Application.find({applicant: req.session.applicant._id ,
    status: {$ne:'PENDING'}})
        .populate('applicant')
        .populate('college');

    let colleges = await College.find();
    console.log(applications)
    res.render('pages/applicant/my_colleges', {layout: "layout_applicant" ,
        applicant: req.session.applicant, apps: applications, colleges: colleges})

});

router.post('/my_colleges', async (req, res)=>{

    await Application.findByIdAndUpdate(req.query.txref,{
        status: 'PROCESSING',

    })
    res.redirect("my_colleges")

})

router.get("/apply_to_college", async (req, res) => {


    let college = await College.findById(req.query.college);
    res.render('pages/applicant/apply_to_college', {layout: "layout_applicant" ,
        applicant: req.session.applicant,
    college: college})
});

router.post("/apply_to_college", async (req, res) => {
    try {
        console.log(req.session.applicant.id)
        let application = await Application.create({
            applicant: req.session.applicant._id,
            college: req.query.college,
            course1: req.body.course1,
            course2: req.body.course2,
            course3: req.body.course3,
            course4: req.body.course4,

        });

        console.log(application)
        if (!application) {
            //res.redirect("/apply/add_programme")
        }

        let link = await PaymentUtils.getPaymentLink(application.id,
            req.session.applicant.email,
            50);
        console.log(link);
        res.redirect(link)

    }
    catch (e) {
        console.error(e);
        //res.redirect("/applicant/apply_to_college")
    }


});

router.get("/applicants", (req, res) => {
    res.render('pages/applicants-list')
});

router.get("/dashboard", (req, res) => {
    res.render('pages/applicant/dashboard', {layout: 'layout_applicant',
        applicant: req.session.applicant
    });
});


router.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/applicant/login")
})


module.exports = router;
