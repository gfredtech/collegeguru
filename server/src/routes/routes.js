const HttpStatus = require("http-status-codes");

const { Router } = require("express");
const authRoute = require("./authRoute");
const {respondWithWarning} = require("../helpers/responseHandler");
const bcrypt =  require("bcrypt-nodejs");
const Applicant = require("../models/Applicant");
const {respondWithSuccess} = require("../helpers/responseHandler");
const {generateToken} = require("../helpers/jwt");


const router = Router();

/*router.use("/auth", authRoute);


/!*router.post("/login", validateUser, login);
router.post("/signup", signup);*!/*/

//Auth Shit
router.post("/auth/login", async (req, res)=>{
    try {
        let user = await Applicant.findOne({email: req.body.email});


        if (!user) {
            return respondWithWarning(
                res,
                HttpStatus.UNAUTHORIZED,
                "Incorrect email"
            );
        }
        const { password } = req.body;
        const { passwordHash, id } = user;


        console.log(passwordHash)
        const isCorrectPassword = await bcrypt.compareSync(password,passwordHash);

        if (!isCorrectPassword) {
            return respondWithWarning(
                res,
                HttpStatus.UNAUTHORIZED,
                "Incorrect email or password"
            );
        }
        const payload = { id };
        const token = generateToken(payload);
        return respondWithSuccess(res, HttpStatus.OK, "Login success", {
            token,
            ...payload
        });
    } catch (e) {
        console.error(e);
        return respondWithWarning(
            res,
            HttpStatus.INTERNAL_SERVER_ERROR,
            "Internal Server Error",
            {
                error: e.toString()
            }
        );
    }
});

router.post("/auth/signup", async (req,res)=> {
    try {
        const {email, password, firstName, lastName} = req.body;
        console.log(req.body);
        let user = await Applicant.findOne({email});
        if (user) {
            return respondWithWarning(
                res,
                HttpStatus.CONFLICT,
                "Account with this email already exists!",
                {email}
            );
        }

        const passwordHash = await bcrypt.hashSync(password);


        user  = await Applicant.create({
            firstName: req.body.fullName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            passwordHash:passwordHash
        });

        const {id} = user;
        const payload = {id};
        const token = generateToken(payload);
        return respondWithSuccess(
            res,
            HttpStatus.CREATED,
            "Account created successfully",
            {
                token,
                email
            }
        );
    } catch (e) {
        console.error(e);
        return respondWithWarning(
            res,
            HttpStatus.INTERNAL_SERVER_ERROR,
            "Internal Server Error",
            {
                error: e.toString()
            }
        );
    }
});



//These routes require authentication

router.use(require("../middleware/authentication").authenticateUserToken);

router.get("/applicant_info", (req, res)=>{
    res.send(req.user)
});

router.post("/submit_personal_info", (req,res) => {

});

router.post("/start_college_app", (req,res) => {

});

module.exports = router;
