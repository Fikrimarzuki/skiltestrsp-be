const CryptoJS = require('crypto-js');
const KEY = process.env.KEY || "secretkey";

module.exports = {
	hashSHA256: password => CryptoJS.SHA256(password).toString(CryptoJS.enc.Base64),
	hashSHA512: password=> CryptoJS.SHA512(password).toString(CryptoJS.enc.Base64),
	hashHmacSHA256 : password => CryptoJS.HmacSHA256(password, KEY).toString(CryptoJS.enc.Base64),
	hashHmacSHA512: password => CryptoJS.HmacSHA512(password, KEY).toString(CryptoJS.enc.Base64)
}