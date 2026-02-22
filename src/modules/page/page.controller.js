const hasAccessToPage = require("./../../utils/hasAccessToPage");
exports.getGage = async (req, res, next) => {
  try {
    const user = req.user;
    const { pageID } = req.params;
    const hasAccess = await hasAccessToPage(user._id,pageID);
    if(!hasAccess){
      req.flash("error","Folow Page To Show Content")
      res.render("/page/index")
    }
    return res.render("page/index");
  } catch (err) {
    next(err);
  }
};
