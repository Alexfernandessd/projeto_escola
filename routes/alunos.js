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

var alunos = require('../model/alunos');

router.get('/', authenticationMiddleware (), function(req, res){
  alunos.findAll((e, docs) => {
      if(e) { return console.log(e); }
      res.render('alunos', { docs: docs, username: req.user.username });
  })
});

router.get('/delete/:id', authenticationMiddleware (), function(req, res) {
  var id = req.params.id;
  alunos.deleteOne(id, (e, r) => {
        if(e) { return console.log(e); }
        res.redirect('/');
      });
});

module.exports = router;