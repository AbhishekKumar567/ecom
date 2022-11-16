const express = require("express")
const { forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getSingleUser, getAllUser, updateUser, deleteUser } = require("../controllers/userController")
const { registerUser, loginUser, logout } = require('../controllers/userController')
const { isAuth, authorizeRoles } = require("../middlewares/auth")
const router = express.Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/password/forgot").post(forgotPassword)
router.route("/password/reset/:token").put(resetPassword)
router.route("/logout").get(logout)
router.route("/my").get(isAuth,getUserDetails)
router.route("/my/update").put(isAuth,updateProfile)
router.route("/password/update").put(isAuth,updatePassword)

router.route("/admin/users").get(isAuth,authorizeRoles("admin"),getAllUser)
router.route("/admin/user/:id").get(isAuth,authorizeRoles("admin"),getSingleUser).
put(isAuth,authorizeRoles("admin"),updateUser).delete(isAuth,authorizeRoles("admin"),deleteUser)


module.exports=router
