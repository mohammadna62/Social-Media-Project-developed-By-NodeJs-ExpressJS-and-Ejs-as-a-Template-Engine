//! Helper Function to Format Success Response
const successResponse = (res, statussCode = 200, data) => {
  return res
    .status(statussCode)
    .json({ status: statussCode, success: true, data });
};

//!  Helper Function to Format Error Response
const errorResponse = (res, statussCode, message, data) => {
  console.log({ message: data }); //* Log error details

  return res
    .status(statussCode)
    .json({ status: statussCode, success: false, error: message, data });
};

module.exports = { successResponse, errorResponse };
