angular.module('app').factory('mvJobRole', function ($resource) {
    var JobRoleResource = $resource('/api/jobRoles/:_id', {_id: '@id'},
        {update: {method: 'PUT', isArray: false}
    });
    return JobRoleResource;
});