const UserModel = require("../../models/User");
const { errorResponse, successResponse } = require("../../utils/responses");
exports.register = async (req, res) => {
  try {
    const { email, username, name, password } = req.body;
    // TODO : Validation ✅
    const isExistUser = await UserModel.findOne({
      $or: [{ username }, { email }],
    });

    if (isExistUser) {
      return errorResponse(res, 400, "Email or Username Already Exist");
    }
    const isFirstUser = (await UserModel.countDocuments()) === 0;
    let role = "USER";
    if (isFirstUser) {
      role = "ADMIN";
    }
    const user = new UserModel({ email, username, password, name });
    user = await user.save();
    return successResponse(res, 201, {
      message: "User Created Successfully",
      user: { ...user, password: undefined },
    });
  } catch (err) {
    next(err);
  }
};
