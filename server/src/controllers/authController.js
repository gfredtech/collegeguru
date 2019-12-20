const HttpStatus = require("http-status-codes");
const bcrypt =  require('bcrypt-nodejs');

const { generateToken } = require("../helpers/jwt");
const User = require("../models/Applicant");
const {
  respondWithWarning,
  respondWithSuccess
} = require("../helpers/responseHandler");

/** Login endpoint controller
 *@param {Object} req
 *@param {Object} res
 *@returns {Object} response
 */
const login = async (req, res) => {
  console.log("POST api/v1/auth/login");
  try {
    const { password } = req.body;
    const { passwordHash, id } = req.user;

    const isCorrectPassword = await argon2.verify(passwordHash, password);

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
    return respondWithWarning(
      res,
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Internal Server Error",
      {
        error: e.toString()
      }
    );
  }
};

/** Signup endpoint controller
 *@param {Object} req
 *@param {Object} res
 *@returns {Object} response
 */
const signup = async (req, res) => {
  console.log("POST api/v1/auth/signup");
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return respondWithWarning(
        res,
        HttpStatus.CONFLICT,
        "Account with this email already exists!",
        { email }
      );
    }

    const passwordHash = await argon2.hash(password);
    user = new User({
      email,
      passwordHash
    });
    await user.save();
    const { id } = user;
    const payload = { id };
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
    return respondWithWarning(
      res,
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Internal Server Error",
      {
        error: e.toString()
      }
    );
  }
};

module.exports = { login, signup };
