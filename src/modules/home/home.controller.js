const { getUserInfo } = require("../../utils/helpers");

exports.showHomeView = async (req , res)=>{
     const user = await getUserInfo(req.user._id);
     console.log(user.profilePicture);
     
    return res.render("index",{
        user
    });
}