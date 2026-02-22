const hasAccessToPage = require("./../../utils/hasAccessToPage");
const FollowModel = require("./../../models/Follow");
const UserModel = require("./../../models/User");
exports.getGage = async (req, res, next) => {
  try {
    const user = req.user;

    const { pageID } = req.params;
    const hasAccess = await hasAccessToPage(user._id, pageID);
    const followed = await FollowModel.findOne({
      follower: user._id,
      following: pageID,
    });
    if (!hasAccess) {
      req.flash("error", "Folow Page To Show Content");
      return res.render("page/index", {
        followed: Boolean(followed),
        pageID,
      });
    }
    return res.render("page/index", {
      followed: Boolean(followed),
      pageID,
    });
  } catch (err) {
    next(err);
  }
};
exports.follow = async (req, res, next) => {
  try {
    const user = req.user;
    const { pageID } = req.params;
    const targetOwnPage = await UserModel.findOne({ _id: pageID });
    if (!targetOwnPage) {
      req.flash("error", "Page NOt Found To Follow");
      return res.redirect(`/pages/${pageID}`);
    }
     if(user._id.toString()=== pageID){
      req.flash("error", "You Can Not Follow Yourself");
      return res.redirect(`/pages/${pageID}`);
     }
    const existingFollow = await FollowModel.findOne({
      follower: user._id,
      following: pageID,
    });
    if (existingFollow) {
      req.flash("error", "Page Already Followed");
      return res.redirect(`/pages/${pageID}`);
    }
    await FollowModel.create({
      follower :user._id ,
      following:pageID,
    })

    
    req.flash("success", "Page Followed Successfully");
      return res.redirect(`/pages/${pageID}`);



  } catch (err) {
    next(err);
  }
};

exports.unfollow = async (req, res, next) => {
  try {
    return res.json({ message: " User Unfollwed Successfully" });
  } catch (err) {
    next(err);
  }
};
