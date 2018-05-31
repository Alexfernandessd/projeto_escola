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
  res.render('index', { username: req.user.username });
});

module.exports = router;
