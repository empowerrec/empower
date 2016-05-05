angular.module('app').factory('mvSpecialization', function ($resource) {
    var specializationResource = $resource('/api/specializations/:_id', {_id: '@id'}, {
        update: {method: 'PUT', isArray: false}
    });

    return specializationResource;
});