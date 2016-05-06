angular.module('app').factory('mvJobSeeker', function ($resource) {
    var jobSeekerResource = $resource('/api/jobSeekers/:_id', { _id: '@id' },{
        update: { method: 'PUT', isArray: false }
    });
    return jobSeekerResource;
});