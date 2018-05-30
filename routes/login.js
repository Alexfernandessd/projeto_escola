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

router.get('/login', function(req, res){
  if(req.query.fail)
    res.render('login', { message: 'Usuário e/ou senha incorretos!' });
  else
    res.render('login', { message: null });
});

router.post('/login',
  passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login?fail=true' })
);

var alunos = require('../model/alunos');

router.get('/', authenticationMiddleware (), function(req, res){
  alunos.findAll((e, docs) => {
      if(e) { return console.log(e); }
      res.render('index', { title: 'Lista de Clientes', docs: docs, username: req.user.username });
  })
});

module.exports = router;
