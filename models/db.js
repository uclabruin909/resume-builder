// Bring Mongoose into the project
var mongoose = require( 'mongoose');

var opts = {
  server: {
    socketOptions: {keepAlive: 1}
  }
};


var usr = 'uclabruin909';
var password = 'jerryrice80';

// Build the connection string
var dbURI = 'mongodb://' + usr +  ':' + password + '@ds053320.mongolab.com:53320/node';

// Create the database connection
mongoose.connect(dbURI, opts);

// Define connection events
mongoose.connection.on('connected', function () {
  console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error',function (err) {
  console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
  console.log('Mongoose disconnected');
});

process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected through app termination');
    process.exit(0);
  });
});

/* ********************************************
      USER SCHEMA
   ******************************************** */
var resumeSchema = new mongoose.Schema({

      resumeName: String,

      genInfo: {
          firstName: String,
          lastName: String,
          position: String,
          personalStatement: String,
      },


      contactInfo: {
          email: String,
          phone: String,
          website: String,
          linkedIn: String,
          facebook: String,
          twitter: String,
      },

      educationInfo : [{
            schoolName: String,
            certificate: String,
            startDate: String,
            completedDate: String,
            courseDesc: String,

      }],

      workInfo : [{
            companyName: String,
            positionTitle: String,
            startDate: String,
            endDate: String,
            jobDesc: String,
        
      }],

});


var Resume = mongoose.model( 'Resume', resumeSchema );




