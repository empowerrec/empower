angular.module('app').factory('mvProfessionalCertification', function ($resource) {
    var ProfessionalCertificationResource = $resource('/api/professionalCertifications/:_id', {_id: '@id'},
        {update: {method: 'PUT', isArray: false}
    });
    return ProfessionalCertificationResource;
});