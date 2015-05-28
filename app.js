'use strict';

/*
 * Express Dependencies
 */
var express = require('express');
var app = express();
var port = 3000;

var bodyParser = require('body-parser');

var mongoose = require('mongoose');

var db = require('./models/db.js');

var Resume = require('./models/resume.js');




/*
 * Use Handlebars for templating
 */
var exphbs = require('express3-handlebars');
var hbs;

// For gzip compression
app.use(express.compress());

//For request body parser//
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));







/*
 * Config for Production and Development
 */
if (process.env.NODE_ENV === 'production') {
    // Set the default layout and locate layouts and partials
    app.engine('handlebars', exphbs({
        defaultLayout: 'main',
        layoutsDir: 'dist/views/layouts/',
        partialsDir: 'dist/views/partials/'
    }));

    // Locate the views
    app.set('views', __dirname + '/dist/views');
    
    // Locate the assets
    app.use(express.static(__dirname + '/dist/assets'));

} else {
    app.engine('handlebars', exphbs({
        // Default Layout and locate layouts and partials
        defaultLayout: 'main',
        layoutsDir: 'views/layouts/',
        partialsDir: 'views/partials/'
    }));

    // Locate the views
    app.set('views', __dirname + '/views');
    
    // Locate the assets
    app.use(express.static(__dirname + '/public'));
}

// Set Handlebars
app.set('view engine', 'handlebars');


/*
 * Routes
 */
// Index Page
app.get('/', function(request, response, next) {
    response.render('index');
});

// ResumeBuilder
app.get('/admin', function(request, response, next) {
	
	Resume.find({}, function(err, resumes) {

		if (err) {
			return next(err);
		}

		response.render( 'resumeForm', {resumeList : resumes} );

	});
	
    
});

// Building Resume//
app.post('/admin/build', function(request, response, next) {

	var userInfo = request.body;

	
	var newResume = new Resume({

        resumeName: userInfo['resumeName'],

        resumeType: userInfo['resumeType'],

        createdOn : userInfo['createdOn'],

		genInfo : userInfo['genInfo'],


		contactInfo : userInfo['socialInfo'],

		educationInfo : userInfo['educationInfo'],

		workInfo : userInfo['workInfo']
	});

	newResume.save(function(err, item) {
		if (!err) {
			console.log('new resume created');
			response.send(item);

		}

		else {
			throw err;
			response.end();
		}

	});


	
});









app.get('/admin/render/:resumeId', function(request, response, next) {

	var resumeID = request.params.resumeId;
	var resumeType = request.query['type'];
	console.log(resumeType);
	Resume.findOne({_id:resumeID}, function(err, item) {

		if (!err) {
			console.log('resume has been rendered');
			response.render('resume'+ '-' + resumeType, {resumeInfo: item, layout: null});
		}
		else{
			throw err;
			response.end();
		}
	});

});


app.post('/admin/delete', function(request, response, next) {

	var resumeId = request.body.resumeId;
	Resume.findOne({_id:resumeId}, function(err, resume) {

		if (!err) {

			var resumeCpy = resume;
			resume.remove(function(err,resume) {
				if(!err) {

					response.send(resumeCpy);

				}

				else{
					response.end();
				}
				
			});
			
		}
		else{
			throw err;
			response.end();
		}
	});

});


/*********404 Request Handler ********/

app.use(function(request, response) {

	response.statusCode = 404;
	response.end('404');

});



/*
 * Start it up
 */
app.listen(process.env.PORT || port);
console.log('Express started on port ' + port);