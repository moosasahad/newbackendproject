const express = require("express")
const routes = express.Router();
const logincontroller = require("../controller/logincontroller")
const tryCatch = require("../Middileware/tryCatch") 
const markcontroller = require("../controller/markcontroller")
routes
//user login and registration
.post('/signup',tryCatch(logincontroller.userRg))
.post('/login',tryCatch(logincontroller.userlogin))
.get('/get',tryCatch(logincontroller.getuser))

// student 

.post('/marke',tryCatch(markcontroller.markcontroller)) 
.get('/allmarke',tryCatch(markcontroller.getallmark)) 




module.exports = routes