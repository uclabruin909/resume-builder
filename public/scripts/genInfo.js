		/*********Img Uploader Init ********/
		$(window).load(function(){
		/* image preview */
		$('#profPicUpload').change(function(){
		    var oFReader = new FileReader();
		    oFReader.readAsDataURL(this.files[0]);
		    console.log(this.files[0]);
		    oFReader.onload = function (oFREvent) {
		        $('#avatar').attr('src', oFREvent.target.result);
		    };
		});
		 
		});
		/********* /end Img Uploader Init ********/

