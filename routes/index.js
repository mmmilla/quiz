var express = require('express');
var router = express.Router();
var quizController = require('../controllers/quiz_controller');
var sessionController = require('../controllers/session_controller');
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

// Autoload de comandos con ids
router.param('quizId', quizController.load);  // autoload :quizId

// Definición de rutas de /quizes
router.get('/quizes',                      quizController.index);
router.get('/quizes/:quizId(\\d+)',        quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
//router.get('/quizes/new', 		   quizController.new);
//router.post('/quizes/create',		    quizController.create);

// Definición de rutas de sesión:
router.get('/login', sessionController.new); //formulario login
router.post('/login', sessionController.create); //crear sesión
router.get('/logout', sessionController.destroy); //destruye sesión

//autor
router.get('/author', function(req, res) {
   res.render('author', {autor: 'Manuel J. Molino'});
});

module.exports = router;
