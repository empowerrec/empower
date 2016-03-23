angular.module('app').factory('mvUser', function ($resource) {
    var UserResource = $resource('/api/users/:id', {_id: '@id'}, {
        update: {method: 'PUT', isArray: false}
    });
    UserResource.prototype.isAdmin = function () {
        return this.UserType && this.UserType.indexOf('A') > -1;
    };

    return UserResource;
});
