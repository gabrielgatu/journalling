module.exports = function(app, passport) {

	var dashboard = require('../app/controllers/dashboard')(passport);
	app.use('/dashboard', dashboard);

	var dashboardPosts = require('../app/controllers/dashboard/posts');
	app.use('/dashboard/posts', dashboardPosts);

	var posts = require('../app/controllers/posts');
	app.use('/posts', posts);

	// DEFAULT
	app.use('/', posts);

};