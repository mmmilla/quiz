var models = require('../models/models.js');
// Autoload :id de comentarios
exports.load = function(req, res, next, commentId) {
  models.Comment.find({
            where: {
                id: Number(commentId)
            }
        }).then(function(comment) {
      if (comment) {
        req.comment = comment;
        next();
      } else{next(new Error('No existe commentId=' + commentId))}
    }
  ).catch(function(error){next(error)});
};


// GET /quizes/:quizId/comments/new
exports.new = function(req, res) {
  res.render('comments/new.ejs', {quizid: req.params.quizId, errors: []});
};

// POST /quizes/:quizId/comments
exports.create = function(req, res) {
  var comment = models.Comment.create(
      { texto:  req.body.texto,          
        QuizId: req.params.quizId
        });

        res.redirect('/quizes/'+req.params.quizId); 
//  comment.validate().then(
  comment.then(
    function(err){
      if (err) {
        res.render('comments/new.ejs', {quizid: req.params.quizId, comment: comment, errors: err.errors});
      } else {
        comment.save()
        .then( function(){ res.redirect('/quizes/'+req.params.quizId)}) 
      }      // res.redirect: Redirección HTTP a lista de preguntas
    }
  ).catch(function(error){next(error)});
  
};

