var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	name: String,
	password: String,
	email: String,
	createdAt: Date
});

module.exports = mongoose.model('users', userSchema);