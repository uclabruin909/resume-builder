var mongoose = require( 'mongoose');


/* ********************************************
      USER SCHEMA
   ******************************************** */
var resumeSchema =  mongoose.Schema({

      resumeName: String,

      resumeType : String,

      createdOn: String,

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


var resume = mongoose.model( 'Resume', resumeSchema );

var Resume = mongoose.model('Resume');

module.exports = Resume;