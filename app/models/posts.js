var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;
var Schema = mongoose.Schema;

var postSchema = new Schema({
	title: String,
	content: String,
	author: { type: ObjectId, ref: 'users' },
	createdAt: Date,
	hints: Number
});

postSchema.statics.findAll = function(cb) {
	mongoose.model('posts').find({}, function(err, posts) {
		cb(err, posts);
	});
};

postSchema.statics.findAllPopulated = function(cb) {
	this.findAll(function(err, posts) {
		mongoose.model('posts').populate( posts, { path: 'author' }, function(err, posts) {
			cb(err, posts);
		});
	});
};

postSchema.statics.hint = function(postId) {
	mongoose.model('posts').update({ _id: postId }, { $inc: { hints: 1 } }).exec();
};

postSchema.statics.mostVisited = function(limit, cb) {
	mongoose.model('posts')
	.find({})
	.limit(limit)
	.sort('-hints')
	.exec(cb);
};

postSchema.statics.recents = function(limit, cb) {
	mongoose.model('posts')
	.find({})
	.limit(limit)
	.sort('-createdAt')
	.exec(cb);
};

module.exports = mongoose.model('posts', postSchema);