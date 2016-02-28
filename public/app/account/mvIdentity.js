angular.module('app').factory('mvIdentity', function ($window, mvUser,mvRole) {

    var currentUser;
    if (!!$window.bootstrappedUserObject) {
        currentUser = new mvUser();
        angular.extend(currentUser, $window.bootstrappedUserObject);
    }


    return {
        currentUser: currentUser,
        isAuthenticated: function () {
            return !!this.currentUser;
        },
        isAuthorized: function (role) {
          mvRole.returnRoleId().then(function (success) {
            if (success) {
              return !!this.currentUser && this.currentUser.Roles.indexOf(role._id) > -1;
            }
            else {
              return false;
            }
          });

        }

    };
});
