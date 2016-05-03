angular.module('app').factory('mvExperiance', function ($resource) {
    var ExperianceResource = $resource('/api/experiances/:_id', {_id: '@id'},
        {update: {method: 'PUT', isArray: false}
    });
    return ExperianceResource;
});