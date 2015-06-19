var express = require('express');
var router = express.Router();
var quizController = require('../controllers/quiz_controller');
var sessionController = require('../controllers/session_controller');
var commentController = require('../controllers/comment_controller');
var estadisticaController = require('../controllers/estadistica_controller');
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

// Definición de rutas de comentarios
router.get('/quizes/:quizId(\\d+)/comments/new', sessionController.loginRequired,commentController.new);
router.post('/quizes/:quizId(\\d+)/comments',    sessionController.loginRequired,commentController.create);

// estadísticas
router.get('/estadistica',        estadisticaController.show);


//autor
router.get('/author', function(req, res) {
   res.render('author', {autor: 'Manuel J. Molino'});
});

module.exports = router;
