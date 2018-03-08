const User = require('../models/users')
const { createUser } = require('../controllers/users')

function checkUser (req, res, next) {
	// console.log(Users);
	User.findOne({'email': req.body.email}, (err, data) => {
		if(data !== null) {
			console.log(data);
			next()
		} else {
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
	})
}


module.exports = checkUser