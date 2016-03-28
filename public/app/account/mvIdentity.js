angular.module('app').factory('mvIdentity', function ($window, mvUser,$localStorage) {

    var currentUser;
    if (!!$localStorage.currentUser) {
        currentUser = new mvUser();
        angular.extend(currentUser, $localStorage.currentUser);
    }


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
