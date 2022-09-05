const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({
  path: "src/config/config.env",
});


const authenticateJWT = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(
      token,
      process.env.TOKEN_SECRET //hide token
    );
    req.user = {
      userId: decodedToken.id,
      role: decodedToken.role,
    };
    next();
  } catch (error) {
    res.status(401).send({ message: "Authentication failed!" });
  }
};
module.exports = {
  authenticateJWT,
};
