
const cookieParser = require("cookie-parser")
const express = require("express")
const bodyParser = require("body-parser")
const fileUpload = require("express-fileupload")
const app = express()
const cors = require("cors")
const dotenv = require('dotenv')
const errorMiddleware = require("./middlewares/error")

app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(fileUpload())
app.use(cookieParser())
app.use(cors())
//config
dotenv.config({path:"backend/config/config.env"})

//import routes
const product = require('./routes/productRoute')
const user = require("./routes/userRoute")
const order = require("./routes/orderRoute")
const payment = require("./routes/paymentRoute")
app.use('/api/v1',product)
app.use('/api/v1',user)
app.use('/api/v1',order)
app.use('/api/v1/',payment)

//middleware for errors
app.use(errorMiddleware)

module.exports = app
