angular.module('app').factory('mvGrade', function ($resource) {
    var gradeResource = $resource('/api/grades/:_id', {_id: '@id'}, {
        update: {method: 'PUT', isArray: false}
    });

    return gradeResource;
});