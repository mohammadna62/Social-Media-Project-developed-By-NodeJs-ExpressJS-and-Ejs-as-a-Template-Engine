const mongoose = require("mongoose")



const  schema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        rer:"User",
        required : true,
    },
    token:{
        type: String,
        required: true,
        unique : true
    },
    expire:{
        type : Date,
        required : true,
    }
})

schema.statics.createToken = async (user)=>{

}
schema.statics.verifyToken = async (user)=>{

}

const model = mongoose.model("Token",schema)

module.exports = model
