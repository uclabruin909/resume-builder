
$(document).ready(function() {


	var resForm = (function() {



			var addSchoolBut = $('#addSchool'),
				addWorkBut = $('#addWork'),
				delSchoolBut = $('#delSchool'),
				delWorkBut = $('#delWork'),
				educationArea = $('#educationInfo'),
				jobArea =  $('#workInfo'),
				educationForm = $('#educationForm').html(),
				jobForm = $('#workForm').html(),


				_addSchool = function() {

					educationArea.prepend(educationForm);
				},

				_delSchool = function() {

					var schools = $('.school');

					(function delLastSchool() {

						var schoolNum = schools.length;

						if (schoolNum !== 1) {
							var lastSchool = schools[schoolNum-1];
							lastSchool.remove();
							return true;
						}
						else{
							return false;
						}
						

					}());

				},

				_addWork = function() {

					jobArea.prepend(jobForm);

				},

				_delWork = function() {

					var works = $('.work');

					(function delLastWork() {

						var workNum = works.length;
						if (workNum !== 1) {
							var lastWork = works[workNum-1];
							lastWork.remove();
							return true;
						}
						else{
							return false;
						}
						

					}());

				};
				


				var init = function() {
					addSchoolBut.on('click', function() {
						_addSchool();
					});

					delSchoolBut.on('click', function() {
						_delSchool();
					});

					addWorkBut.on('click', function() {
						_addWork();
					});


					delWorkBut.on('click', function() {
						_delWork();
					});

				};


				return {
					init: init
				};


			}());



	var resBuilder = (function() {

		var masterInfo = {},
			saveBut = $('#saveRes'),

			_getResumeName = function() {

				var resName = $('#resumeName').val();
				return resName;

			},

			_getGenInfo = function() {

				var info = {
					firstName: '',
					lastName: '',
					position: '',
					personalStatement: '',

				};

				var retrieveInfo = (function() {
					info.firstName = $('#firstName').val();
					info.lastName = $('#lastName').val();
					info.position = $('#position').val();
					info.personalStatement = $('#personalStatement').val();
				}());


				return info;

			},

			_getContactInfo = function() {

				var info = {
					email: '',
					phone: '',
					website: '',					
					linkedin: '',
					facebook: '',
					twitter: '',
				};

				var retrieveInfo = (function() {
					info.email = $('#email').val();
					info.phone = $('#phoneNumber').val();
					info.website = $('#website').val();
					info.linkedin = $('#linkedIn').val();
					info.facebook = $('#facebook').val();
					info.twitter = $('#twitter').val();
				}());

				return info;
			},



			_getSchoolInfo = function() {

				var schoolList = [];
				var schools = $('.school');

				for (var i=0; i<schools.length; i++) {
					var baseSchool = $(schools[i]);
					
					var schoolInfo = {
						schoolName: '',
						certificate: '',
						startDate: '',
						completeDate: '',
						courseDesc: '',
					};

					schoolInfo.schoolName = baseSchool.find('#schoolName').val();
					schoolInfo.certificate = baseSchool.find('#certificateTitle').val();
					schoolInfo.startDate = baseSchool.find('#startDate').val();
					schoolInfo.completedDate = baseSchool.find('#completedDate').val();
					schoolInfo.courseDesc = baseSchool.find('#courseDescription').val();

					schoolList.push(schoolInfo);

				}

				return schoolList;


			},

			_getWorkInfo = function() {

				var workList = [];
				var companies = $('.work');

				for (var i=0; i<companies.length; i++) {
					var baseCompany = $(companies[i]);
					
					var companyInfo = {
						companyName: '',
						positionTitle: '',
						startDate: '',
						endDate: '',
						jobDesc: '',
					};

					companyInfo.companyName = baseCompany.find('#companyName').val();
					companyInfo.positionTitle = baseCompany.find('#positionTitle').val();
					companyInfo.startDate = baseCompany.find('#startDate').val();
					companyInfo.endDate = baseCompany.find('#endDate').val();
					companyInfo.jobDesc = baseCompany.find('#workDescription').val();

					workList.push(companyInfo);

				}

				return workList;


			},

			getMasterData = function() {

				var totalInfo = {};
				totalInfo.resumeName = _getResumeName();
				totalInfo.genInfo = _getGenInfo();
				totalInfo.socialInfo = _getContactInfo();
				totalInfo.educationInfo = _getSchoolInfo();
				totalInfo.workInfo = _getWorkInfo();

				return totalInfo;

			};


			//public Method//

			var sendData = function (callback) {

				var cb;

				//check to see if callable//
				if (typeof callback !== 'function') {
					cb = false;
				}
				else{
					cb = callback;
				}

				var sendFunc = (function() {
					var testData = getMasterData();
					$.ajax({
						method: "POST",
						url: "admin/build",
						data: testData,
						success: function(resData) {
							var resume = resData;
							console.log(resData);
							cb(resume);
						}

					});
				}());
			


			};



			//return public methods//

			return {
				sendData: sendData
			};




	}());




	var adminModule = (function() {


		var adminArea = $('#adminTable').find('tbody'),
		//private variable//

		_getResumeInfo = function(resume) {

			var info = {
				resID: resume['_id'],
				resName: resume['resumeName'],
				category: 'testing',
				createdOn: '4/15/2015',
				status: 'complete'
			};

			return info;
		},

		_createRowOutput = function(resInfo) {

			var newRow = $('<tr>').attr({
				id : resInfo['resID'],
				role: 'row',
			});

			var newButtons = $('<button')
			//resume name//
			newRow.append( $('<td>').text(resInfo['resName']) )
				.append( $('<td>').text(resInfo['category']) )
				.append( $('<td>').text(resInfo['createdOn']) )
				.append( $('<td>').text(resInfo['status']) );

			return newRow;

		},


		resumeRowCreate = function(resumeInfo) {
			var finalInfo = _getResumeInfo(resumeInfo);

			var newRow = _createRowOutput(finalInfo);

			adminArea.append(newRow);
			console.log(finalInfo);
		};


		//return public method//
		return {
			resumeRowCreate: resumeRowCreate
		};





	}());


















		$('#saveRes').on('click', function() {
			resBuilder.sendData(function(resumeItem) {
				var newResume = resumeItem;
				adminModule.resumeRowCreate(newResume)
			});
		});



		resForm.init();

});







