const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        userName:{
            type : String,
            required : [true, "Please enter your name"]
        },
        address:{
            type : String,
            required : [true, "Please enter your address"]
        },
        email:{
            type : String,
            required : [true, "Please enter your email"]
        },
        password:{
            type : String,
            required : [true, "Please enter your number"]
        }, 
        number:{
            type : String,
            required : [true, "Please enter your number"]
        },
        userTypeId:{
            type : String,
            required : [true, "Please enter your number"]
        },
        classId:{
            type : String,
            required : [true, "Please enter your number"]
        },
    }
)



module.exports = new mongoose.model('User', userSchema);