const hasAccessToPage = require("./../../utils/hasAccessToPage");
const FollowModel = require("./../../models/Follow");
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
exports.follow = async (req, res,next) => {
  try{
    return res.json({message : " User Follwed Successfully"})
  }catch(err){
     next(err)
  }
};

exports.unfollow = async (req, res,next) => {
  try{
    return res.json({message : " User Unfollwed Successfully"})
  }catch(err){
     next(err)
  }
};
