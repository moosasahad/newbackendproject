const express = require("express")
const routes = express.Router();
const logincontroller = require("../controller/logincontroller")
const tryCatch = require("../Middileware/tryCatch") 
routes
.post('/signup',tryCatch(logincontroller.userRg))
.post('/login',tryCatch(logincontroller.userlogin))
.get('/get',tryCatch(logincontroller.getuser))



module.exports = routes