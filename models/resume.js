


/* ********************************************
      USER SCHEMA
   ******************************************** */
var resumeSchema = new mongoose.Schema({

      genInfo: {
          firstName: String,
          lastName: String,
          email: String,
          phone: String,
          jobTitle: String,
      },

      personalStatement: String,

      socialInfo: {
          linkedin: String,
          facebook: String,
          behance: String,
          twitter: String,
      },

      schoolInfo : [
        {
          schoolName: String,
          certificate: String,
          startDate: String,
          completedDate: String,
          courseDesc: String,

        }
      ],


      companyInfo : [
        {
          companyName: String,
            positionTitle: String,
            startDate: String,
            endDate: String,
            jobDesc: String,

        }
      ]
  
});


var Resume = mongoose.model( 'Resume', resumeSchema );