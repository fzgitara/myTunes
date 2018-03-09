const User = require('../models/users');
const FB = require('fb')

module.exports = {
	home: function(req, res) {
		console.log("masuk Home");
		FB.setAccessToken(req.body.tokenFB);
  		FB.api('/me',{fields: ['name', 'gender','email', 'music']}, function(response) {
			  const musicArr = [];
			  response.music.data.forEach((music) => {
				  musicArr.push(music.name);
			  })
			  res.status(200).json({
				  response,
				  music: musicArr
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
	}
}