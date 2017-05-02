;(function($){
	'use strict';
	var DH = {
		init: function(){
			
			//User Login and register account.
			this.userInit();
		},
		userInit: function(){
			
			$(document).on('click','[data-rel=registerModal]',function(e){
				e.stopPropagation();
				e.preventDefault();
				if($('#userloginModal').length){
					$('#userloginModal').modal('hide');
				}
				if($('#userlostpasswordModal').length){
					$('#userlostpasswordModal').modal('hide');
				}
				if($('#userregisterModal').length){
					$('#userregisterModal').modal('show');
				}
			});
			$(document).on('click','[data-rel=loginModal]',function(e){
                debugger;
                e.stopPropagation();
				e.preventDefault();
				if($('#userregisterModal').length){
					$('#userregisterModal').modal('hide');
				}
				if($('#userlostpasswordModal').length){
					$('#userlostpasswordModal').modal('hide');
				}
				if($('#userloginModal').length){
					$('#userloginModal').modal('show');
				}
            });

            $(document).on('click', '[data-rel=jobSeekerExperiance]', function (e) {
                debugger;
                e.stopPropagation();
                e.preventDefault();
                
                if ($('#jobSeekerExperiance').length) {
                    $('#jobSeekerExperiance').modal('show');
                }
            });

            $(document).on('click', '[data-rel=jobSeekerEducational]', function (e) {
                debugger;
                e.stopPropagation();
                e.preventDefault();

                if ($('#jobSeekerEducational').length) {
                    $('#jobSeekerEducational').modal('show');
                }
            });

            $(document).on('click', '[data-rel=jobSeekerSkills]', function (e) {
                debugger;
                e.stopPropagation();
                e.preventDefault();

                if ($('#jobSeekerSkills').length) {
                    $('#jobSeekerSkills').modal('show');
                }
            });


            $(document).on('click', '[data-rel=jobSeekerlanguageSkills]', function (e) {
                debugger;
                e.stopPropagation();
                e.preventDefault();

                if ($('#jobSeekerlanguageSkills').length) {
                    $('#jobSeekerlanguageSkills').modal('show');
                }
            });

            $(document).on('click', '[data-rel=jobSeekerCourse]', function (e) {
                debugger;
                e.stopPropagation();
                e.preventDefault();

                if ($('#jobSeekerCourse').length) {
                    $('#jobSeekerCourse').modal('show');
                }
            });
            $(document).on('click', '[data-rel=jobSeekerAddress]', function (e) {
                debugger;
                e.stopPropagation();
                e.preventDefault();

                if ($('#jobSeekerAddress').length) {
                    $('#jobSeekerAddress').modal('show');
                }
            });


         
		},
	};
	$(document).ready(function(){
		DH.init();
	});
})(jQuery);
