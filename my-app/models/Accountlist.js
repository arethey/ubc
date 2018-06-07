var mongoose = require('mongoose');

var accountlistSchema = mongoose.Schema({
	accountkey: { type: String },
	firstname: { type: String },
	middlename: { type: String },
	lastname: { type: String },
	cellphone: { type: Number },
	email: { type: String },
	isEmailVerified: { type: Boolean }
});

var Account = module.exports = mongoose.model('accountlist', accountlistSchema);