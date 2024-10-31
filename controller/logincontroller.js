const user = require("../Models/userSchema");
const bcrypt = require("bcrypt");
const CustomError = require("../utils/CustomError");


const userRg = async (req, res, next) => {
  const { username,password, confirmpassword } = req.body;
  console.log(req.body);

  if (password !== confirmpassword) {
    return next(new CustomError("Passwords do not match", 400));
  }
  const hashedpassword = await bcrypt.hash(password, 6);
  const newuser = new user({
    username,
    password: hashedpassword,
    confirmpassword: hashedpassword,
  });
  console.log(req.body);
  await newuser.save();
  res.status(200).json({
    stattus: "success",
    massage: "Registerd succesfully",
    data: newuser,
  });
};

// //user login----

const userlogin = async (req, res, next) => {

  const { username, password } = req.body;


  const loginuser = await user.findOne({ username });

  if (!loginuser) {
    return next(new CustomError("loginuser not found", 404));
  }
  const password_match = await bcrypt.compare(password, loginuser.password);
  if (!password_match) {
    return next(new CustomError("password is wrong", 404));
  }
  res.status(200).json({ status: "success", message: "Logged in successfully" });
}
const getuser = async (req,res,next)=>{
  const userid = await user.find()
  res.json("FKDGUDF"+userid)
}

module.exports = {
  userRg,
  userlogin,
  getuser,
//   userlogout,
};
