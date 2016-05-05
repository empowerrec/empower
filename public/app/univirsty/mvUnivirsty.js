angular.module('app').factory('mvUnivirsty', function ($resource) {
    var univirstyResource = $resource('/api/univirsties/:_id', {_id: '@id'}, {
        update: {method: 'PUT', isArray: false}
    });

    return univirstyResource;
});