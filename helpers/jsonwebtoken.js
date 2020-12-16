const jwt = require("jsonwebtoken");

module.exports = {
  generateToken : payload => jwt.sign(payload, process.env.SECRET),
  verifyToken : token => jwt.verify(token, process.env.SECRET)
}