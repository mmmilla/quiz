//reseteo la BD en heroku
//segundo reseteo la BD en heroku

var path = require('path');

// Postgres DATABASE_URL = postgres://user:passwd@host:port/database
// SQLite   DATABASE_URL = sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name  = (url[6]||null);
var user     = (url[2]||null);
var pwd      = (url[3]||null);
var protocol = (url[1]||null);
var dialect  = (url[1]||null);
var port     = (url[5]||null);
var host     = (url[4]||null);
var storage  = process.env.DATABASE_STORAGE;



// Cargar Modelo ORM
var Sequelize = require('sequelize');



// Usar BBDD SQLite o Postgres
var sequelize = new Sequelize(DB_name, user, pwd, 
  { dialect:  protocol,
    protocol: protocol,
    port:     port,
    host:     host,
    storage:  storage,  // solo SQLite (.env)
    omitNull: true      // solo Postgres
  }      
);

// Importar definicion de la tabla Quiz
var quiz_path = path.join(__dirname,'quiz');
var Quiz = sequelize.import(quiz_path);

exports.Quiz = Quiz; //exporta definición de tabla Quiz

//inicializamos la tabla con una pregunta y su respuesta

sequelize.sync().then(function() {
   Quiz.count().then(function (count) {
	if (count===0) { //inicializamos si la tabla está vacía
	    Quiz.bulkCreate( 
	        [ {pregunta: 'Capital de Italia',   respuesta: 'Roma', tematica: 'historia' },
	          {pregunta: 'Capital de Portugal', respuesta: 'Lisboa', tematica: 'historia'  },
	         {pregunta: 'Autor del Quijote',   respuesta: 'Cervantes', tematica: 'humanidades' },
	         {pregunta: 'Presentador del Hormiguero',   respuesta: 'Motos', tematica: 'ocio' },
	         {pregunta: 'Descubridor de la penicilina',   respuesta: 'Fleming', tematica: 'Ciencia' },
	         {pregunta: 'Lenguaje usado en Node',   respuesta: 'Javascript', tematica: 'tecnologia' },
	         {pregunta: 'Autor del Lazarillo',   respuesta: 'Anónimo', tematica: 'humanidades' },
	         {pregunta: 'Creador de la máquina de vapor',   respuesta: 'Watt', tematica: 'tecnologia' },
	         {pregunta: 'Descubridor de la dinamita',   respuesta: 'Nobel', tematica: 'ciencia' } ]
      ).then(function(){console.log('Base de datos inicializada')});
     };
   });
 });

