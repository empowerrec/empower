angular.module('app').factory('mvJobType', function ($resource) {
    var jobTypeResource = $resource('/api/jobTypes/:_id', {_id: '@id'},
        {update: {method: 'PUT', isArray: false}
    });
    return jobTypeResource;
});