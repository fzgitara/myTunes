const mongoose = require('mongoose')
const Schema = mongoose.Schema

var userSchema = new Schema (
	{
		name: String,
		email: String
	}, 
	{
		timestamps: true
	}
)

module.exports = mongoose.model('users', userSchema)
