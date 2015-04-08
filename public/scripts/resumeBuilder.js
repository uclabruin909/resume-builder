
$(document).ready(function() {


	var resForm = (function() {



			var addSchoolBut = $('#addSchool'),
				addWorkBut = $('#addWork'),
				educationArea = $('#educationForm'),
				jobArea =  $('#jobForm'),
				educationForm = educationArea.html(),
				jobForm = jobArea.html(),


				_addSchool = function() {

					educationArea.append(educationForm);
				},

				_addWork = function() {

					jobArea.append(jobForm);

				};


				var init = function() {
					addSchoolBut.on('click', function() {
						_addSchool();
					});

					addWorkBut.on('click', function() {
						_addWork();
					});

				};


				return {
					init: init
				};


			}());



	var resBuilder = (function() {

		var masterInfo = {},
			renderBut = $('#renderBut'),
			personalStateArea = $('#message'),

			_getGenInfo = function() {

				var info = {
					firstName: null,
					lastName: null,
					email: null,
					phone: null,
					jobTitle: null,

				};

				var retrieveInfo = (function() {
					info.firstName = $('#firstName').val();
					info.lastName = $('#lastName').val();
					info.email = $('#email').val();
					info.phone = $('#phone').val();
					info.jobTitle = $('#jobTitle').val();
				}());

				console.log(info);
				return info;

			},

			_getSocialInfo = function() {

				var info = {
					linkedin: null,
					facebook: null,
					behance: null,
					twitter: null,
				};

				var retrieveInfo = (function() {
					info.linkedin = $('#linkedin').val();
					info.facebook = $('#facebook').val();
					info.behance = $('#behance').val();
					info.twitter = $('#twitter').val();
				}());

				return info;
			},


			_getPeronalState = function() {

				var personStatement = personalStateArea.val();
				return personStatement;

			},


			_getSchoolInfo = function() {

				var schoolList = [];
				var schools = $('.education-section');

				for (var i=0; i<schools.length; i++) {
					var baseSchool = $(schools[i]);
					
					var schoolInfo = {
						schoolName: null,
						certificate: null,
						startDate: null,
						completedDate: null,
						courseDesc: null,
					};

					schoolInfo.schoolName = baseSchool.find('#schoolName').val();
					schoolInfo.certificate = baseSchool.find('#certificateTitle').val();
					schoolInfo.startDate = baseSchool.find('#startDate').val();
					schoolInfo.completedDate = baseSchool.find('#completeDate').val();
					schoolInfo.courseDesc = baseSchool.find('#course-description').val();

					schoolList.push(schoolInfo);

				}

				return schoolList;


			},

			_getWorkInfo = function() {

				var workList = [];
				var companies = $('.company-section');

				for (var i=0; i<companies.length; i++) {
					var baseCompany = $(companies[i]);
					
					var companyInfo = {
						companyName: null,
						positionTitle: null,
						startDate: null,
						endDate: null,
						jobDesc: null,
					};

					companyInfo.companyName = baseSchool.find('#companyName').val();
					companyInfo.positionTitle = baseSchool.find('#positionTitle').val();
					companyInfo.startDate = baseSchool.find('#datepicker1').val();
					companyInfo.endDate = baseSchool.find('#datepicker2').val();
					companyInfo.jobDesc = baseSchool.find('#job-description').val();

					workList.push(companyInfo);

				}

				return workList;


			};





			$(renderBut).on('click', function() {
				masterInfo.genInfo = _getGenInfo();
				masterInfo.socialInfo = _getSocialInfo();
				masterInfo.educationInfo = _getSchoolInfo();
				masterInfo.workInfo = _getWorkInfo();
				console.log(masterInfo);
				return masterInfo;
			});




	}());











		resForm.init();

});







