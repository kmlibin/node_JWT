require("dotenv").config();
const jwt = require("jsonwebtoken");
const CustomAPIError = require("../errors/custom-error");
//first check for username and password, if exist, create new JWT to send back to frontend so it can access the route
//can use mongoose validations or entire layer of validation, pkg called Joi...third option is checking for both values see if t provides both values. if you
//dont send back a 400 (bad request)
const login = async (req, res) => {
  const { username, password } = req.body;
  //third option, check in the controller
  if (!username || !password) {
    throw new CustomAPIError("please provide both email and password", 400);
  }
  //just demo, usually provided by the db
  const id = new Date().getDate();
  //create new token
  //provide payload (keep it small), JWT secret, options
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  //send token back to user
  res.status(200).json({ msg: "user created", token });
};

const dashboard = async (req, res) => {
  //middleware grabs token from frontend, check it's there, verifies token
  const luckyNumber = Math.floor(Math.random() * 100);
  res
    .status(200)
    .json({
      msg: `hello ${req.user.username}`,
      secret: `authorized data is ${luckyNumber}`,
    });

};

module.exports = { login, dashboard };
