const yup = require("yup");

exports.registerValidationSchema = yup.opject({
  email: yup
    .string()
    .email("Please Enter A valid Email")
    .required("Email is Requierd"),
  username: yup
    .string()
    .min(3, "Username must be at least 3 chars long")
    .max(20, "Username must be at last 20 chars long")
    .required("Username is Requierd"),
    name: yup
    .string()
    .min(3, "Name must be at least 3 chars long")
    .max(50, " Name Can Not be more than 50 chars")
    .required("Name is Requierd"),
    name: yup
    .string()
    .min(8, "Password must be at least 8 chars long")
    .required("Name is Requierd"),
});
