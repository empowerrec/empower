angular.module('app').factory('mvApplicant', function ($resource,mvIdentity) {
    var ApplicantResource = $resource('/api/applicants/:_id', {_id: '@id'},
        {update: {method: 'PUT', isArray: false}
    });
    return ApplicantResource;
});