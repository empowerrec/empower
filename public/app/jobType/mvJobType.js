angular.module('app').factory('mvJobType', function ($resource,mvIdentity) {
    var JobTypeResource = $resource('/api/jobTypes/:_id', {_id: '@id'},
        {update: {method: 'PUT', isArray: false}
    });
    return JobTypeResource;
});