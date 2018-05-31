var express = require('express');
var passport = require('passport');

var router = express.Router();

router.get('/', function(req, res){
  if(req.query.fail)
    res.render('login', { message: 'Usuário e/ou senha incorretos!' });
  else
    res.render('login', { message: null });
});

router.post('/',
  passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login?fail=true' })
);

module.exports = router;
