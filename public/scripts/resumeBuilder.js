
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

			var sendData = function (method, data, callback) {


				var cb;

				var url = (function() {

					if (method === 'build') {
						return 'admin/build';
					}

					else if (method === 'delete') {
						return 'admin/delete';
					}
				}());


				//check to see if callable//
				if (typeof callback !== 'function') {
					cb = false;
				}
				else{
					cb = callback;
				}

				var sendFunc = (function() {
					$.ajax({
						method: "POST",
						url: url,
						data: data,
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
				getMasterData: getMasterData,
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


			var renderBut = $('<button>').addClass('btn btn-sm render');
				renderBut.append( $('<a>').attr({
					target: 'blank',
					href: 'admin/render/' + resInfo['resID']
				}).text('Render') );


			var deleteBut = $('<button>').addClass('btn btn-sm delete');
				deleteBut.append( ( $('<a>').data('id', resInfo['resID']) ).addClass(' red deleteBtn').text('Delete') );


			//resume name//
			newRow.append( $('<td>').text(resInfo['resName']) )
				.append( $('<td>').text(resInfo['category']) )
				.append( $('<td>').text(resInfo['createdOn']) )
				.append( $('<td>').text(resInfo['status']) )
				.append( $('<td>').append(renderBut).append(deleteBut) ); //add render & delete button/

			return newRow;

		},

		deleteRow = function(resumeID) {

			//find row//

			var targetRow = $(adminArea).find('tr#' + resumeID);
			console.log(targetRow);
			$(targetRow).remove();
		},



		resumeRowCreate = function(resumeInfo) {
			var finalInfo = _getResumeInfo(resumeInfo);

			var newRow = _createRowOutput(finalInfo);

			adminArea.append(newRow);
			console.log(finalInfo);
		},

		addDeleteHandler = function() {
			var deleteButtons = $('.deleteBtn');
			console.log(deleteButtons);
			for (var i=0; i<deleteButtons.length; i++) {
				$(deleteButtons[i]).on('click', function(evt) {
					var target=evt.target;
					var resumeID = $(target).data('id');
					console.log(resumeID);
					deleteRow(resumeID);

				});
			}

			return deleteButtons;
		};



		//return public method//
		return {
			resumeRowCreate: resumeRowCreate,
			addDeleteHandler: addDeleteHandler,
			deleteRow: deleteRow
		};





	}());







		resForm.init();



var init = (function() {


		var deleteButtons = $('.deleteBtn');

		$('#saveRes').on('click', function() {
			var data = resBuilder.getMasterData();
			console.log(data);
			resBuilder.sendData('build', data, function(resume) {
				adminModule.resumeRowCreate(resume);
				adminModule.addDeleteHandler();
			});

			
		});


		for (var i =0; i<deleteButtons.length; i++) {

			$(deleteButtons[i]).on('click', function(evt) {
				var target = evt.target;
				var targetID = $(target).data('id');
				resBuilder.sendData('delete', {resumeId: targetID}, function(resume) {
					adminModule.deleteRow(resume['_id']);
				});
			});

		}






}());




		

		

		



});







