const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config/constants");

/** Generate token
 *@param {Object} data
 *@param {Object} options
 *@returns {string} generated token
 */
const generateToken = data =>
  jwt.sign({ key: data }, SECRET_KEY, {
    expiresIn: "30d",
    issuer: "https://health-ly.herokuapp.com"
  });

/**
 * Verify a token
 *@param {Object} token
 *@param {Object} decoded data
 */
const verifyToken = token => jwt.verify(token, SECRET_KEY);

module.exports = { generateToken, verifyToken };
