/**
 * Reusable API Response utility
 */
class ApiResponse {
  constructor(statusCode, data, message = "Success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }

  static success(res, data, message = "Success", statusCode = 200) {
    return res.status(statusCode).json(new ApiResponse(statusCode, data, message));
  }

  static error(res, message = "Error", statusCode = 500, errors = []) {
    return res.status(statusCode).json({
      success: false,
      message,
      statusCode,
      errors
    });
  }
}

module.exports = ApiResponse;
