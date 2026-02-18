
const yup = require("yup")


exports.createPostValidator =  yup.project({
  description: yup.string().max(2200,"Description can not more than 2200 chars long")  
})












