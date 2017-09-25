angular.module('app').factory('mvHearAboutUs', function ($resource) {
    var hearAboutUsResource = $resource('/api/hearAboutUss/:_id', {_id: '@id'}, {
        update: {method: 'PUT', isArray: false}
    });

    return hearAboutUsResource;
});