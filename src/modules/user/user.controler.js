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
    //Handler File Upload
    if (!req.file) {
      req.flash("error", "please Upload A profile Picture");
      return res.redirect("/users/edit-profile");
    }
    const { filename } = req.file;
    const profilePath = `images/profiles/${filename}`;
    const user = await UserModel.findOneAndUpdate(
      { _id: userID},
      { profilePicture: profilePath },
      { new: true }// return Updated user document
    );
    if(!user){
      req.flash("error", "User Not Found");
    return res.redirect("/users/edit-profile");
    }
    req.flash("success", "Profile Picture Updated Successfully");
    return res.redirect("/users/edit-profile");
    
  } catch (err) {
    next(err);
  }
};
