//controlador para las estadísticas
var models = require('../models/models.js');

//var estadistica={};
    var estadistica= new Object;
exports.show = function(req, res){
    models.Quiz.findAll().then(function(cuenta) {
	estadistica.n_total_quizes=cuenta.length;
	});
    models.Comment.findAll().then(function(cuenta) {
	estadistica.n_total_comentarios=cuenta.length;
	});
    estadistica.promedio=estadistica.n_total_comentarios/estadistica.n_total_quizes;
    models.Comment.sequelize.query("select count(distinct QuizId) as n from Comments").then(function(cuenta) {
//    models.Comment.count({distinct: 'QuizId'}).then(function(cuenta) {
	estadistica.con_comentarios=cuenta[0].n;
	console.log("con comentarios: "+estadistica.con_comentarios);
	});
        res.render('estadistica/show.ejs', {estadistica:estadistica});
};
