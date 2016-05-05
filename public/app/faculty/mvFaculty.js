angular.module('app').factory('mvFaculty', function ($resource) {
    var facultyResource = $resource('/api/faculties/:_id', {_id: '@id'}, {
        update: {method: 'PUT', isArray: false}
    });

    return facultyResource;
});