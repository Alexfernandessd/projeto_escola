var express = require('express');
var passport = require('passport');

var router = express.Router();

function authenticationMiddleware () {  
  return function isLoggedIn (req, res, next) {
    if (req.isAuthenticated()) {
	    res.redirect('/');
    }else{
    	return next();
    }
  }
}

router.get('/', authenticationMiddleware (), function(req, res){
  if(req.query.fail)
    res.render('login', { message: 'Usuário e/ou senha incorretos!' });
  else
    res.render('login', { message: null });
});

router.post('/',
  passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login?fail=true' })
);

module.exports = router;
