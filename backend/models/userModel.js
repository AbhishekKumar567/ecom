const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")


const userSchema = new mongoose.Schema({

     name:{
        type:String,
        required:[true,"Please Enter Your Name"],
        maxLength:[30,"Cannot exceed 30 characters"],
        minLength:[4,"Name should have more than 4 characters"]
     },

     email:{
        type:String,
        required:[true,"Please Enter Your Email"],
        unique:true,
        validate:[validator.isEmail,"Please Enter a Valid Email"]
     },

     password:{
        type:String,
        required:[true,"Please Enter Your Password"],
        minLength:[8,"Password should be more than 8 characters"],
        select:false

     },

     avatar:
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        },

    role:{
        type:String,
        default:"user"
    },

    resetPasswordToken:String,

    resetPasswordExpire:Date,
     
})

//hashing password before saving to database
userSchema.pre("save",async function(next){

    if(!this.isModified("password")){
        return next()
    }
    this.password = await bcrypt.hash(this.password,10)
})

//JWT TOKEN
userSchema.methods.getJWTToken = function() { // this can only be used inside normal function and not arrow function
       
    const token = jwt.sign({id:this._id, email: this.email},process.env.JWTSECRET_KEY,
        {
            expiresIn:process.env.JWT_EXPIRE
        })
    return token
}


//compare Password
userSchema.methods.comparePassword = async function (enteredPassword){
   // console.log(enteredPassword)
    //console.log(this.password)
      
    return await bcrypt.compare(enteredPassword,this.password)//this.password is hashed password saved in database
         
}

//Generating Password Reset Token
userSchema.methods.getResetPasswordToken = function() {

    const resetToken = crypto.randomBytes(20).toString("hex")

    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")

    this.resetPasswordExpire = Date.now() + 20*60*1000

    return resetToken


}

module.exports = mongoose.model("User",userSchema)


