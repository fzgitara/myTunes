const User = require('../models/users')

module.exports = {
	home: function(req, res) {
		console.log("masuk Home");
	},
	
	getUser: function (req, res) {
		User.find()
		.then( data => {
			res.status(200).json ({
				message: 'Query User Success',
				users: data
			})
		})
		.catch(err => {
			console.log(err);
		})
	},
	
	createUser: function (req, res) {
		let newUser = {
			name: req.body.name,
			email: req.body.email
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
}