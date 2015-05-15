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



//Uploader option config and init//

var uploader = require('blueimp-file-upload-expressjs')({
    tmpDir:  __dirname + '/public/uploaded/tmp',
    uploadDir: __dirname + '/public/uploaded/files',
    uploadUrl:  '/uploaded/files/',
    maxPostSize: 11000000000, // 11 GB
    minFileSize:  1,
    maxFileSize:  10000000000, // 10 GB
    acceptFileTypes:  /.+/i,
    // Files not matched by this regular expression force a download dialog,
    // to prevent executing any scripts in the context of the service domain:
    inlineFileTypes:  /\.(gif|jpe?g|png)/i,
    imageTypes:  /\.(gif|jpe?g|png)/i,
    copyImgAsThumb : true, // required
    imageVersions :{
        maxWidth : 200,
        maxHeight : 200
    },
    accessControl: {
        allowOrigin: '*',
        allowMethods: 'OPTIONS, HEAD, GET, POST, PUT, DELETE',
        allowHeaders: 'Content-Type, Content-Range, Content-Disposition'
    },
    storage : {
        type : 'local'
    }

});
/*
 * Use Handlebars for templating
 */
var exphbs = require('express3-handlebars');
var hbs;

// For gzip compression
app.use(express.compress());

//For request body parser//
app.use( bodyParser() );







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


    var Resume = mongoose.model('Resume');
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
		if (!err) {
			console.log(resumes);
		}
		else{
			throw err;
		}
	});
    response.render('resumeForm');
});

// Rendered Resume
app.post('/build', function(request, response, next) {

	var userInfo = request.body;

	
	var newResume = new Resume({

        resumeName: userInfo['resumeName'],

		genInfo : userInfo['genInfo'],


		contactInfo : userInfo['socialInfo'],

		educationInfo : userInfo['educationInfo'],

		workInfo : userInfo['workInfo']
	});

	newResume.save(function(err) {
		if (!err) {
			console.log('new resume created');
		}
	});
	
});





// Pic Submit
app.post('/picUpload', function(request, response, next) {
    
    uploader.post(request, response, function (objimg) {
            var obj = JSON.stringify(objimg);
            response.send(obj);
      });

});




/*
 * Start it up
 */
app.listen(process.env.PORT || port);
console.log('Express started on port ' + port);