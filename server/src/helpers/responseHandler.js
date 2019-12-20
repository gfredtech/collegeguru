const HttpStatus = require("http-status-codes");
/**
 * Handles all http responses
 * @exports respondWithSuccess
 * @exports respondWithWarning
 */

/**
 * @param  {Object} res
 * @param  {Number} statusCode
 * @param  {String} message
 * @param {Object} additionalFields
 * @returns {Object} response
 */
const respondWithSuccess = (
  res,
  statusCode = HttpStatus.OK,
  message,
  payload = {}
) =>
  res.status(statusCode).json({
    success: true,
    message,
    statusCode,
    payload
  });

/**
 * @param  {Object} res
 * @param  {Number} statusCode
 * @param  {String} message
 * @param {Object} additionalPayload
 * @returns {Object} response
 */
const respondWithWarning = (
  res,
  statusCode = HttpStatus.BAD_REQUEST,
  message,
  payload = {}
) =>
  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
    payload
  });

module.exports = { respondWithSuccess, respondWithWarning };
