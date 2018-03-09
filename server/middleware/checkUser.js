const User = require('../models/users')
const { createUser } = require('../controllers/users')
const FB = require('fb')
const jwt = require('jsonwebtoken')

function checkUser (req, res, next) {
	// console.log(Users);
	console.log('token',req.headers)
	FB.setAccessToken(req.headers.token);
  	FB.api('/me',{fields: ['name', 'gender','email', 'music']}, function(response) {
		  console.log(response, 'sdoskdosk')
		User.findOne({email: response.email}, (err, data) => {
			console.log('ini data ', data)
			if(data !== null) {
				console.log('masuk sini karena udah ada')
				next()
			} else {
				let newUser = new User({
					name: response.name,
					email: response.email
				})
				newUser.save(function(err, data) {
					if (err) res.send(err)
					next()
				})
			}
		})
  	});
}


module.exports = checkUser