const PostModel = require("./../../models/Post");
const LikeModel = require("./../../models/Like");
const SaveModel = require("./../../models/Save");
const CommentModel = require("./../../models/Comment");
const { createPostValidator } = require("./post.validators");
const hasAccessToPage = require("./../../utils/hasAccessToPage");
const { getUserInfo } = require("../../utils/helpers");

const path = require("path");
const fs = require("fs");

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
    const user = req.user;
    const { postID } = req.body;

    const post = await PostModel.findOne({ _id: postID });
    const like = await LikeModel.findOne({ user: user._id, post: postID });
    if (!like) {
      return res.redirect(`/pages/${post.user}`);
    }
    //await LikeModel.findOneAndDelete({user: user._id, post: postID }) //* is same with below
    await LikeModel.findOneAndDelete({ _id: like._id });

    return res.redirect(`/pages/${post.user}`);
  } catch (err) {
    next(err);
  }
};

exports.save = async (req, res, next) => {
  try {
    const user = req.user;
    const { postID } = req.body;
    const post = await PostModel.findOne({ _id: postID });
    if (!post) {
      //! Error
    }
    const hasAccess = await hasAccessToPage(user._id, post.user.toString());
    if (!hasAccess) {
      //! Error Message
    }

    const existingSave = await SaveModel.findOne({
      user: user._id,
      post: postID,
    });

    if (existingSave) {
      return res.redirect(`/pages/${post.user}`); // /page/:pageID ...
    }
    await SaveModel.create({ post: postID, user: user._id });
    return res.redirect(`/pages/${post.user}`);
  } catch (err) {
    next(err);
  }
};

exports.unsave = async (req, res, next) => {
  try {
    const user = req.user;
    const { postID } = req.body;
    const post = await PostModel.findOne({ _id: postID });
    const removedSave = await SaveModel.findOneAndDelete({
      user: user._id,
      post: postID,
    });
    if (!removedSave) {
      //! Error Message
    }
    return res.redirect(`/pages/${post.user}`);
  } catch (err) {
    next(err);
  }
};

exports.showSavesView = async (req, res, next) => {
  try {
    const user = req.user;
    const saves = await SaveModel.find({ user: user._id })
      .populate({
        path: "post",
        populate: {
          path: "user",
          model: "User",
        },
      })
      .lean();

    const likes = await LikeModel.find({ user: user._id })
      .populate("post")
      .lean();

    saves.forEach((item) => {
      likes.forEach((like) => {
        if (item.post._id.toString() === like.post._id.toString()) {
          item.post.hasLike = true;
        }
      });
    });
    const userInfo = await getUserInfo(user._id);
    return res.render("post/saves", {
      posts: saves,
      user: userInfo,
    });
  } catch (err) {
    next(err);
  }
};

exports.removePost = async (req, res, next) => {
  try {
    const user = req.user;
    const { postID } = req.params;
    const post = await PostModel.findOne({ _id: postID });
    if (!post || post.user.toString() !== user._id.toString()) {
      req.flash("error", "You can not remove this post !!");
      return res.redirect(`/pages/${post.user}`);
    }
    const mediaPath = path.join(
      __dirname,
      "..",
      "..",
      "..",
      "public",
      "images",
      "posts",
      post.media.filename,
    );
    fs.unlinkSync(mediaPath, (err) => {
      if (err) {
        next(err);
      }
    });
    await LikeModel.deleteMany({ post: postID });
    await SaveModel.deleteMany({ post: postID });
    await CommentModel.deleteMany({ post: postID });
    await PostModel.findByIdAndDelete(postID);
    req.flash("success", "Post removed successfully");
    return res.redirect(`/pages/${post.user}`);
  } catch (err) {
    next(err);
  }
};
exports.addComment = async (req, res, next) => {
  try {
    const user = req.user;
    const { content, postID } = req.body;
   

    const post = await PostModel.findOne({ _id: postID });
    /*  if(!user.isVerified){
          req.flash("error","First Login submit comment")
          return res.redirect(`/pages/${post.user}`)
    } */
    if (!post) {
      //! Error
    }
    //* ParentID - developed this Item in online learning Project

    const comment = new CommentModel({
      content,
      post: postID,
      user: user._id,
    });
    comment.save();
    req.flash("success", "Comment submit successfully");
    return res.redirect(`/pages/${post.user}`);
  } catch (err) {
    next(err);
  }
};
