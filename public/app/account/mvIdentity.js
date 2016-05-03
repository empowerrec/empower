angular.module('app').factory('mvIdentity', function ($window, mvUser, mvEmployer, mvJobSeeker) {

    var currentUser = null;
    var currentEmployer = null;
    var currentJobSeeker = null;
    
    $.ajax({
        url: "api/current_user_send_to_client",
        dataType: 'json',
        async: false,
        success: function (data) {
            if (data.hasOwnProperty('current_user_send_to_client')) {
                currentUser = new mvUser();
                angular.extend(currentUser, data.current_user_send_to_client);
            }
        }
    });
    
    $.ajax({
        url: "api/employerByUser",
        dataType: 'json',
        async: false,
        success: function (data) {
            
            currentEmployer = new mvEmployer();
            console.log(data);
                angular.extend(currentEmployer, data);
            
        }
    });
    
    
    $.ajax({
        url: "api/jobSeekerByUser",
        dataType: 'json',
        async: false,
        success: function (data) {
            
            currentJobSeeker = new mvJobSeeker();
            console.log(data);
                angular.extend(currentJobSeeker, data);
            
        }
    });

    return {
        currentUser: currentUser,
        currentEmployer: currentEmployer,
        currentJobSeeker: currentJobSeeker,
        isAuthenticated: function () {
            return !!this.currentUser;
        },
        isAuthorized: function (role) {
            return !!this.currentUser && this.currentUser.UserType.indexOf(role) > -1;
        }
    };
});
