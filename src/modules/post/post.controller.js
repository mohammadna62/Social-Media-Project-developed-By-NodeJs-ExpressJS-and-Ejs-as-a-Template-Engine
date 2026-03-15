const PostModel = require("./../../models/Post");
const LikeModel = require("./../../models/Like");
const { createPostValidator } = require("./post.validators");
const hasAccessToPage = require("./../../utils/hasAccessToPage");

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
    await createPostValidator.validate({ description }, { abortEarly: false });
    const mediaUrlPath = `images/posts/${req.file.filename}`;

    //* Create New Post
    const post = new PostModel({
      media: {
        filename: req.file.filename,
        path: mediaUrlPath,
      },
      description,
      hashtags: tags,
      user: user._id,
    });
    await post.save();
    req.flash("success", "Post Created successfully");
    return res.render("post/upload");
  } catch (err) {
    next(err);
  }
};

exports.like = async (req, res, next) => {
  try {
    const user = req.user;
    const { postID } = req.body;

    const post = await PostModel.findOne({ _id: postID });
    if (!post) {
      //! Error Message
    }

    const hasAccess = await hasAccessToPage(user._id, post.user.toString());
    if (!hasAccess) {
      //! Error Message
    }

    const existingLike = await LikeModel.findOne({
      user: user._id,
      post: postID,
    });

    if (existingLike) {
      return res.redirect(`/pages/${post.user}`); // /page/:pageID ...
    }

    const like = new LikeModel({
      post: postID,
      user: user._id,
    });

    like.save();

    return res.redirect(`/pages/${post.user}`);
  } catch (err) {
    next(err);
  }
};
exports.dislike = async (req, res, next) => {
  try {
    return res.json({message:"DisLike"});
  } catch (err) {
    next(err);
  }
};
