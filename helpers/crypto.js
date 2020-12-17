const CryptoJS = require('crypto-js');

module.exports = {
	hash256 : password => CryptoJS.HmacSHA256(password, +process.env.KEY),
	hash512: password => CryptoJS.HmacSHA512(password, +process.env.KEY)
}