const multer = require("multer");
const fs = require("fs");
const path = require("path");

exports.multerStorage = (destination, allowedTypes = /jpeg|jpg|png|webp/) => {
  //* Create the Destination directory if it does not exist
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination);
  }
  //* Multer Configs
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, destination);
    },
    filename: function (req, file, cb) {
      const uniqe = Date.now() * Math.floor(Math.random() * 1e9);
      const ext = path.extname(file.originalname);
      cb(null, `${uniqe}${ext}`);
    },
  });
  const fileFilter = function (req, file, cb) {
    //* Allow Extension
    if (allowedTypes.test(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("File Type Not Allow"));
    }
  };
  const uploader = multer({
    storage,
    limits: {
      fileSize: 512_000_000, //5 mB limit
    },
    fileFilter, // we use same name that no need to use :
  });
  return uploader;
};
