const Order = require("../models/orderModel")
const Product = require("../models/productModel")
const ErrorHandler = require("../utils/errorhandler")
const catchAsyncErrors = require("../middlewares/catchAsyncErrors")

const orderModel = require("../models/orderModel")

//Create new order
exports.newOrder = catchAsyncErrors(async(req,res,next) => {

    const {shippingInfo,orderItems,paymentInfo,itemsPrice,taxPrice,shippingPrice,totalPrice} = req.body
    
    const order = await Order.create({
        shippingInfo,orderItems,paymentInfo,itemsPrice,taxPrice,shippingPrice,totalPrice,
        paidAt:Date.now(),
        user:req.user._id
    })
    
    res.status(201).json({
        success:true,
        order,
    })
})


//Get Order Details(single order) 
exports.getSingleOrder = catchAsyncErrors(async(req,res,next) => {

    const order = await Order.findById(req.params.id).populate("user","name email")

    if(!order){
        return next(new ErrorHandler("Order not found with this id",404))

    }

    res.status(200).json({
        success:true,
        order,
    })
})


//Get Logged in user order 
exports.myOrders = catchAsyncErrors(async(req,res,next) => {

    const orders = await Order.find({user:req.user._id})

    res.status(200).json({
        success:true,
        orders,
    })
})



//Get All Orders -- Admin 
exports.getAllOrders = catchAsyncErrors(async(req,res,next) => {

    const orders = await Order.find()
   
      let totalAmt = 0;

      orders.forEach((order) => {
        totalAmt += order.totalPrice
      })

    res.status(200).json({
        success:true,
        totalAmt,
        orders,
    })
})



//Update Order Status -- Admin

exports.updateOrder = catchAsyncErrors(async(req,res,next) => {

    const order = await Order.find(req.params.id)

    
    if(!order){
        return next(new ErrorHandler("Order not found with this id",404))
    }
   
     if(order.orderStatus==="Delivered"){
        return next(new ErrorHandler("You have already delivered this order",400))
     } 
     

    order.orderItems.forEach(async(ord) =>{
        await updateStock(ord.product,ord.quantity)
    })

    order.orderStatus = req.body.status
    
    if(req.body.status=== "Delivered")
    {
        order.DeliveredAt = Date.now()
    }

    await order.save({validateBeforeSave:false})

    res.status(200).json({
        success:true,
    })
})

async function updateStock(id,quantity){
    const product = await Product.findById(id)

    product.stock-=quantity
    await product.save({validateBeforeSave:false})
}


//Delete Order -- Admin
exports.deleteOrder = catchAsyncErrors(async(req,res,next) => {

    const order = await Order.findById(req.params.id)
   
    if(!order){
        return next(new ErrorHandler("Order not found with this id",404))
    }
    
    
    await order.remove()

    res.status(200).json({
        success:true,
    })
})