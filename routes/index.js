var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var admin = mongoose.model('adminModel');
var picModel = mongoose.model('picModel');
var cmnt = mongoose.model('commentModel');
var jwt = require('express-jwt');
var passport = require('passport');
var auth =  jwt({ secret: 'SECRET', userProperty: 'payload' });

var navigation = '<nav class="navbar mynav navbar-fixed-top"><div class="container">'+
'<div class="navbar-header"><button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar"> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button><a class="navbar-brand" href="/">Inicio</a> </div><div class="collapse navbar-collapse" id="myNavbar"><ul class="nav navbar-nav navbar-right">'+
'<li><a href="/">Inicio</a></li>'+
'<li><a href="/about">Que Productos?</a></li>'+
'<li><a href="/flavors">Ver Sabores de Nieve</a></li>'+
'<li><a href="/address">Ver Direccion</a></li>'+
'</ul></div></div></nav>';

var foot = '<footer><div class="container"><div class="row"><div class="col-md-4"> <span class="copyright">Copyright &copy; El Paraiso Nieves y Raspados 2016</span> </div><div class="col-md-4"><ul class="list-inline social-buttons"><li><a href="#"><i class="fa fa-twitter"></i></a> </li><li><a href="#"><i class="fa fa-facebook"></i></a> </li><li><a href="#"><i class="fa fa-linkedin"></i></a> </li></ul></div><div class="col-md-4"><ul class="list-inline quicklinks"><li><a href="http://luisconstante.com">Webmaster</a> </li></ul></div></div></div></footer>'


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
  	navbar: navigation, 
  	footer: foot
  });
});

router.get('/about', function(req, res, next) {
  res.render('about', {
  	navbar: navigation, 
  	footer: foot
  });
});

router.get('/address', function(req, res, next) {
  res.render('address', {
  	navbar: navigation, 
  	footer: foot
  });
});

router.get('/flavors', function(req, res, next) {
  res.render('flavors', {
  	navbar: navigation, 
  	footer: foot
  });
});

router.post('/adminUp', function(req, res, next){
	var adminUser = new admin();

	adminUser.username = req.body.username;
	adminUser.setPassword(req.body.password);
	adminUser.save(function(err){
		if(err){ return next(err); }
		return res.json({ token: adminUser.generateJWT() });
	});
});

router.post('/login', function(req, res, next){
	if(!req.body.username || !req.body.password ){
		console.log('no username or password');
		return res.status(400).json({ message: 'Please fill out all fields' })
	}

	passport.authenticate('local', function(err, admin, info){

		if(err){ return next(err); }

		if(admin){
			return res.json({ token: admin.generateJWT() });
		} else {
			return res.status(401).json(info);
		}
	})(req, res, next);
	
});

router.get('/allPictures', function( req, res){
	picModel.find(function(err, pictures){
		
		if(err){ return next(err); }

		res.json(pictures);

	});
});

router.post('/savePictures', function(req, res, next){
	var model = new picModel();

	model.url = req.body.url;
	model.description = req.body.description;

	model.save(function(err){
		if(err){ return next(err); }
		res.status(200).json({ message: 'success' });
	});
});

router.get('/allComments', function( req, res){
	cmnt.find(function(err, comments){
		
		if(err){ return next(err); }

		res.json(comments);

	});
});

router.post('/saveComments', function(req, res, next){
	var model = new cmnt();

	model.name = req.body.name;
	model.city = req.body.city;
	model.comment = req.body.comment;

	model.save(function(err, returnedComments){
		if(err){ return next(err); }
		res.status(200).json(returnedComments);
	});
});

module.exports = router;
