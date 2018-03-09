const User = require('../models/users');
const FB = require('fb')
const jwt = require('jsonwebtoken');

module.exports = {
	home: function(req, res) {
		console.log("masuk Home");
		FB.setAccessToken(req.headers.token);
  		FB.api('/me',{fields: ['name', 'gender','email', 'music']} , function(response) {
			console.log(response.email)
				User.findOne({ email: response.email }, (err, dataResponse) => {
				if (err) res.send(err)
				var token = jwt.sign({ id: dataResponse._id }, 'secret');
				res.status(200).send({
					message: 'data success',
					dataMusic: response.music,
					TokenJWT: token
				})
			})
  		});
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
	},

	login: function (req, res) {
		console.log('login')
	}
}