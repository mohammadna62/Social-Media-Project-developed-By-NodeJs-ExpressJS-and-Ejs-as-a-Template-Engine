const UserModel = require("./../../models/User");

exports.showPageEditView = async (req, res) => {
  const user = await UserModel.findOne({ _id: req.user._id });

  return res.render("user/edit.ejs", {
    user,
  });
};
exports.updateProfile = async (req, res, next) => {
  try {
    const userID = req.user._id;
    const { name, username, email, password } = req.body;

    const repeatedUser = await UserModel.findOne({
      _id: { $ne: userID },
      $or: [{ username }, { email }],
    });

    if (repeatedUser) {
      if (
        username !== req.user.username &&
        repeatedUser.username === username
      ) {
        req.flash("error", "Username Is Already Exist");
        return res.redirect("/users/edit-profile");
      }

      if (email !== req.user.email && repeatedUser.email === email) {
        req.flash("error", "Email Is Already Exist");
        return res.redirect("/users/edit-profile");
      }
    }

    const user = await UserModel.findById(userID);
    if (!user) {
      req.flash("error", "User Not Found");
      return res.redirect("/users/edit-profile");
    }

    if (!req.file && !user.profilePicture) {
      req.flash("error", "Please upload a profile picture.");
      return res.redirect("/users/edit-profile");
    }

    if (req.file) {
      user.profilePicture = `images/profiles/${req.file.filename}`;
    }

    user.name = name;
    user.username = username;
    user.email = email;

    if (password && password.trim() !== "") {
      user.password = password;
    }

    await user.save();

    req.flash("success", "Profile Updated Successfully");
    return res.redirect("/users/edit-profile");
  } catch (err) {
    next(err);
  }
};
