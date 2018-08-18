angular.module('app').factory('mvApplicant', function ($resource,mvIdentity) {
    var ApplicantResource = $resource('/api/applicants/:_id', {_id: '@id'},
        {update: {method: 'PUT', isArray: false},
        getVacancyForApplicant: {
            url: 'api/applicants/getVacancyForApplicant/:jobSeeker/:vacancy',
            method: 'GET', params: { jobSeeker: '@jobSeeker', vacancy: "@vacancy" }
            },
        getApplicantsCount: {
            url: 'api/getApplicantsCount', method: 'GET', isArray: true
        }
    });
    return ApplicantResource;
});