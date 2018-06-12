var express = require('express');
var passport = require('passport');

var router = express.Router();

function authenticationMiddleware () {  
  return function isLoggedIn (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login');
  }
}

router.get('/', authenticationMiddleware (), function(req, res){
  res.render('index', { nome: req.user.nome });
});

router.get('/logout', authenticationMiddleware (), function(req, res){
	req.logout();
	res.redirect('/');
});

module.exports = router;
