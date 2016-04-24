angular.module('app').factory('mvCurancy', function ($resource) {
    var CurancyResource = $resource('/api/curancies/:_id', {_id: '@id'}, {
        update: {method: 'PUT', isArray: false}
    });

    return CurancyResource;
});