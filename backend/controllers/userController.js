const ErrorHandler = require("../utils/errorhandler")
const catchAsyncErrors = require("../middlewares/catchAsyncErrors")

const User = require("../models/userModel")
const sendToken = require("../utils/jwtToken")
const sendEmail = require("../utils/sendEmail")
const crypto = require("crypto")
const cloudinary = require("cloudinary")

//Register a User
exports.registerUser = catchAsyncErrors(async(req,res,next) =>{

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar,{
        folder:"avatars",
        width:150,
        crop:"scale"
    })


    const {name,email,password} = req.body

    const user = await User.create({
        name,email,password,
        avatar:{
            public_id:myCloud.public_id,
            url:myCloud.secure_url,
        }
    })
    sendToken(user,201,res)
})

exports.loginUser = catchAsyncErrors(async(req,res,next) => {

    const {email,password} = req.body

    //checking if user has entered both email and password
    if(!email||!password){ 
        return next(new ErrorHandler("Please Enter Email and password",400))
    }

    const user = await User.findOne({email}).select("+password")

    if(!user)
    {
        return next(new ErrorHandler("Invalid email or password",401))
    }

    const isPasswordMatched = await user.comparePassword(password)//adding await otherwise password verification don't work
    

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password",401))
    }
    //console.log(password)
    //console.log(user.password)
      
    
sendToken(user,200,res)

})


//Logout User

exports.logout = catchAsyncErrors(async(req,res,next)=>{

    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true,
    })

    res.status(200).json({
        success:true,
        message:"Logged Out",
    })
})


//Forgot Password
exports.forgotPassword = catchAsyncErrors(async(req,res,next)=>{

    const user = await User.findOne({email:req.body.email})

    if(!user){
        return next(new ErrorHandler("User not found",404))

    }

    //Get ResetPassword Token
   const resetToken = user.getResetPasswordToken()

   await user.save({validateBeforeSave:false})

   const resetPasswordLink = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`

   const message = `Your password reset token is :- \n\n ${resetPasswordLink}`

   try{

    await sendEmail({
        email:user.email,
        subject:`Ecommerce Password Recovery`,
        message,

    })

    res.status(200).json({
        success:true,
        message:`Email sent to ${user.email} successfully`
    })

   }catch(e){
    user.resetPasswordToken=undefined
    user.resetPasswordExpire=undefined

    await user.save({validateBeforeSave:false})

    return next(new ErrorHandler(e.message,500))

   }

})

//Reset password
exports.resetPassword = catchAsyncErrors(async(req,res,next)=>{

const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex")

const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire:{$gt:Date.now()}
})

if(!user){
    return next(new ErrorHandler("Reset Password Token is invalid or has been expired",400))
}

if(req.body.password !== req.body.confirmPassword){

    return next(new ErrorHandler("Password does not match",400))
}

user.password = req.body.password
user.resetPasswordToken=undefined
user.resetPasswordExpire=undefined

await user.save()// saving user to database

sendToken(user,200,res)

})


//Get User Details

exports.getUserDetails = catchAsyncErrors(async(req,res,next)=>{

    const user = await User.findById(req.user.id)

    res.status(200).json({
        success:true,
        user
    })

})

//Update User Password

exports.updatePassword = catchAsyncErrors(async(req,res,next)=>{

    const user = await User.findById(req.user.id).select("+password")
     
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword)//adding await otherwise password verification don't work
    

    if(!isPasswordMatched){
        return next(new ErrorHandler("Old Password is incorrect",400))
    }

    if(req.body.newPassword !== req.body.confirmPassword)
    {
        return next(new ErrorHandler("Password does not match",400))
    }

    user.password = req.body.newPassword

    await user.save()

   sendToken(user,200,res)
})

//Update User Profile
exports.updateProfile = catchAsyncErrors(async(req,res,next)=>{
   
  const newUserData = {
    name:req.body.name,
    email:req.body.email,
  }


  const user = await User.findByIdAndUpdate(req.user.id,newUserData,{
    new:true,
    runValidators:true,
    useFindAndModify:false
  })

  res.status(200).json({
    success:true
  })

})


//Get all users (by admin)
exports.getAllUser = catchAsyncErrors(async(req,res,next)=>{

const users = await User.find()

res.status(200).json({
    success:true,
    users
})
})

//Get single user (by admin)
exports.getSingleUser = catchAsyncErrors(async(req,res,next)=>{

    const user = await User.findById(req.params.id)

    if(!user){
        return next(new ErrorHandler(`No user with id ${req.params.id}`))
    }
    res.status(200).json({
        success:true,
        user
    }) 
})

//Update User Role -- Admin
exports.updateUser = catchAsyncErrors(async(req,res,next)=>{
   
    const newUserData = {
      name:req.body.name,
      email:req.body.email,
      role:req.body.role
    }
  
  
    const user = await User.findByIdAndUpdate(req.params.id,newUserData,{
      new:true,
      runValidators:true,
      useFindAndModify:false
    })
  
    res.status(200).json({
      success:true
    })
  
  })


  
//Delete User Role -- Admin
exports.deleteUser = catchAsyncErrors(async(req,res,next)=>{
   
  const user = await User.findById(req.params.id)

  if(!user){
    return next(new ErrorHandler(`User does not exist with id ${req.params.id}`))
  }

  await user.remove()
  
    res.status(200).json({
      success:true,
      message:"User deleted successfully"
    })
  
  })


