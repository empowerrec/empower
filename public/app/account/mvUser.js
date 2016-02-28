angular.module('app').factory('mvUser', function ($resource,mvRole) {
    var UserResource = $resource('/api/users/:id', {_id: '@id'}, {
        update: {method: 'PUT', isArray: false}
    });
    UserResource.prototype.isAdmin = function () {
      mvRole.returnRoleId().then(function (success) {
            if (success) {
              return this.Roles && this.Roles.indexOf(role._id) > -1;
            }
            else {
              return false;
            }
          });
    };

    return UserResource;
});
