angular.module('app').factory('mvCareerLevel', function ($resource) {
    var careerLevelResource = $resource('/api/careerLevels/:_id', {_id: '@id'}, {
        update: {method: 'PUT', isArray: false}
    });

    return careerLevelResource;
});