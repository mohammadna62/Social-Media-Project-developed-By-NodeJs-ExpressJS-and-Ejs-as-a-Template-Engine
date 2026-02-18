


exports.showPostUploadView = async (req , res)=>{
    return res.render("post/upload")
}



exports.createPost= async(req , res, next)=>{
  return res.json({message:"ok"})
}