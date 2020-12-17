const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET || "defaultsecret";

module.exports = {
  generateToken : payload => jwt.sign(payload, SECRET),
  verifyToken : token => jwt.verify(token, SECRET)
}