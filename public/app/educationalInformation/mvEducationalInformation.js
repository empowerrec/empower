angular.module('app').factory('mvEducationalInformation', function ($resource) {
    var educationalInformationResource = $resource('/api/educationalInformations/:_id', {_id: '@id'},
        {update: {method: 'PUT', isArray: false}
    });
    return educationalInformationResource;
});