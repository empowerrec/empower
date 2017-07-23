angular.module('app').factory('mvUser', function ($resource) {
    var UserResource = $resource('/api/users/:id', {_id: '@id'}, {
        update: {method: 'PUT', isArray: false}
    });
    UserResource.prototype.isAdmin = function () {
        return this.UserType && this.UserType.indexOf('A') > -1;
    };

    UserResource.prototype.isJobSeeker = function () {
        return this.UserType && this.UserType.indexOf('J') > -1;
    };

    UserResource.prototype.isEmployer = function () {
        return this.UserType && this.UserType.indexOf('E') > -1;
    };

    UserResource.prototype.isSubUser = function () {
        return this.UserType && this.UserType.indexOf('S') > -1;
    };

    UserResource.prototype.isTrainingCenter = function () {
        return this.UserType && this.UserType.indexOf('T') > -1;
    };

    return UserResource;
});
