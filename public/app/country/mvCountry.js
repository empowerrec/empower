angular.module('app').factory('mvCountry', function ($resource) {
    var CountryResource = $resource('/api/countries/:_id', {_id: '@id'}, {
        update: {method: 'PUT', isArray: false}
    });

    return CountryResource;
});