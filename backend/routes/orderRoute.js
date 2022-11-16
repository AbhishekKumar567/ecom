const express = require('express')
const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder } = require('../controllers/orderController')
const { isAuth, authorizeRoles } = require('../middlewares/auth')

const router = express.Router()

router.route("/order/new").post(isAuth,newOrder)
router.route("/order/:id").get(isAuth,authorizeRoles("admin"),getSingleOrder)
router.route("/orders/me").get(isAuth,myOrders)

//admin routes
router.route("/admin/orders").get(isAuth,authorizeRoles("admin"),getAllOrders)
router.route("/admin/order/:id").put(isAuth,authorizeRoles("admin"),updateOrder).delete(isAuth,authorizeRoles("admin"),deleteOrder)

module.exports = router

