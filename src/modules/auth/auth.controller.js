const { errorResponse, successResponse } = require("../../utils/responses");
const UserModel = require("./../../models/User");
const { registerValidationSchema } = require("./auth.validator");

exports.showRegisterView = async (req, res) => {
  return res.render("auth/register");
};

exports.register = async (req, res, next) => {
  try {
    const { email, username, name, password } = req.body;

    await registerValidationSchema.validate(
      {
        email,
        username,
        name,
        password,
      },
      {
        abortEarly: false,
      }
    );

    const isExistUser = await UserModel.findOne({
      $or: [{ username }, { email }],
    });

    if (isExistUser) {
       req.flash("error","Email or username already exist")
       return res.redirect("/auth/register")
     // return errorResponse(res, 400, "Email or username already exist !!");
    }

    const isFirstUser = (await UserModel.countDocuments()) === 0;
    let role = "USER";
    if (isFirstUser) {
      role = "ADMIN";
    }

    user = new UserModel({ email, username, password, name ,role});
    user = await user.save();
     
    req.flash("success","Singned up was successfully")
    return res.redirect("/auth/register")
    // return successResponse(res, 201, {
    //   message: "User created successfully :))",
    //   user: { ...user.toObject(), password: undefined },
    // });
  } catch (err) {
    next(err);
  }
};
