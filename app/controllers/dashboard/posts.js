var express = require('express');
var mongoose = require('mongoose');
var Post = require('../../models/posts');
var router = express.Router();

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/dashboard');
} 

router.get('/', isAuthenticated, function(req, res) {
	Post.findAllPopulated(function(err, posts) {
		res.render('dashboard/posts/index', { 
			"posts": posts,
			formatDate: function(date) {
				var dateObj = new Date(date);
				return dateObj.toISOString().slice(0,10).replace(/-/g,"/");
			}
		});
	});
});

router.get('/:id', isAuthenticated, function(req, res) {
	Post.findById(req.params.id, function(err, post) {
		res.render('dashboard/posts/edit', { "post": post });
	});
});

module.exports = router;