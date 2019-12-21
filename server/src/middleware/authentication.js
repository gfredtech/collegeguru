

const httpStatus = require("http-status-codes");
const { respondWithWarning } = require("../helpers/responseHandler");
const { verifyToken } = require("../helpers/jwt");
const Applicant = require("../models/Applicant");

/**
 *@param {Object} req
 *@param {Object} res
 *@param {Function} next
 *@returns {Function} next middleware
 */
const authenticateUserToken = async (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return respondWithWarning(
      res,
      httpStatus.UNAUTHORIZED,
      "No token, Auth denied."
    );
  }
  try {
    const { key } = verifyToken(token);
    const { id } = key;
    req.user = await Applicant.findById( id );
    next();
  } catch (e) {
    return respondWithWarning(res, httpStatus.UNAUTHORIZED, "JWT Error", {
      error: e.message
    });
  }
};

/** Validate if user exists in database
 *@param {Object} req
 *@param {Object} res
 *@param {Function} next
 *@returns {Function} next middleware
 */
const validateUser = async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return respondWithWarning(
      res,
      httpStatus.UNAUTHORIZED,
      "Incorrect email or password",
      {
        email
      }
    );
  }
  req.user = user;
  return next();
};

module.exports = { authenticateUserToken, validateUser };
