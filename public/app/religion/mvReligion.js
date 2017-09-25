angular.module('app').factory('mvReligion', function ($resource) {
    var religionResource = $resource('/api/religions/:_id', {_id: '@id'}, {
        update: {method: 'PUT', isArray: false}
    });

    return religionResource;
});