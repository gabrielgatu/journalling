var express = require('express');
var router = express.Router();

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/dashboard');
}

function getValidMessage(message) {
	return (message == "") ? null : message;
}

module.exports = function(passport) {

	router.get('/', function(req, res) {
		if (req.isAuthenticated()) {
			res.redirect('/dashboard/home');
		} else {
			res.render('dashboard/layouts/index', { 
				message: getValidMessage( req.flash('message') )
			});
		}
	});

	router.get('/home', isAuthenticated, function(req, res) {
		res.render('dashboard/layouts/home');
	});

	router.post('/login', passport.authenticate('login', {
		successRedirect: '/dashboard/home',
		failureRedirect: '/dashboard',
		failureFlash : true  
	}));

	return router;
}