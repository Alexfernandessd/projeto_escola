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
      res.render('alunos', { docs: docs, nome: req.user.nome });
  })
});

router.get('/delete/:id', authenticationMiddleware (), function(req, res) {
  var id = req.params.id;
  alunos.deleteOne(id, (e, r) => {
        if(e) { return console.log(e); }
        res.redirect('/alunos');
      });
});

router.post('/new', function(req, res) {
  var nome = req.body.nome;
  var email = req.body.email;
  var curso = req.body.curso;
  alunos.insertAluno({nome, email, curso}, (err, result) => {
          if(err) { return console.log(err); }
          res.redirect('/alunos');
      })
})

module.exports = router;