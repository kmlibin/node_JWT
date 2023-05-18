const jwt = require("jsonwebtoken");
const CustomAPIError = require("../errors/custom-error");

//add to routes
const authenticationMiddleware = async (req, res, next) => {
  //grab token from frontend, check it's there
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new CustomAPIError("no token", 401);
  }
  //remember, it's Bearer tokengoeshere. So, [0] returns Bearer, [1] returns the token
  const token = authHeader.split(" ")[1];

  try {
    //pass in token and second value is secret string
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //logging decoded, you get obj id and username (as set up above when we signed the token, plus iat issued at, and expired )
    const { id, username } = decoded;
    //set up a new property on req called user, now have access to itin the request to dashboard. we pass that onto the next middleware
    req.user = { id, username };
    next();
  } catch (error) {
    throw new CustomAPIError("not authorized to access route", 401);
  }
};
module.exports = authenticationMiddleware;
