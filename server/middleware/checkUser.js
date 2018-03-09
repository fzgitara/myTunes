const User = require('../models/users')
const { createUser } = require('../controllers/users')
const FB = require('fb')

function checkUser (req, res, next) {
	// console.log(Users);
	FB.setAccessToken(req.body.tokenFB);
  	FB.api('/me',{fields: ['name', 'gender','email', 'music']}, function(response) {
		User.findOne({'email': response.email}, (err, data) => {
			if(data !== null) {
				console.log(data);
				next()
			} else {
				let newUser = {
					name: response.name,
					email: response.email
				}
				
				User.create(newUser)
				.then( data => {
					res.status(201).json ({
						message: 'Success create new user',
						users: data
					})
				})
				.catch(err => {
					console.log(err);
				})
				
			}
		})
  	});
}


module.exports = checkUser