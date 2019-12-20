const { Router } = require("express");
const { login, signup } = require("../controllers/authController");
const { validateUser } = require("../middleware/middleware");

const router = Router();

router.post("/login", validateUser, login);
router.post("/signup", signup);

module.exports = router;
