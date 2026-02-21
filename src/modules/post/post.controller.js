const PostModel = require("./../../models/Post");
const createPostValidator = require("./post.validators");

exports.showPostUploadView = async (req, res) => {
  return res.render("post/upload");
};

exports.createPost = async (req, res, next) => {
  try {
    const { description, hashtags } = req.body;
    const user = req.user;
    const tags = hashtags.split(",");
    if (!req.file) {
      req.flash("error", "Media is required");
      return res.render("post/upload");
    }
    await createPostValidator.validation(
      { description },
      { abortEarly: false },
    );
    const mediaUrlPath = `posts/${req.file.filename}`;

    //* Create New Post
    const post = new PostModel({
      media: {
        filename: req.file.filename,
        path: mediaUrlPath,
      },
      description,
      hashtags:tags,
      user : user._id
    });
    await post.save()
    req.flash("success","Post Created successfully")
    return res.render("post/upload")
  } catch (err) {
    next(err);
  }
};
