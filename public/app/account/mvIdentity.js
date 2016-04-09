angular.module('app').factory('mvIdentity', function ($window, mvUser) {

    var currentUser = null;

    $.ajax({
        url: "api/usersendtoclient",
        dataType: 'json',
        async: false,
        success: function (data) {
            if (data.hasOwnProperty('usersendtoclient')) {
                currentUser = new mvUser();
                angular.extend(currentUser, data.usersendtoclient);
            }
        }
    });

    return {
        currentUser: currentUser,
        isAuthenticated: function () {
            return !!this.currentUser;
        },
        isAuthorized: function (role) {
            return !!this.currentUser && this.currentUser.UserType.indexOf(role) > -1;
        }
    };
});
