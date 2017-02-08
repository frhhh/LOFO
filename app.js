var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
var Post = require("./model/mongoose/post");
var User = require("./model/mongoose/user");
// var routes = require('./model/api/posts');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var port = process.env.PORT || 3000;
mongoose.connect("mongodb://tester:abc123@ds021166.mlab.com:21166/playground" ,function(error){
  if (error)
      console.log(error);
  else {
      console.log('mongo connected');
  }
});


// routes(app);

app.use('/', express.static(__dirname + '/'));

//create new post
app.post('/post/create', function (req, res){
  var newPost = new Post(req.body);
  newPost.save((err)=>{
      if (err){
          res.json({info: 'error', error: err});
      }
      res.json({info: 'Post created successfully', data: newPost});
  });
});

//display all ongoing post
app.get('/post/get/ongoing', function(req, res) {
  Post.find({ "complete": 0 })
    .sort({ createTime: -1 , modifiedTime: -1 })
    .exec(function(err, post){
      if (err){
          res.json({info: 'error', error: err});
      }
      if (post.length == 0) {res.json({info: 'No posts found'});}
      else {res.json({info: 'Posts found', data: post}); }
    });
});

//display all ongoing post
app.get('/post/get/complete', function(req, res) {
  Post.find({ "complete": 1 })
    .sort({ createTime: -1 , modifiedTime: -1 })
    .exec(function(err, post){
      if (err){
          res.json({info: 'error', error: err});
      }
      if (post.length == 0) {res.json({info: 'No posts found'});}
      else {res.json({info: 'Posts found', data: post}); }
    });
});

//get post by id
app.get('/post/get/:id', function(req, res){
  Post.findById(req.params.id, function (err, post) {
    if(err)
      res.json({info: 'error', error: err});
    res.json({info: 'Post found', data: post});
  });
});

//delete post by id
app.delete('/post/delete/:id', function(req, res){
  //remove post by ID
  Post.remove({ _id: req.params.id }, function(err){
    if(err)
      res.json({info: 'error', error: err});
    res.json({ message : 'Post delete'});
  });
});

//edit post by id
app.post('/post/edit/:id', function(req, res){
  Post.findById(req.params.id, function (err, post) {
    if(err)
      res.json({info: 'error', error: err});
    post = new Post(req.body);
    post.save(function(err, po){
      if(err)
        res.json({info: 'error', error: err});
      res.json({info: 'Posts updated', data: post});
    });
  });
});


const server = app.listen(port, function(err) {
  if (err) {
      console.log(err);
      return;
  }
  console.log("Listening on port " + port);
});