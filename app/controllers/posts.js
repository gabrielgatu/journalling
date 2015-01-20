var express = require('express');
var mongoose = require('mongoose');
var Post = require('../models/posts');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  Post.findAllPopulated(function(err, posts) {
    res.render('posts/index', { "posts": posts });
  });
});

router.get('/:id', function(req, res) {

  Post.findById(req.params.id, function(err, posts) {
  	Post.populate( posts, { path: 'author' }, function(err, post) {
  		res.render('posts/show', { "post": post });
  	});
  });

  Post.hint(req.params.id);
});

module.exports = router;